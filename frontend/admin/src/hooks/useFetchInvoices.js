import { useState, useEffect } from "react"
import InvoicesRepository from '../services/InvoicesRepository'

export const useFetchInvoices = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [controller, setController] = useState(null)
    const [rtn, setRtn] = useState('@#%^&^%$#@')
    useEffect(() => {
        const abortController = new AbortController()
        const invoiceRepository = new InvoicesRepository()
        setController(abortController);
        if (!startDate && !endDate && rtn === '@#%^&^%$#@')
            invoiceRepository.getAll()
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
        else if (rtn)
            invoiceRepository.getByRTN(rtn)
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
        else invoiceRepository
            .getByDateRange(startDate, endDate)
            .then((result) => setData(result))
            .catch((error) => {
                if (error.name === 'AbortError')
                    console.log('Request Cancelled')
                else setError(error)
            })
            .finally(() => setLoading(false));
        return () => abortController.abort()
    }, [startDate, endDate, rtn])
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
    const handleRTN = (_rtn = null) => {
        setRtn(_rtn)
        console.log(rtn)
        console.log(data)
    }
    return { data, loading, error, handleRTN, handleDateRange, handleCancelRequest }
}