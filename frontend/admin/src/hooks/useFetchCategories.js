import { useState, useEffect } from "react"
import CategoriesRepository from '../services/CategoriesRepository'

export const useFetchCategories = () => {
    const [dataCategorias, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)
    useEffect(() => {
        const abortController = new AbortController()
        setController(abortController)
        setLoading(true);
        (new CategoriesRepository()).getAll()
            .then((result) => setData(result))
            .catch((error) => {
                (error.name === 'AbortError')
                    ? console.log('Request Cancelled') : setError(error)
            })
            .finally(() => setLoading(false));
        return () => abortController.abort()
    }, [])
    const handleDelete = (id) => setData(dataCategorias.filter((item) => item.id !== id))
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
        }
    }
    return { dataCategorias, loading, error, handleDelete, handleCancelRequest }
}