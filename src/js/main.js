const App = (() => {

  const setFooter = (() => {
    const date = new Date().getFullYear()
    const footer = document.querySelector('footer')
    footer.innerText = `© autoflux ${date} - Cesar Dimi`
  })()

})()
