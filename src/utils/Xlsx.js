import * as xlsx from 'xlsx'

export const Xlsx = (() => {
  const readerXLSX = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const workbook = xlsx.read(arrayBuffer, { type: 'array' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const sheets = workbook.SheetNames.length

      const rows = xlsx.utils.sheet_to_json(sheet, {
        header: 1,
        blankrows: false,
      })
      if (rows.length === 0)
        return { status: 'nok', message: 'Planilha não contém dados.' }

      const headers = rows[0]
      if (headers.length === 0)
        return { status: 'nok', message: 'Planilha não tem cabeçalho.' }

      const data = xlsx.utils.sheet_to_json(sheet, { blankrows: false })
      if (data.length === 0)
        return {
          status: 'nok',
          message: 'Planilha contém cabeçalho porém não tem dados.',
        }

      const hasColHeadless = (() => {
        const invalidColumns = new Set()
        data.forEach((row) => {
          Object.keys(row).forEach((key) => {
            if (!headers.includes(key)) {
              invalidColumns.add(key)
            }
          })
        })

        return invalidColumns.size > 0 ? true : false
      })()

      if (hasColHeadless) {
        return {
          status: 'nok',
          message: 'Foram encontrados dados em colunas sem cabeçalho.',
        }
      }

      const keys = (() => {
        const columnStats = headers.reduce((acc, header) => {
          acc[header] = { values: new Set(), hasEmpty: false }
          return acc
        }, {})

        data.forEach((row) => {
          headers.forEach((header) => {
            const value = row[header]
            if (value === undefined || value === null || value === '') {
              columnStats[header].hasEmpty = true
            } else {
              columnStats[header].values.add(String(value))
            }
          })
        })

        const candidateKeys = headers.filter(
          (header) =>
            !columnStats[header].hasEmpty &&
            columnStats[header].values.size === data.length
        )
        return candidateKeys
      })()

      if (keys.length === 0) {
        return {
          status: 'nok',
          message:
            'Nenhuma das colunas possui dados únicos para ser usada como nome de arquivos.',
        }
      }

      return {
        status: 'ok',
        message: 'Arquivo processado com sucesso',
        sheets,
        headers,
        data,
        keys,
      }
    } catch (error) {
      return {
        status: 'nok',
        message: `Erro aoprocessar arquivo. ${error}`,
      }
    }
  }

  return {
    readerXLSX,
  }
})()
