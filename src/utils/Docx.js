import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'

export const Docx = (() => {
  const _getBuffer = async (file) => {
    try {
      const buffer = await file.arrayBuffer()

      if (buffer.byteLength === 0) {
        return { status: 'nok', message: 'O arquivo está vazio.', buffer: null }
      }

      const MAX_SIZE_MB = 5
      const sizeMB = buffer.byteLength / (1024 * 1024)
      if (sizeMB > MAX_SIZE_MB) {
        return {
          status: 'nok',
          message: `O arquivo é muito grande (${sizeMB.toFixed(2)}MB). Máximo permitido: ${MAX_SIZE_MB}MB.`,
          buffer: null,
        }
      }

      return { status: 'ok', buffer }
    } catch (error) {
      return {
        status: 'nok',
        message: `Erro ao ler o arquivo: ${error.message || error}`,
        buffer: null,
      }
    }
  }

  const _getZip = (buffer) => {
    try {
      const zip = new PizZip(buffer)
      return { status: 'ok', zip }
    } catch (error) {
      return {
        status: 'nok',
        message: `Erro ao processar o arquivo ZIP: ${error.message || error}`,
        zip: null,
      }
    }
  }

  const _getDocx = (zip) => {
    try {
      const docx = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      })
      return { status: 'ok', docx }
    } catch (error) {
      const DUPLICATE_TAG_IDS = ['duplicate_open_tag', 'duplicate_close_tag']
      const internalErrors = Array.isArray(error?.properties?.errors)
        ? error.properties.errors
        : []

      const duplicateErrors = internalErrors.filter((e) =>
        DUPLICATE_TAG_IDS.includes(e?.properties?.id)
      )

      const message =
        duplicateErrors.length > 0
          ? 'Foram encontradas tags com chaves duplas {{tag}}. Use apenas uma chave: {tag}.'
          : `Erro ao inicializar o Docxtemplater: ${error?.properties?.errors?.[0]?.message || error.message || error}`

      return { status: 'nok', docx: null, message }
    }
  }

  const _processFile = async (file) => {
    const bufferResult = await _getBuffer(file)
    if (bufferResult.status === 'nok')
      return { status: 'nok', message: bufferResult.message, docx: null }

    const zipResult = _getZip(bufferResult.buffer)
    if (zipResult.status === 'nok')
      return { status: 'nok', message: zipResult.message, docx: null }

    const docxResult = _getDocx(zipResult.zip)
    if (docxResult.status === 'nok')
      return { status: 'nok', message: docxResult.message, docx: null }

    return {
      status: 'ok',
      docx: docxResult.docx,
      message: 'Arquivo processado com sucesso.',
    }
  }

  const getTags = async (file) => {
    const { status, docx, message } = await _processFile(file)
    if (status === 'nok') {
      return { status, tags: null, blob: null, message }
    }

    try {
      const fullText = docx.getFullText()
      if (!fullText) {
        return {
          status: 'nok',
          tags: null,
          blob: null,
          message: 'O documento está vazio.',
        }
      }

      const regex = /{([^{}]+)}/g
      const matches = [...fullText.matchAll(regex)]
      const tags = [...new Set(matches.map((m) => m[1]))]

      if (tags.length === 0) {
        return {
          status: 'nok',
          tags: null,
          blob: null,
          message: 'Nenhuma tag foi encontrada no documento.',
        }
      }

      return {
        status: 'ok',
        tags,
        blob: null,
        message: `${tags.length} tag(s) identificada(s) com sucesso.`,
      }
    } catch (error) {
      return {
        status: 'nok',
        tags: null,
        blob: null,
        message: `Erro ao tentar extrair tags do documento: ${error.message || error}`,
      }
    }
  }

  const replaceTags = async (file, tags) => {
    const { status, docx, message } = await _processFile(file)
    if (status === 'nok') {
      return { status, tags: null, blob: null, message }
    }

    try {
      docx.render(tags)

      const blob = docx.getZip().generate({
        type: 'blob',
        mimeType:
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })

      return {
        status: 'ok',
        blob,
        message: 'Tags substituídas com sucesso no documento.',
      }
    } catch (error) {
      const errorList = Array.isArray(error?.errors)
        ? error.errors.map((e) => e.properties?.explanation || e.message)
        : [error.message || error]

      return {
        status: 'nok',
        tags: null,
        blob: null,
        message: `Erro ao renderizar o documento: ${errorList.join(' | ')}`,
      }
    }
  }

  return { getTags, replaceTags }
})()
