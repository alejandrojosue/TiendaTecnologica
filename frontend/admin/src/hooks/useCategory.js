import { useState } from "react"
import CategoriesRepository from '../services/CategoriesRepository'
import filterSubcategoryByCategory from "../helpers/subcategories-filter"

const useCategory = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const categoriesRepository = new CategoriesRepository()

    const handleGetAll = async () => {
        try {
            setData(await categoriesRepository.getAll())
        } catch (error) {
            setError(error)
        }
    }

    const handleSubcategoryByCategory = (categoryName = '', data = []) => {
        return filterSubcategoryByCategory(categoryName, data)
    }

    return [data, error,
        handleGetAll, handleSubcategoryByCategory]
}

export default useCategory