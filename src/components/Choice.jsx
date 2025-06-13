import { useState } from 'react'
import { useFiles } from '../providers/Files/Hook'
import { BsFiletypeDocx } from 'react-icons/bs'
import Preview from './Preview'

const Choice = () => {
  const { files } = useFiles()
  const { keys, data } = files.xlsx
  const [fileName, setFileName] = useState()

  const handleClick = (key) => {
    setFileName(`${key}_${data[0][key]}`)
  }

  return (
    <div
      className="flex flex-col justify-start gap-8 w-full items-center h-auto px-4"
      role="region"
      aria-label="Gerador de Arquivo"
    >
      <h2 className="text-gradient-orange text-2xl font-bold text-center">
        gerar arquivos
      </h2>

      <div className="w-full max-w-3xl h-[85%] grid grid-rows-[1fr_7fr_2fr] gap-6 p-2 g ">
        {/* Nome do arquivo gerado */}
        <div className="flex items-center justify-center min-h-[40px]">
          {fileName && (
            <div className="flex items-center gap-2 text-wt-3 underline text-sm">
              <BsFiletypeDocx />
              <em>{`${fileName}.docx`}</em>
            </div>
          )}
        </div>

        {/* Botões de escolha de chave */}
        <div className="overflow-auto max-h-[300px]">
          <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-3 place-items-center">
            {keys.map((key) => (
              <button
                key={key}
                onClick={() => handleClick(key)}
                className="w-full bg-or-3 text-wt-1 font-semibold px-4 py-2 rounded shadow-md transition-opacity hover:opacity-100 opacity-80"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Ações (preview / gerar) */}
        <div className="flex justify-between items-center gap-4">
          {fileName && (
            <>
              <Preview />
              <button className="bg-or-3 text-wt-1 font-bold px-4 py-2 rounded hover:bg-or-4">
                Gerar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Choice
