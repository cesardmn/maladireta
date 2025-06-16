import { Docx } from './Docx'
import JSZip from 'jszip'

export const Mailling = async (
  dataList,
  modelo,
  fileNameCol,
  onProgress,
  onZipStart
) => {
  const zip = new JSZip()

  try {
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      const result = await Docx.replaceTags(modelo, data)

      if (result.status === 'ok' && result.blob) {
        const fileName = `${fileNameCol}_${data[fileNameCol]}.docx`
        zip.file(fileName, result.blob)
      } else {
        console.warn(`Erro ao processar ${data[fileNameCol]}:`, result.message)
      }

      if (onProgress) {
        onProgress({ current: i + 1, total: dataList.length })
      }
    }

    if (onZipStart) {
      onZipStart()
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' })

    return {
      status: 'ok',
      message: 'success',
      zip: zipBlob,
    }
  } catch (error) {
    console.error('Erro ao gerar os arquivos:', error)

    return {
      status: 'nok',
      message: `Erro ao gerar os arquivos: ${error.message}`,
      zip: null,
    }
  }
}
