import { FaRegFileExcel } from 'react-icons/fa'
import { useLogger } from '../providers/Logger/Hook'
import { isValidFile } from '../utils/index'
import { useFiles } from '../providers/Files/Hook'
import { Xlsx } from '../utils/Xlsx'
import { Docx } from '../utils/Docx'

const XlsxImport = ({ setStep }) => {
  const { log } = useLogger()
  const { files, setFiles } = useFiles()

  const handleChange = async (e) => {
    const file = e.target.files[0]
    const isFile = isValidFile(file, 'xlsx')

    if (!isFile) {
      log('error', 'Arquivo inexistente ou inválido.')
      return
    }

    const xlsx = await Xlsx.readerXLSX(file)
    const { status, headers, message, data } = xlsx

    if (status === 'nok') {
      log('error', message)
      return
    }

    log(
      'info',
      `Tags encontradas:
      ${headers.join(' | ')}`
    )
    log('success', message)

    files.xlsx = xlsx

    const preview = await Docx.replaceTags(
      files.docx.file,
      data[0]
    )

    files.preview = preview.blob
    console.log(files)

    setFiles(files)
    setStep('files')
  }

  return (
    <div
      className="flex flex-col justify-start gap-8 w-full items-center h-auto px-4"
      role="region"
      aria-label="Instruções do aplicativo"
    >
      <h2 className="text-gradient-orange text-2xl font-bold text-center">
        importe o modelo xlsx
      </h2>

      <div className="h-full flex flex-col items-center justify-center w-full text-center">
        <label
          htmlFor="inputFile"
          className="
            flex flex-col p-4 rounded items-center gap-4
            border-4 border-dashed border-of-green-3
            cursor-pointer
          "
        >
          <p className="font-semibold mb-2">Arquivo modelo (.xlsx)</p>
          <p className="text-sm">Arraste ou clique para enviar</p>
          <FaRegFileExcel className="text-of-green-3 size-6" />
        </label>

        <input
          id="inputFile"
          type="file"
          accept=".xlsx"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default XlsxImport
