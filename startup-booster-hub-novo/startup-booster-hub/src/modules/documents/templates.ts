import { DocumentType } from '@prisma/client'

type TemplateContext = {
  memberName: string
  memberEmail: string
  startupName: string
  cpfCnpj: string
  status: string
  issuedAt: string
  metadata: Record<string, unknown>
}

export function renderDocumentTemplate(type: DocumentType, context: TemplateContext) {
  const commonLines = [
    `Associado: ${context.memberName}`,
    `Email: ${context.memberEmail}`,
    `Startup: ${context.startupName}`,
    `CNPJ/CPF: ${context.cpfCnpj}`,
    `Status: ${context.status}`,
    `Emitido em: ${context.issuedAt}`,
  ]

  if (type === DocumentType.DECLARACAO_ASSOCIADO) {
    return {
      title: 'Declaracao de Associado',
      lines: [
        ...commonLines,
        'Declaramos que o associado acima identificado consta na base da Brasil Startups.',
      ],
    }
  }

  if (type === DocumentType.CARTA_EXCLUSIVIDADE) {
    return {
      title: 'Carta de Exclusividade',
      lines: [
        ...commonLines,
        `Objeto: ${String(context.metadata.objeto ?? 'Nao informado')}`,
        `Vigencia: ${String(context.metadata.vigencia ?? 'Nao informada')}`,
        'Esta carta foi gerada conforme os parametros informados na solicitacao.',
      ],
    }
  }

  return {
    title: 'Certificado de Evento',
    lines: [
      ...commonLines,
      `Evento: ${String(context.metadata.evento ?? context.metadata.eventName ?? 'Nao informado')}`,
      `Carga horaria: ${String(context.metadata.cargaHoraria ?? context.metadata.workload ?? 'Nao informada')}`,
      'Certificamos a participacao no evento indicado.',
    ],
  }
}
