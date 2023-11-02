import { useState, useEffect } from "react"
import ReturnsRepository from '../services/ReturnsRepository'

const useFetchReturns = (id) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [controller, setController] = useState(null)
    useEffect(() => {
        const abortController = new AbortController()
        setController(abortController);
        if (id)
            (new ReturnsRepository()).getById(id)
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
        else if (startDate && endDate) {
            (new ReturnsRepository()).getByDateRange(startDate, endDate)
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
        }
        else
            (new ReturnsRepository()).getAll()
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
        return () => abortController.abort()
    }, [id, startDate, endDate])
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
    return [data, loading, error, handleDateRange, handleCancelRequest]
}

export default useFetchReturns