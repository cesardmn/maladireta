import { Docx } from './Docx.js'
import { Xlsx } from './Xlsx.js'

const App = (() => {
  const setFooter = (() => {
    const date = new Date().getFullYear()
    const footer = document.querySelector('footer')
    footer.innerText = `© autoflux ${date} - Cesar Dimi`
  })()

  const Context = {
    docx: {
      file: null,
      tags: []
    },
    xlsx: {
      file: null, 
      tags: []
    },
  }

  // ELEMENTS
  const $docxInput = document.querySelector('#docxInput')
  const $xlsxInput = document.querySelector('#xlsxInput')
  const $docxError = document.querySelector('.docx-error')
  const $xlsxError = document.querySelector('.xslx-error')

  // VALIDATORS
  const isValidFile = (file, type) => {
    if (!file || !file.name) return false
    const fileName = file.name.toLowerCase()
    const expectedType = type.toLowerCase()
    return fileName.endsWith(expectedType)
  }

  const netxStep = () => {
    $docxError.textContent = ''
    const current = document.querySelector('.doc-container.active-doc');
    if (!current) return;
    let next = current.nextElementSibling;
    while (next && !next.classList.contains('doc-container')) {
      next = next.nextElementSibling;
    }
    if (next) {
      current.classList.remove('active-doc');
      next.classList.add('active-doc');
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
    console.log(headers)

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
    console.log(Context)
  }
})()
