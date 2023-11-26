import { useState } from 'react'
import CorrelativeRepository from '../services/CorrelativeRepository'

const useCorrelative = () => {
    const correlativeRepo = new CorrelativeRepository()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const get = async () => {
        setLoading(true)
        setData(await correlativeRepo.get())
        setLoading(false)
    }

    const update = async (nInvoice) => {
        try {
            setLoading(true)
            await correlativeRepo.update(nInvoice)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }
    return { data, loading, error, get, update }
}

export default useCorrelative
