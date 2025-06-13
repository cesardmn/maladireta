'client'

import { useState, useEffect, useRef } from 'react'
import { useFiles } from '../providers/Files/Hook'
import { renderAsync } from 'docx-preview'

const Preview = () => {
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
        className="text-or-3 font-medium px-4 py-2 rounded hover:bg-gray-300"
        disabled={!docxFile}
      >
        Preview
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-auto">
          <div className="flex justify-center py-12 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-wt-3 hover:text-wt-1 text-6xl font-bold"
              aria-label="Fechar"
            >
              &times;
            </button>

            <div
              ref={previewRef}
              className="w-[210mm] h-[297mm] bg-white rounded-lg shadow-lg overflow-auto"
              style={{
                overflow: 'hidden',
                padding: 0,
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
