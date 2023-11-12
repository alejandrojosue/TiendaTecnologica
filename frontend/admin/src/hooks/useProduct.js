import { useState } from "react"
import ProductsRepository from '../services/ProductsRepository'

const useProduct = () => {
    const productsRepository = new ProductsRepository()
    const [data, setData] = useState([])
    const [temp, setTemp] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleGetAll = async () => {
        try {
            setLoading(true)
            await productsRepository.getAll()
                .then(res => {
                    setData(res)
                    setTemp(res)
                })
                .catch(err => setError(err))
                .finally(() => setLoading(false))
        } catch (error) {
            setError(error)
        }
    }

    const handleSubcategory = (id) => {
        setData(temp.filter(product => product.subcategory.some(sub => sub.id === parseInt(id))))
    }

    const handleProductSku = async (sku) => {
        try {
            setData(await productsRepository.getByCodigo(sku))
        } catch (error) {
            setError(error)
        }
    }

    return {
        data, loading, error,
        handleGetAll, handleSubcategory,
        handleProductSku
    }
}

export default useProduct