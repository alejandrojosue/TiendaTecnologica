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

    const handleProductId = async (id) => {
        try {
            setLoading(true)
            setData(await productsRepository.getById(id))
            setLoading(false)
        } catch (error) {
            setError(error)
        }
    }

    const updateProduct = async (id, _quantity) => {
        try {
            const { quantity } = await productsRepository.getById(id)
            await productsRepository.update({
                data: {
                    existencia: parseInt(quantity) - parseInt(_quantity)
                }
            }, id)
        } catch (err) {
            setError(err)
        }
    }

    return {
        data, loading, error,
        handleGetAll, handleSubcategory,
        handleProductSku, handleProductId,
        updateProduct
    }
}

export default useProduct