import { useState, useEffect } from "react"
import ProductsRepository from '../services/ProductsRepository'

export const useFetchProducts = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (new ProductsRepository()).getAll()
            .then((result) => setData(result))
            .finally(() => setLoading(false))
            .catch((error) => {
                console.error('Error al obtener productos:', error)
                setLoading(false)
            })
    }, [])
    const handleDelete = (id) => { setData(data.filter((item) => item.id !== id)) }
    return { data, handleDelete }
}