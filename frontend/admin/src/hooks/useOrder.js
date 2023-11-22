import { useState } from "react"
import OrdersPurchasesRepository from '../services/OrdersPurchasesRepository'

const useOrder = () => {
    const ordersPurchasesRepository = new OrdersPurchasesRepository()
    const [data, setData] = useState([])
    const [temp, setTemp] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleGetAll = async () => {
        try {
            setLoading(true)
            await ordersPurchasesRepository.getAll()
                .then(res => {
                    setData(res)
                    setTemp(res)
                })
                .catch(err => setError(err))
                .finally(() => setLoading(false))
        } catch (error) {
            setError(error)
        }
    }

    const _handleId = async (id) => {
        try {
            setData(await ordersPurchasesRepository.getById(id))
        } catch (error) {
            setError(error)
        }
    }

    const handleId = async (id) => {
        if (id) _handleId(id)
        else window.location.href = '/orders'
    }

    const _handleDateRange = async (startDate, endDate) => {
        try {
            setData(await ordersPurchasesRepository.getByDateRange(startDate, endDate))
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

    return {
        data, loading, error,
        handleGetAll, handleId, handleDateRange
    }
}

export default useOrder