import { DocumentType } from '@prisma/client'
import { renderDocumentTemplate } from './templates'

describe('renderDocumentTemplate', () => {
  const context = {
    memberName: 'Ada Lovelace',
    memberEmail: 'ada@example.com',
    startupName: 'Analytical Startup',
    cpfCnpj: '12345678901',
    status: 'ATIVO',
    issuedAt: '2026-06-24T00:00:00.000Z',
    metadata: {
      evento: 'Demo Day',
      objeto: 'Programa Nacional',
    },
  }

  it('renders member declaration', () => {
    const template = renderDocumentTemplate(DocumentType.DECLARACAO_ASSOCIADO, context)

    expect(template.title).toBe('Declaracao de Associado')
    expect(template.lines).toContain('Associado: Ada Lovelace')
  })

  it('renders exclusivity letter with metadata', () => {
    const template = renderDocumentTemplate(DocumentType.CARTA_EXCLUSIVIDADE, context)

    expect(template.lines).toContain('Objeto: Programa Nacional')
  })

  it('renders event certificate with event metadata', () => {
    const template = renderDocumentTemplate(DocumentType.CERTIFICADO_EVENTO, context)

    expect(template.lines).toContain('Evento: Demo Day')
  })
})
