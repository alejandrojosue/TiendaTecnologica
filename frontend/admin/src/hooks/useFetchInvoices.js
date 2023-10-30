import { useState, useEffect } from "react"
import InvoicesRepository from '../services/InvoicesRepository'

export const useFetchInvoices = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [controller, setController] = useState(null)
    useEffect(() => {
        const abortController = new AbortController()
        setController(abortController);
        if (!startDate && !endDate)
            (new InvoicesRepository()).getAll()
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
        else (new InvoicesRepository())
            .getByDateRange(startDate, endDate)
            .then((result) => setData(result))
            .catch((error) => {
                if (error.name === 'AbortError')
                    console.log('Request Cancelled')
                else setError(error)
            })
            .finally(() => setLoading(false));
        return () => abortController.abort()
    }, [startDate, endDate])
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
        }
    }

    const handleDateRange = (selectedDateRange) => {
        if (selectedDateRange) {
            setStartDate(selectedDateRange[0])
            setEndDate(selectedDateRange[1])
        }
    }
    return { data, loading, error, handleDateRange, handleCancelRequest }
}