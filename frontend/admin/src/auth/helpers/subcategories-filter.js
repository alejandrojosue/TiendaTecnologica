const filterSubcategoryByCategory = (categoryName = '', subcategoryArray = []) =>{
    if(!categoryName || !subcategoryArray.length) return null

    console.log(categoryName)
    return subcategoryArray.filter(subcategory=> subcategory.category === categoryName)
}
export default filterSubcategoryByCategory