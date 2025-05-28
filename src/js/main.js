import { Docx } from './Docx.js'
import { Xlsx } from './Xlsx.js'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const App = (() => {
  const setFooter = (() => {
    const date = new Date().getFullYear()
    const footer = document.querySelector('footer')
    footer.innerText = `© autoflux ${date} - Cesar Dimi`
  })()

  const Context = {
    docx: {
      file: null,
      tags: [],
    },
    xlsx: {
      file: null,
      tags: [],
    },
    preview: null,
  }

  // ELEMENTS
  const $docxInput = document.querySelector('#docxInput')
  const $xlsxInput = document.querySelector('#xlsxInput')
  const $docxError = document.querySelector('.docx-error')
  const $xlsxError = document.querySelector('.xslx-error')
  const $previewLog = document.querySelector('.preview-log')
  const $generate = document.querySelector('#generate')

  // VALIDATORS
  const isValidFile = (file, type) => {
    if (!file || !file.name) return false
    const fileName = file.name.toLowerCase()
    const expectedType = type.toLowerCase()
    return fileName.endsWith(expectedType)
  }

  const reviewTags = (docxTags, xlsxTags) => {
    const match = new Set()
    const noMatch = new Set()

    docxTags.forEach((tag) => {
      if (xlsxTags.includes(tag)) {
        match.add(tag)
      } else {
        noMatch.add(tag)
      }
    })

    const matchedTags = [...match]
    const unmatchedTags = [...noMatch]

    const isValid = unmatchedTags.length === 0 && matchedTags.length > 0

    return {
      isValid,
      matchedTags,
      unmatchedTags,
    }
  }

  // ACTIONS
  const netxStep = () => {
    $docxError.textContent = ''
    const current = document.querySelector('.step.active-step')
    if (!current) return
    let next = current.nextElementSibling
    while (next && !next.classList.contains('step')) {
      next = next.nextElementSibling
    }
    if (next) {
      current.classList.remove('active-step')
      next.classList.add('active-step')
    }
  }

  const avaliateFiles = () => {
    const tagsReview = reviewTags(Context.docx.tags, Context.xlsx.tags)

    if (!tagsReview.isValid && tagsReview.matchedTags.length === 0) {
      $previewLog.textContent = 'Não há tags no documento modelo.'
    } else if (!tagsReview.isValid && tagsReview.unmatchedTags.length > 0) {
      $previewLog.textContent =
        'Há tags no documento modelo que não existem no arquivo de dados.'
    } else if (tagsReview.isValid) {
      $previewLog.textContent =
        'Documentos importados com sucesso.\n clique abaixo para gerar os arquivos.'
    }
  }

  // LISTENERS
  $docxInput.onchange = async (e) => {
    $docxError.textContent = ''
    $docxError.classList.remove('danger')
    const file = e.target.files[0]
    const isValid = isValidFile(file, '.docx')

    if (!isValid) {
      $docxError.textContent = 'Arquivo inexistente ou inválido.'
      $docxError.classList.add('danger')
      return
    }

    const tags = await Docx.getTags(file)

    if (tags.length <= 0) {
      $docxError.textContent = 'Arquivo não possui tags.'
      $docxError.classList.add('danger')
      return
    }

    Context.docx.tags = tags
    Context.docx.file = file
    netxStep()
    e.target.value = ''
  }

  const generateFiles = async () => {
    const zip = new JSZip()
    const blobList = []
    for (const row of Context.xlsx.data) {
      const blob = await Docx.replaceTags(Context.docx.file, row)
      const itemName = Object.keys(row)[0]
      const filename = `${itemName}_${row[itemName]}.docx`
      zip.file(filename, blob)
    }
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    saveAs(zipBlob, 'documentos.zip')
  }

  $xlsxInput.onchange = async (e) => {
    $xlsxError.textContent = ''
    $xlsxError.classList.remove('danger')
    const file = e.target.files[0]
    const isValid = isValidFile(file, '.xlsx')

    if (!isValid) {
      $xlsxError.textContent = 'Arquivo inexistente ou inválido.'
      $xlsxError.classList.add('danger')
      return
    }

    const { data, headers } = await Xlsx.readerXLSX(file)

    if (headers.length == 0) {
      $xlsxError.textContent = 'Arquivo não possui dados.'
      $xlsxError.classList.add('danger')
      return
    }

    Context.xlsx.tags = headers
    Context.xlsx.file = file
    Context.xlsx.data = data
    netxStep()
    e.target.value = ''
    avaliateFiles()
  }


  $generate.onclick = () => {
    generateFiles()
  }
})()
