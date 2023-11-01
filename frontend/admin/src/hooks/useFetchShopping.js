import { useState, useEffect } from "react"
import ShoppingRepository from "../services/ShoppingRepository"

export const useFetchShopping = () => {
    const [dataShop, setData] = useState([])
    const [loadingShop, setLoading] = useState(true)
    const [errorShop, setError] = useState(null)
    const [controller, setController] = useState(null)

    useEffect(() => {
        try {
            const shoppingRepository = new ShoppingRepository()
            const abortController = new AbortController()
            setController(abortController);

            shoppingRepository
                .getAll()
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
            return () => abortController.abort()
        } catch (error) {

        }
    }, [])
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
            setLoading(false)
        }
    }
    return { dataShop, loadingShop, errorShop, handleCancelRequest }
}