import { useState, useEffect } from 'react'
import InvoiceRepository from '../services/InvoicesRepository'

const useInvoiceById = (invoiceId) => {
    const [invoice, setInvoice] = useState(null)

    useEffect(async () => {
        if (invoiceId) {
            try {
                const invoiceData = await (new InvoiceRepository()).getById(parseInt(invoiceId))
                setInvoice(invoiceData)
            } catch (error) {
                console.error('Error al obtener la factura:', error)
            }
        } else window.location.href = '/invoices'
    }, [invoiceId])

    return { invoice }
}

export default useInvoiceById
