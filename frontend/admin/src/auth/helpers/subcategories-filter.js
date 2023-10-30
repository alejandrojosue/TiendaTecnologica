const filterSubcategoryByCategory = (categoryName = '', subcategoryArray = []) => {
    if (!categoryName || !subcategoryArray.length) return null

    return subcategoryArray.filter(subcategory => subcategory.category === categoryName)
}
export default filterSubcategoryByCategory