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

    const handleCreate = () => { }

    return { data, loading, error, handleGetAll, handleCreate, handleDateRange }
}

export default useReturn