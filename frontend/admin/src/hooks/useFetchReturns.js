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
        if (!id)
            (new ReturnsRepository()).getAll()
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
        else
            (new ReturnsRepository()).getById(id)
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
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
    return [data, loading, error, handleCancelRequest]
}

export default useFetchReturns