import { FaRegFileWord } from 'react-icons/fa6'
import { useLogger } from '../providers/Logger/Hook'
import { isValidFile, findSanitizedDifferences } from '../utils/index'
import { Docx } from '../utils/Docx'
import { useFiles } from '../providers/Files/Hook'

const DocxImport = ({ setStep }) => {
  const { log } = useLogger()

  const { files, setFiles } = useFiles()

  const handleChange = async (e) => {
    const file = e.target.files[0]
    const isFile = isValidFile(file, 'docx')

    if (!isFile) {
      log('error', 'Arquivo inexistente ou inválido.')
      return
    }

    const { tags, status, message } = await Docx.getTags(file)
    if (status === 'nok') {
      log('error', message)
      return
    }

    const sanitize = findSanitizedDifferences(tags)
    if (sanitize.length > 0) {
      const alteracoes = sanitize
        .map((item) => `{${item.original}} → {${item.sanitized}}`)
        .join('\n')

      log(
        'warning',
        `Foram encontradas tags com espaços desnecessários.
        Substituições sugeridas:
        ${alteracoes}
        `
      )
      return
    }

    const docx = {
      file,
      tags,
    }

    setFiles((files['docx'] = docx))

    log('info', `${message}\n ${tags.join(' | ')}`)
    log('success', `Arquivo ${file.name} processado com suceso.`)
    setStep('xlsx')
  }

  return (
    <div
      className="flex flex-col justify-start gap-8 w-full items-center h-auto px-4"
      role="region"
      aria-label="Instruções do aplicativo"
    >
      <h2 className="text-gradient-orange text-2xl font-bold text-center">
        importe o modelo docx
      </h2>

      <div className="h-full flex flex-col items-center justify-center w-full text-center">
        <label
          htmlFor="inputFile"
          className="
            flex flex-col p-4 rounded items-center gap-4
            border-4 border-dashed border-of-blue-2
            cursor-pointer
          "
        >
          <p className="font-semibold mb-2">Arquivo modelo (.docx)</p>
          <p className="text-sm">Arraste ou clique para enviar</p>
          <FaRegFileWord className="text-of-blue-2 size-6" />
        </label>

        <input
          id="inputFile"
          type="file"
          accept=".docx"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default DocxImport
