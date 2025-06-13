import { FaRegFileExcel } from 'react-icons/fa'
import { useState } from 'react'
import { useLogger } from '../providers/Logger/Hook'
import { isValidFile } from '../utils/index'
import { useFiles } from '../providers/Files/Hook'
import { Xlsx } from '../utils/Xlsx'
import { Docx } from '../utils/Docx'

const XlsxImport = ({ setStep }) => {
  const { log } = useLogger()
  const { files, setFiles } = useFiles()

  const [loading, setLoading] = useState(false)
  const [headersPreview, setHeadersPreview] = useState([])

  const handleChange = async (e) => {
    const file = e.target.files[0]

    if (!isValidFile(file, 'xlsx')) {
      log('error', 'Arquivo inexistente ou inválido.')
      return
    }

    setLoading(true)

    try {
      const xlsx = await Xlsx.readerXLSX(file)
      const { status, headers, message, data } = xlsx

      if (status === 'nok') {
        log('error', message)
        return
      }

      log('info', `Tags encontradas: ${headers.join(' | ')}`)
      log('success', message)

      files.xlsx = xlsx

      const preview = await Docx.replaceTags(files.docx.file, data[0])
      files.preview = preview.blob

      setHeadersPreview(headers)
      setFiles(files)
      setStep('files')
    } catch (error) {
      log('error', 'Erro ao processar o arquivo.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-start gap-6 w-full items-center px-4">
      <h2 className="text-gradient-orange text-2xl font-bold text-center">
        Importe o modelo XLSX
      </h2>

      <div className="w-full max-w-md">
        <label
          htmlFor="inputFile"
          tabIndex={0}
          className="
            flex flex-col p-6 rounded items-center gap-4
            border-4 border-dashed border-of-green-3
            cursor-pointer focus:outline-none focus:ring-2 focus:ring-of-green-3
            transition-all duration-150
          "
        >
          <p className="font-semibold">Arquivo modelo (.xlsx)</p>
          <p className="text-sm text-gray-600">Arraste ou clique para enviar</p>
          <FaRegFileExcel className="text-of-green-3 size-8" />
        </label>

        <input
          id="inputFile"
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {loading && (
        <p className="text-sm text-gray-500 animate-pulse">
          Processando arquivo...
        </p>
      )}

      {headersPreview.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 border rounded w-full max-w-md">
          <h3 className="font-semibold text-sm mb-2">Tags encontradas:</h3>
          <p className="text-xs text-gray-700 break-words">
            {headersPreview.join(' | ')}
          </p>
        </div>
      )}
    </div>
  )
}

export default XlsxImport
