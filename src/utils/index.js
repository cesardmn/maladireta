export const isValidFile = (file, type) => {
  if (!file || !file.name) return false
  const fileName = file.name.toLowerCase()
  const expectedExtension = type.toLowerCase()
  return fileName.endsWith(expectedExtension)
}