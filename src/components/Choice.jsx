import { useState } from 'react'
import { useFiles } from '../providers/Files/Hook'
import Preview from './Preview'
import { BsFileEarmarkZip } from 'react-icons/bs'

const Choice = () => {
  const { files } = useFiles()
  const { data, keys } = files.xlsx
  const [fileName, setFileName] = useState()
  const [selectedKey, setSelectedKey] = useState(null)

  const handleClick = (key) => {
    setSelectedKey(key)
    setFileName(`${key}_${data[0][key]}`)
  }

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
            {/* Preview */}
            <div className="flex flex-col gap-2 items-center text-center">
              <span className="text-xs text-gr-2 italic">
                Pré-visualização:
              </span>
              <Preview title={fileName} />
            </div>

            {/* Divisória */}
            <div className="border-t border-gr-2" />

            {/* Botão de gerar */}
            <div className="flex flex-col gap-2 items-center text-center">
              <span className="text-xs text-gr-2 italic">
                Baixar arquivos gerados:
              </span>
              <button
                className="bg-or-3 text-wt-1 font-bold px-6 py-2 rounded hover:bg-or-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-or-1 max-w-full sm:max-w-[280px] truncate flex items-center gap-2"
                aria-label="Baixar mala direta em arquivo zip"
              >
                <BsFileEarmarkZip size={18} />
                <span className="truncate">mala-direta.zip</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Choice
