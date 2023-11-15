import InvoicesRepository from '../services/InvoicesRepository'
import ReturnsRepository from '../services/ReturnsRepository'
import ProductsRepository from '../services/ProductsRepository'
import { useState } from 'react'
const useReport = () => {
    const invoicesRepository = new InvoicesRepository()
    const returnsRepository = new ReturnsRepository()
    const productsRepository = new ProductsRepository()
    const [data, setData] = useState([])
    const [visibleModal, setVisibleModal] = useState(false)
    const [title, setTitle] = useState('Ventas')

    const reportSales = async () => {
        await invoicesRepository.report()
            .then(result => setData(result))
            .catch(console.error)
            .finally(() => alert('Datos Cargados!'))
        setVisibleModal(true)
    }

    const reportReturns = async () => {
        await returnsRepository.report()
            .then(result => setData(result))
            .catch(console.error)
            .finally(() => alert('Datos Cargados!'))
        setVisibleModal(true)
    }

    const reportProducts = async () => {
        await productsRepository.report()
            .then(result => setData(result))
            .catch(console.error)
            .finally(() => alert('Datos Cargados!'))
        setVisibleModal(true)
    }

    const handleVisibleModal = () => setVisibleModal(!visibleModal)
    const handleTitle = (value) => setTitle(value)

    return {
        data, visibleModal, title,
        reportSales, reportProducts, reportReturns,
        handleVisibleModal, handleTitle
    }
}

export default useReport