import { useState, useEffect, useRef } from 'react'
import { BsFiletypeDocx } from 'react-icons/bs'
import { useFiles } from '../providers/Files/Hook'
import { renderAsync } from 'docx-preview'

const Preview = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false)
  const previewRef = useRef(null)
  const { files } = useFiles()

  const docxFile = files?.preview

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && docxFile && previewRef.current) {
      previewRef.current.innerHTML = ''

      const options = {
        className: 'custom-docx',
        inWrapper: false,
      }

      renderAsync(docxFile, previewRef.current, null, options).catch(
        (error) => {
          console.error('Error rendering DOCX:', error)
          previewRef.current.innerHTML =
            '<p class="text-red-500">Erro ao carregar o preview do documento.</p>'
        }
      )
    }
  }, [isOpen, docxFile])

  return (
    <>
      <button
        onClick={openModal}
        disabled={!docxFile}
        className={`group flex items-center gap-2 px-4 py-2 rounded border border-or-3 transition 
    ${docxFile ? 'hover:bg-or-3 hover:text-wt-1 cursor-pointer' : 'opacity-40 cursor-not-allowed'}
  `}
        aria-label="Abrir pré-visualização do documento"
      >
        <BsFiletypeDocx className="text-or-2 group-hover:text-wt-1" size={18} />
        <span className="text-sm underline group-hover:no-underline">{`${title}.docx`}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black overflow-auto">
          <button
            onClick={closeModal}
            className="fixed top-0 right-4 text-wt-3 hover:text-wt-1 text-6xl cursor-pointer"
            aria-label="Fechar"
          >
            &times;
          </button>

          <div className="w-full text-center flex flex-col items-center space-y-4 py-6 shadow-sm">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gr-1">
                Pré-visualização do Documento
              </h3>
            </div>
            <p className="text-sm text-gr-2 max-w-md">
              Esta é apenas uma prévia para fins de revisão.
              <br />
              Pode conter pequenas divergências visuais que não estarão
              presentes no documento final.
            </p>
          </div>

          <div className="flex justify-center pb-12 pt-4 relative">
            <div
              ref={previewRef}
              className=" bg-white rounded-lg shadow-lg overflow-auto"
              style={{
                overflow: 'hidden',
                padding: 0,
                textAlign: 'initial',
              }}
            >
              {!docxFile && (
                <p className="text-bk-1">
                  Nenhum documento carregado para visualização.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Preview
