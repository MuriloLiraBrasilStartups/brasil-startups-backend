import type { Prisma } from '@prisma/client'
import { AppError } from '../../shared/errors/app-error'
import { getPagination, getPaginationMeta } from '../../utils/pagination'
import { StartupRepository } from './startup.repository'
import { createStartupSchema } from './startup.schemas'
import type { CreateStartupInput, ImportStartupsInput, ListStartupsQuery, UpdateStartupInput } from './startup.schemas'

export class StartupService {
  constructor(private readonly startupRepository = new StartupRepository()) {}

  async listStartups(query: ListStartupsQuery) {
    const pagination = getPagination(query)
    const where = this.buildWhere(query)

    const [startups, total] = await Promise.all([
      this.startupRepository.findMany({ where, ...pagination }),
      this.startupRepository.count(where),
    ])

    return {
      startups,
      meta: getPaginationMeta(total, query),
    }
  }

  async getStartup(id: string) {
    const startup = await this.startupRepository.findById(id)

    if (!startup) {
      throw new AppError('Startup not found', 404)
    }

    return startup
  }

  async createStartup(data: CreateStartupInput) {
    const startupWithSameCnpj = await this.startupRepository.findByCnpj(data.cnpj)

    if (startupWithSameCnpj) {
      throw new AppError('Startup with this CNPJ already exists', 409)
    }

    return this.startupRepository.create(data)
  }

  async updateStartup(id: string, data: UpdateStartupInput) {
    await this.getStartup(id)

    if (data.cnpj) {
      const startupWithSameCnpj = await this.startupRepository.findByCnpj(data.cnpj)

      if (startupWithSameCnpj && startupWithSameCnpj.id !== id) {
        throw new AppError('Startup with this CNPJ already exists', 409)
      }
    }

    return this.startupRepository.update(id, data)
  }

  async deleteStartup(id: string) {
    await this.getStartup(id)

    return this.startupRepository.softDelete(id)
  }

  async importStartups(data: ImportStartupsInput) {
    const rows = await this.parseImportRows(data)
    const result = {
      created: 0,
      updated: 0,
      failed: 0,
      errors: [] as Array<{ row: number; message: string }>,
    }

    for (const [index, row] of rows.entries()) {
      try {
        const startup = createStartupSchema.parse({
          name: row.nome ?? row.name,
          cnpj: row.cnpj ?? row.CNPJ,
          state: row.estado ?? row.state,
          city: row.municipio ?? row.city ?? row.cidade,
          segment: row.segmento ?? row.segment,
          phase: row.fase ?? row.phase,
          product: row.produto ?? row.product,
          businessModel: row.modelo ?? row.businessModel,
          founders: this.parseFounders(row.fundadores ?? row.founders),
          latitude: this.optionalNumber(row.latitude),
          longitude: this.optionalNumber(row.longitude),
        })
        const existing = await this.startupRepository.findByCnpj(startup.cnpj)

        if (existing) {
          await this.startupRepository.update(existing.id, startup)
          result.updated += 1
        } else {
          await this.startupRepository.create(startup)
          result.created += 1
        }
      } catch (error) {
        result.failed += 1
        result.errors.push({
          row: index + 2,
          message: error instanceof Error ? error.message : 'Invalid row',
        })
      }
    }

    return result
  }

  private buildWhere(query: ListStartupsQuery): Prisma.StartupWhereInput {
    return {
      deletedAt: null,
      ...(query.name && {
        name: {
          contains: query.name,
          mode: 'insensitive',
        },
      }),
      ...(query.cnpj && {
        cnpj: {
          contains: query.cnpj,
        },
      }),
      ...(query.state && {
        state: query.state,
      }),
      ...(query.city && {
        city: {
          contains: query.city,
          mode: 'insensitive',
        },
      }),
      ...(query.segment && {
        segment: {
          contains: query.segment,
          mode: 'insensitive',
        },
      }),
      ...(query.phase && {
        phase: query.phase,
      }),
      ...(query.product && {
        product: {
          contains: query.product,
          mode: 'insensitive',
        },
      }),
      ...(query.businessModel && {
        businessModel: {
          contains: query.businessModel,
          mode: 'insensitive',
        },
      }),
      ...(query.founder && {
        founders: {
          has: query.founder,
        },
      }),
    }
  }

  private async parseImportRows(data: ImportStartupsInput) {
    const content = data.base64 ? Buffer.from(data.content, 'base64').toString('utf8') : data.content

    if (data.format === 'xlsx') {
      return this.parseXlsx(data.content, data.base64)
    }

    return this.parseDelimited(content, data.delimiter ?? (data.format === 'tsv' ? '\t' : ','))
  }

  private parseDelimited(content: string, delimiter: string) {
    const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0)
    const headers = this.parseCsvLine(lines[0], delimiter).map((header) => header.trim())

    return lines.slice(1).map((line) => {
      const values = this.parseCsvLine(line, delimiter)

      return headers.reduce<Record<string, string>>((row, header, index) => {
        row[header] = values[index]?.trim() ?? ''
        return row
      }, {})
    })
  }

  private parseCsvLine(line: string, delimiter: string) {
    const values: string[] = []
    let current = ''
    let quoted = false

    for (let index = 0; index < line.length; index += 1) {
      const char = line[index]
      const next = line[index + 1]

      if (char === '"' && quoted && next === '"') {
        current += '"'
        index += 1
      } else if (char === '"') {
        quoted = !quoted
      } else if (char === delimiter && !quoted) {
        values.push(current)
        current = ''
      } else {
        current += char
      }
    }

    values.push(current)
    return values
  }

  private async parseXlsx(content: string, base64: boolean) {
    try {
      const importer = Function('specifier', 'return import(specifier)') as (specifier: string) => Promise<any>
      const xlsx = await importer('xlsx')
      const workbook = xlsx.read(content, { type: base64 ? 'base64' : 'binary' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]

      return xlsx.utils.sheet_to_json(sheet) as Record<string, unknown>[]
    } catch {
      throw new AppError('XLSX import requires the optional xlsx dependency. Use CSV/TSV or install xlsx.', 400)
    }
  }

  private parseFounders(value: unknown) {
    if (Array.isArray(value)) {
      return value.map(String)
    }

    if (!value) {
      return []
    }

    return String(value).split(/[;,]/).map((founder) => founder.trim()).filter(Boolean)
  }

  private optionalNumber(value: unknown) {
    if (value === undefined || value === null || value === '') {
      return undefined
    }

    const number = Number(value)

    return Number.isFinite(number) ? number : undefined
  }
}
