import { useState } from 'react'
import { FaRegFileWord } from 'react-icons/fa6'
import { useLogger } from '../providers/Logger/Hook'
import { isValidFile, findSanitizedDifferences } from '../utils/index'
import { Docx } from '../utils/Docx'
import { useFiles } from '../providers/Files/Hook'
import FileImport from './FileImport'

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
    <FileImport
      accept=".docx"
      icon={FaRegFileWord}
      title="Importe o modelo DOCX"
      description="Arquivo modelo (.docx)"
      borderColor="border-of-blue-2"
      ringColor="focus:ring-of-blue-2"
      iconColor="text-of-blue-2"
      onFileChange={handleChange}
      loading={loading}
      previewData={tagsPreview}
      previewTitle="Tags encontradas:"
      warningData={hasSanitizedTags}
      warningTitle="Tags com espaços desnecessários detectadas"
    />
  )
}

export default DocxImport
