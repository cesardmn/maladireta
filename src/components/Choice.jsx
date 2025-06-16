import { useState, useRef } from 'react'
import { useFiles } from '../providers/Files/Hook'
import Preview from './Preview'
import { BsFileEarmarkZip } from 'react-icons/bs'
import { Mailling } from '../utils/Mailling'

const Choice = () => {
  const { files } = useFiles()
  const { data, keys } = files.xlsx
  const [fileName, setFileName] = useState()
  const [selectedKey, setSelectedKey] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [statusMessage, setStatusMessage] = useState('')
  const intervalRef = useRef(null)

  const handleClick = (key) => {
    setSelectedKey(key)
    setFileName(`${key}_${data[0][key]}`)
    setProgress({ current: 0, total: 0 })
    setStatusMessage('')
  }

  const handleDownload = async () => {
    setIsLoading(true)
    setProgress({ current: 0, total: data.length })
    setStatusMessage('Processando arquivos...')

    // Função para animar os pontos após "Compactando arquivos"
    const startCompactingAnimation = () => {
      let dots = 0
      setStatusMessage('Compactando arquivos')
      intervalRef.current = setInterval(() => {
        dots = (dots + 1) % 4 // 0,1,2,3
        setStatusMessage('Compactando arquivos' + '.'.repeat(dots))
      }, 2000)
    }

    try {
      const zip = await Mailling(
        data,
        files.docx.file,
        selectedKey,
        (prog) => {
          setProgress(prog)
        },
        () => {
          startCompactingAnimation()
          setProgress({ current: data.length, total: data.length })
        }
      )

      // ZIP gerado, limpa animação
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }

      if (zip.status === 'ok') {
        setStatusMessage('Download pronto!')
        // trigger download...
        const url = URL.createObjectURL(zip.zip)
        const a = document.createElement('a')
        a.href = url
        a.download = 'mala-direta.zip'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        alert(zip.message)
        setStatusMessage('')
      }
    } catch (error) {
      alert('Erro ao gerar os arquivos.')
      console.error(error)
      setStatusMessage('')
    } finally {
      setIsLoading(false)
      setProgress({ current: 0, total: 0 })
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }

  const progressPercent =
    progress.total > 0
      ? Math.round((progress.current / progress.total) * 100)
      : 0

  return (
    <div
      className="flex flex-col justify-start gap-6 w-full items-center px-4 text-wt-1"
      role="region"
      aria-label="Gerador de Arquivo"
    >
      <h2 className="text-or-1 text-2xl font-bold text-center">
        Gerar arquivos DOCX
      </h2>

      <div className="w-full max-w-3xl flex flex-col gap-8">
        {/* Botões de escolha de chave */}
        <div className="overflow-auto max-h-[300px] custom-scrollbar">
          <h3 className="text-center text-gr-2 mb-6">
            Escolha a coluna para nomear os arquivos:
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {keys.map((key) => {
              const isSelected = selectedKey === key
              return (
                <button
                  key={key}
                  onClick={() => handleClick(key)}
                  className={`w-full px-4 py-2 rounded font-semibold transition-all focus:outline-none focus-visible:ring-2 
                    ${
                      isSelected
                        ? 'bg-or-2 ring-or-1 text-wt-1 scale-105 shadow-md'
                        : 'bg-or-3 hover:bg-or-3 opacity-40 text-wt-1 hover:scale-105 hover:shadow-sm'
                    }`}
                  aria-label={`Usar chave ${key} para nome do arquivo`}
                >
                  {key}
                </button>
              )
            })}
          </div>
        </div>

        {/* Nome do arquivo + ações */}
        {fileName && (
          <div className="flex flex-col gap-6 border-t border-gr-2 pt-6">
            {/* Actions */}
            <div className="flex flex-col md:flex-row w-full gap-4 justify-center items-stretch sm:items-center">
              {/* Botão Preview */}
              <div className="flex-1 flex justify-center">
                <Preview title="preview" />
              </div>

              {/* Botão de download */}
              <div className="flex-1 flex justify-center">
                <button
                  className="w-full sm:w-auto bg-or-3 text-wt-1 font-bold px-6 py-2 rounded hover:bg-or-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-or-1 truncate flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Baixar mala direta em arquivo zip"
                  onClick={handleDownload}
                  disabled={isLoading}
                >
                  <BsFileEarmarkZip size={18} />
                  <span className="truncate">
                    {isLoading ? 'Gerando arquivos...' : 'gerar arquivos'}
                  </span>
                </button>
              </div>
            </div>

            {/* Divisória */}
            <div className="border-t border-gr-2" />

            {/* Progress bar + legenda */}
            {isLoading && progress.total > 0 && (
              <>
                <div className="w-full bg-gray-300 rounded h-3 overflow-hidden mt-2">
                  <div
                    className="bg-or-2 h-3 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="text-center mt-2 text-gr-2 font-medium">
                  {statusMessage} ({progress.current} de {progress.total})
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Choice
