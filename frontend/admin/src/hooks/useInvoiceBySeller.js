import { useState, useEffect } from "react"
import InvoiceRepository from '../services/InvoicesRepository'

export const useInvoiceBySeller = (id) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)
    useEffect(() => {
        const abortController = new AbortController()
        setController(abortController)
        setLoading(true);
        const invoiceRepository = new InvoiceRepository()
        if (id)
            invoiceRepository.getBySellerId(id)
                .then((result) => setData(result))
                .catch((error) => {
                    (error.name === 'AbortError')
                        ? console.log('Request Cancelled') : setError(error)
                })
                .finally(() => setLoading(false));
        return () => abortController.abort()
    }, [id])
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
        }
    }
    return { data, loading, error, handleCancelRequest }
}