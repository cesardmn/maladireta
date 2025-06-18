import { useState, useCallback } from 'react'

const FileImport = ({
  accept,
  icon,
  title,
  description,
  borderColor,
  ringColor,
  iconColor,
  onFileChange,
  loading,
  previewData,
  previewTitle,
  warningData,
  warningTitle,
}) => {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0]
        const event = { target: { files: [file] } }
        onFileChange(event)
      }
    },
    [onFileChange]
  )

  return (
    <div className="flex flex-col justify-start gap-6 w-full items-center px-4">
      <h2 className="text-gradient-orange text-2xl font-bold text-center">
        {title}
      </h2>

      <div className="w-full max-w-md">
        <label
          htmlFor="inputFile"
          tabIndex={0}
          className={`
            flex flex-col p-6 rounded items-center gap-4
            border-4 border-dashed ${borderColor}
            cursor-pointer focus:outline-none focus:ring-2 ${ringColor}
            transition-all duration-150
            ${isDragging ? 'bg-gray-100' : ''}
          `}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p className="font-semibold">{description}</p>
          <p className="text-sm text-gray-600">Arraste ou clique para enviar</p>
          {icon({ className: `${iconColor} size-8` })}
        </label>

        <input
          id="inputFile"
          type="file"
          accept={accept}
          className="hidden"
          onChange={onFileChange}
        />
      </div>

      {loading && (
        <p className="text-sm text-gray-500 animate-pulse">
          Processando arquivo...
        </p>
      )}

      {previewData && previewData.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 border rounded w-full max-w-md">
          <h3 className="font-semibold text-sm mb-2">{previewTitle}</h3>
          <p className="text-xs text-gray-700 break-words">
            {previewData.join(' | ')}
          </p>
        </div>
      )}

      {warningData && (
        <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 w-full max-w-md">
          <h3 className="font-semibold text-sm text-yellow-700 mb-2">
            {warningTitle}
          </h3>
          <pre className="text-xs text-yellow-800 whitespace-pre-wrap">
            {warningData}
          </pre>
        </div>
      )}
    </div>
  )
}

export default FileImport
