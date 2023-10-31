import { useState, useEffect } from "react"
import InvoicesRepository from '../services/InvoicesRepository'

export const useDashboard = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)
    const [currentDate, setCurrentDate] = useState(false)
    useEffect(() => {
        try {
            const abortController = new AbortController()
            setController(abortController);
            const currentMonth = new Date().getMonth()
            const currentYear = new Date().getFullYear()
            const startDate = currentDate ? new Date() : new Date(`${currentYear}-${currentMonth + 1}-01`)
            const endDate = currentDate ? startDate : new Date(`${currentYear}-${currentMonth + 1}-${new Date().getUTCDate()}`)
            const invoicesRepository = new InvoicesRepository()
            invoicesRepository
                .getForDashboard(startDate, endDate)
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
            return () => abortController.abort()
        } catch (error) {
            setLoading(false)
            console.log(error)
            setError(error)
        }
    }, [currentDate])
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
        }
    }

    const handleCurrentDate = (value = false) => setCurrentDate(value)

    return { data, loading, error, handleCancelRequest, handleCurrentDate }
}