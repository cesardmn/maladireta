const App = (() => {
  const setFooter = (() => {
    const date = new Date().getFullYear()
    const footer = document.querySelector('footer')
    footer.innerText = `© autoflux ${date} - Cesar Dimi`
  })()

  // ELEMENTS
  const $docxInput = document.querySelector('#docxInput')

  // VALIDATORS
  const isValidFile = (file, type) => {
    if (!file || !file.name) return false
    const fileName = file.name.toLowerCase()
    const expectedType = type.toLowerCase()
    return fileName.endsWith(expectedType)
  }

  // LISTENERS
  $docxInput.onchange = (e) => {
    const file = e.target.files[0]
    const isValid = isValidFile(file, '.docx')
    console.log(isValid)
    e.target.value = ''
  }
})()
