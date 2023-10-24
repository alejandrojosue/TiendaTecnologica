import { useState, useEffect } from "react"
import ProductsRepository from '../services/ProductsRepository'

const useFetchProducts = () => {
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

const useFetchProductsByCodigo = (sku) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (new ProductsRepository()).getByCodigo(sku)
            .then((result) => setData(result))
            .finally(() => setLoading(false))
            .catch((error) => {
                console.error('Error al obtener productos:', error)
                setLoading(false)
            })
    }, [sku])
    const handleDelete = (id) => { setData(data.filter((item) => item.id !== id)) }
    return { data, loading, handleDelete }
}

export { useFetchProducts, useFetchProductsByCodigo }