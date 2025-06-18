import { useState } from 'react'
import { FaRegFileExcel } from 'react-icons/fa'
import { useLogger } from '../providers/Logger/Hook'
import { isValidFile } from '../utils/index'
import { useFiles } from '../providers/Files/Hook'
import { Xlsx } from '../utils/Xlsx'
import { Docx } from '../utils/Docx'
import FileImport from './FileImport'

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
    <FileImport
      accept=".xlsx"
      icon={FaRegFileExcel}
      title="Importe o modelo XLSX"
      description="Arquivo modelo (.xlsx)"
      borderColor="border-of-green-3"
      ringColor="focus:ring-of-green-3"
      iconColor="text-of-green-3"
      onFileChange={handleChange}
      loading={loading}
      previewData={headersPreview}
      previewTitle="Tags encontradas:"
    />
  )
}

export default XlsxImport
