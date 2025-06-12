export const isValidFile = (file, type) => {
  if (!file || !file.name) return false
  const fileName = file.name.toLowerCase()
  const expectedExtension = type.toLowerCase()
  return fileName.endsWith(expectedExtension)
}

export const sanitizeString = (str) => {
  if (str == null) return ''

  str = String(str).trim()

  // Substitui tabulações por espaço
  str = str.replace(/\t+/g, ' ')

  // Substitui quebras de linha/carriage return por espaço
  str = str.replace(/[\r\n]+/g, ' ')

  // Remove caracteres de controle (códigos charCode 0–31)
  str = Array.from(str)
    .filter((char) => char.charCodeAt(0) > 31)
    .join('')

  // Remove caracteres Unicode invisíveis de forma individual (evita a class unida)
  const invisibleChars = [
    '\u200B',
    '\u200C',
    '\u200D',
    '\uFEFF',
    '\u202F',
    '\u00A0',
  ]
  invisibleChars.forEach((char) => {
    str = str.split(char).join('')
  })

  // Reduz múltiplos espaços para um
  str = str.replace(/\s+/g, ' ')

  return str.length === 0 || str === ' ' ? '' : str
}

export const findSanitizedDifferences = (arr) => {
  return arr
    .map((original, index) => {
      const sanitized = sanitizeString(original)
      return original !== sanitized ? { index, original, sanitized } : null
    })
    .filter((item) => item !== null)
}
