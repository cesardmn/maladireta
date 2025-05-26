import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'

export const Docx = (() => {
  const _getDocx = async (file) => {
    if (!file) return
    const arrayBuffer = await file.arrayBuffer()
    const zip = new PizZip(arrayBuffer)
    const docx = new Docxtemplater(zip)
    return docx
  }

  const replaceTags = async (file, tags) => {
    const docx = await _getDocx(file)
    docx.render(tags)
    const blob = docx.getZip().generate({
      type: 'blob',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })
    return blob
  }

  const getTags = async (file) => {
    const docx = await _getDocx(file)
    const fullText = docx.getFullText()
    const regex = /{([^}]+)}/g
    const matches = [...fullText.matchAll(regex)]
    const tags = [...new Set(matches.map((match) => match[1]))]
    return tags
  }

  return { replaceTags, getTags }
})()
