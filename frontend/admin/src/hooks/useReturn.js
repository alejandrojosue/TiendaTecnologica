import ReturnsRepository from "../services/ReturnsRepository"
import { useState } from 'react'

const useReturn = () => {
    const returnsRepository = new ReturnsRepository()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleGetAll = async () => {
        try {
            setLoading(true)
            setData(await returnsRepository.getAll())
            setLoading(false)
        } catch (error) {
            setError(error)
        }
    }

    const _handleId = async (id) => {
        setLoading(true)
        setData(await returnsRepository.getById(id))
        setLoading(false)
    }

    const handleId = async (id) => {
        if (id) _handleId(id)
        else window.location.href = '/orders'
    }

    const _handleDateRange = async (startDate, endDate) => {
        try {
            setData(await returnsRepository.getByDateRange(startDate, endDate))
        } catch (error) {
            setError(error)
        }
    }

    const handleDateRange = (selectedDateRange) => {
        if (selectedDateRange) {
            _handleDateRange(selectedDateRange[0],
                selectedDateRange[1])
        } else {
            handleGetAll()
        }
    }

    const handleCreate = (data) => {
        setLoading(false)
        try {
            returnsRepository
                .create(data)
                .then(() => alert('Devolución guardada exitósamente!'))
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        data, loading, error,
        handleGetAll, handleCreate, handleDateRange,
        handleId
    }
}

export default useReturn