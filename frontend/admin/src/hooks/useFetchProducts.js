import { useState, useEffect } from "react"
import ProductsRepository from '../services/ProductsRepository'

export const useFetchProducts = () => {
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
        setData(originalData.filter(product => product.subcategory.some(sub => sub.id === parseInt(id))))
    }
    const handleReloadPage = () => {
        window.location.reload();
    }   
    return { data, handleDelete, handleSubcategory, handleReloadPage}
}