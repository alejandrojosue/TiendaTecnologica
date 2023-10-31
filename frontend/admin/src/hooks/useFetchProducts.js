import { useState, useEffect } from "react"
import ProductsRepository from '../services/ProductsRepository'


const useFetchProducts = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [originalData, setOriginalData] = useState([]);

    useEffect(() => {
        (new ProductsRepository()).getAll()
            .then((result) => {
                setData(result);
                setOriginalData(result);
            })
            .finally(() => setLoading(false))
            .catch((error) => {
                console.error('Error al obtener productos:', error)
                setLoading(false)
            })
    }, []);

    const handleDelete = (id) => { setData(data.filter((item) => item.id !== id)) }
    const handleSubcategory = (id) => {
        console.log(originalData)
        setData(originalData.filter(product => product.subcategory.some(sub => sub.id === parseInt(id))))
    }

    const handleReloadPage = () => {
        window.location.reload();
    }
    return { data, handleDelete, handleSubcategory, handleReloadPage, loading }
}

const useFetchProductsByCodigo = (sku) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (new ProductsRepository()).getByCodigo(sku)
            .then((result) => setData(result))
    }, [sku])

    return { data }
}

const useFetchProductsId = (id) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        (new ProductsRepository()).getById(id)
            .then((result) => {
                setData(result);
            })
            .finally(() => setLoading(false))
            .catch((error) => {
                console.error('Error al obtener productos:', error)
                setLoading(false)
            })
    }, [id])
    const handleDelete = (id) => { setData(data.filter((item) => item.id !== id)) }
    return { data, loading, handleDelete }
}

export { useFetchProducts, useFetchProductsId, useFetchProductsByCodigo }
