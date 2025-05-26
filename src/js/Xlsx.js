import * as xlsx from 'xlsx'

export const Xlsx = (() => {
  const readerXLSX = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const workbook = xlsx.read(arrayBuffer, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const data = xlsx.utils.sheet_to_json(sheet, { defval: '' })
      const headers = data.length > 0 ? Object.keys(data[0]) : []
      return {
        status: 'ok',
        data,
        headers,
      }
    } catch (error) {
      return {
        status: 'nok',
        error,
      }
    }
  }

  return {
    readerXLSX,
  }
})()
