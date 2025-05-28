export const reviewTags = (docxTags, xlsxTags) => {
  let includedTags = new Set()
  let notIcluedTags = new Set()
  docxTags.array.forEach((tag) => {
    if (xlsxTags.include(tag)) {
      includedTags.add(tag)
    } else {
      notIcluedTags.add(tag)
    }
  })

  includedTags = [...includedTags]
  notIcluedTags = [...notIcluedTags]

  return { includedTags, notIcluedTags }
}
