import { useState } from "react"
import SubcategoriesRepository from '../services/SubcategoriesRepository'
const useSubcategory = () => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const subcategoriesRepository = new SubcategoriesRepository()

    const handleGetAll = async () => {
        try {
            setData(await subcategoriesRepository.getAll())
        } catch (error) {
            setError(error)
        }
    }



    return [data, error, handleGetAll]
}

export default useSubcategory