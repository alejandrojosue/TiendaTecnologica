import InvoiceRepository from "../services/InvoicesRepository"
import { useState } from 'react'
import useCorrelative from "./useCorrelative"
import useProduct from "./useProduct"
const useInvoice = () => {
    const invoiceRepository = new InvoiceRepository()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { update } = useCorrelative()
    const { updateProduct } = useProduct()


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
            setLoading(true)
            setData(await invoiceRepository.getBySellerId(idSeller))
            setLoading(false)
        } catch (error) {
            setError(error)
        }
    }

    const handleSellerId = async (idSeller) => {
        if (idSeller) _handleSellerId(idSeller)
    }

    const handleCreate = async (data, invoiceItems) => {
        try {
            setLoading(true)
            await invoiceRepository.create(data)
            const promises = [
                update(parseInt(data.data.noFactura)),
                ...invoiceItems.map(async (item) => await updateProduct(item.id, item.quantity))
            ]
            await Promise.all(promises)
                .finally(() => setLoading(false))
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