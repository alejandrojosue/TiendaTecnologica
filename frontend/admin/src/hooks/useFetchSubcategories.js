import { useState, useEffect } from "react"
import SubcategoriesRepository from '../services/SubcategoriesRepository'

export const useFetchSubcategories = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)
    useEffect(() => {
        const abortController = new AbortController()
        setController(abortController);
        (new SubcategoriesRepository()).getAll()
            .then((result) => setData(result))
            .catch((error) => {
                if (error.name === 'AbortError')
                    console.log('Request Cancelled')
                else setError(error)
            })
            .finally(() => setLoading(false));
        return () => abortController.abort()
    }, [])
    const handleDelete = (id) => setData(data.filter((item) => item.id !== id))
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
        }
    }
    return { data, loading, error, handleDelete, handleCancelRequest }
}