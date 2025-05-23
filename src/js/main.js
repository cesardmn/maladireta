const App = (() => {
  const setFooter = (() => {
    const date = new Date().getFullYear()
    const footer = document.querySelector('footer')
    footer.innerText = `© autoflux ${date} - Cesar Dimi`
  })()

  const isValidFile = (file, type) => {
    if (!file || !file.name) return false
    const fileName = file.name.toLowerCase()
    const expectedType = type.toLowerCase()
    return fileName.endsWith(expectedType)
  }
})()
