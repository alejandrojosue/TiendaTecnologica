import InvoiceRepository from "../services/InvoicesRepository"
import { useState } from 'react'
const useInvoice = () => {
    const invoiceRepository = new InvoiceRepository()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleRTN = async (rtn) => {
        try {
            setData(await invoiceRepository.getByRTN((rtn).trim()))
        } catch (error) {
            setError(error)
        }
    }

    const handleGetAll = async () => {
        try {
            setLoading(true)
            setData(await invoiceRepository.getAll())
            setLoading(false)
        } catch (error) {
            setError(error)
        }
    }

    const _handleDateRange = async (startDate, endDate) => {
        try {
            setData(await invoiceRepository.getByDateRange(startDate, endDate))
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

    const _handleId = async (id) => {
        try {
            setData(await invoiceRepository.getById(id))
        } catch (error) {
            setError(error)
        }
    }

    const handleId = async (id) => {
        if (id) _handleId(id)
        else window.location.href = '/invoices'
    }

    const _handleSellerId = async (idSeller) => {
        try {
            setData(await invoiceRepository.getBySellerId(idSeller))
        } catch (error) {
            setError(error)
        }
    }

    const handleSellerId = async (idSeller) => {
        if (idSeller) _handleSellerId(idSeller)
    }

    const handleCreate = async (data) => {
        try {
            await invoiceRepository.create(data)
        } catch (error) {
            setError(error)
        }
    }

    return {
        data, loading, error,
        handleRTN, handleGetAll, handleDateRange,
        handleId, handleSellerId, handleCreate
    }
}

export default useInvoice