import Docxtemplater from 'docxtemplater'
import { getBuffer, getZip } from './index'
import { FiLinkedin } from 'react-icons/fi'

export const Docx = (() => {
  const _getDocx = (zip) => {
    try {
      const docx = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
        nullGetter: () => '',
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
    const bufferResult = await getBuffer(file, 5)
    if (bufferResult.status === 'nok')
      return { status: 'nok', message: bufferResult.message, docx: null }

    const zipResult = getZip(bufferResult.buffer)
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
        FiLinkedin,
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
