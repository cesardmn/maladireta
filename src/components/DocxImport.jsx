import { FaRegFileWord } from 'react-icons/fa6'
import { useState } from 'react'
import { useLogger } from '../providers/Logger/Hook'
import { isValidFile, findSanitizedDifferences } from '../utils/index'
import { Docx } from '../utils/Docx'
import { useFiles } from '../providers/Files/Hook'

const DocxImport = ({ setStep }) => {
  const { log } = useLogger()
  const { files, setFiles } = useFiles()

  const [loading, setLoading] = useState(false)
  const [tagsPreview, setTagsPreview] = useState([])
  const [hasSanitizedTags, setHasSanitizedTags] = useState(null)

  const handleChange = async (e) => {
    const file = e.target.files[0]

    if (!isValidFile(file, 'docx')) {
      log('error', 'Arquivo inexistente ou inválido.')
      return
    }

    setLoading(true)

    try {
      const { tags, status, message } = await Docx.getTags(file)

      if (status === 'nok') {
        log('error', message)
        return
      }

      const sanitize = findSanitizedDifferences(tags)
      setTagsPreview(tags)

      if (sanitize.length > 0) {
        const alteracoes = sanitize
          .map((item) => `{${item.original}} → {${item.sanitized}}`)
          .join('\n')

        setHasSanitizedTags(alteracoes)

        log(
          'warning',
          `Foram encontradas tags com espaços desnecessários.
          Substituições sugeridas:
          ${alteracoes}`
        )

        return
      }

      const docx = { file, tags }
      setFiles({ ...files, docx })

      log('info', `${message}\n${tags.join(' | ')}`)
      log('success', `Arquivo ${file.name} processado com sucesso.`)
      setStep('xlsx')
    } catch (error) {
      log('error', 'Erro ao processar o arquivo .docx.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-start gap-6 w-full items-center px-4">
      <h2 className="text-gradient-orange text-2xl font-bold text-center">
        Importe o modelo DOCX
      </h2>

      <div className="w-full max-w-md">
        <label
          htmlFor="inputFile"
          tabIndex={0}
          className="
            flex flex-col p-6 rounded items-center gap-4
            border-4 border-dashed border-of-blue-2
            cursor-pointer focus:outline-none focus:ring-2 focus:ring-of-blue-2
            transition-all duration-150
          "
        >
          <p className="font-semibold">Arquivo modelo (.docx)</p>
          <p className="text-sm text-gray-600">Arraste ou clique para enviar</p>
          <FaRegFileWord className="text-of-blue-2 size-8" />
        </label>

        <input
          id="inputFile"
          type="file"
          accept=".docx"
          className="hidden"
          onChange={handleChange}
        />
      </div>

      {loading && (
        <p className="text-sm text-gray-500 animate-pulse">
          Processando arquivo...
        </p>
      )}

      {tagsPreview.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 border rounded w-full max-w-md">
          <h3 className="font-semibold text-sm mb-2">Tags encontradas:</h3>
          <p className="text-xs text-gray-700 break-words">
            {tagsPreview.join(' | ')}
          </p>
        </div>
      )}

      {hasSanitizedTags && (
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 w-full max-w-md">
          <h3 className="font-semibold text-sm text-yellow-700 mb-2">
            Tags com espaços desnecessários detectadas
          </h3>
          <pre className="text-xs text-yellow-800 whitespace-pre-wrap">
            {hasSanitizedTags}
          </pre>
        </div>
      )}
    </div>
  )
}

export default DocxImport
