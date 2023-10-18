import { useState, useEffect } from "react"
import CategoriesRepository from '../services/CategoriesRepository'

const useFetchCategories = () => {
    const [data, setData] = useState([])
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
    const handleDelete = (id) => setData(data.filter((item) => item.id !== id))
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
        }
    }
    return { data, loading, error, handleDelete, handleCancelRequest }
}

const useGetAll = () => {
    const [data, setData] = useState([])
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
    const handleDelete = (id) => setData(data.filter((item) => item.id !== id))
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
        }
    }
    return { data, loading, error, handleDelete, handleCancelRequest }
}

export { useFetchCategories, useGetAll }