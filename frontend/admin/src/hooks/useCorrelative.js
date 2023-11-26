import { useState } from 'react'
import CorrelativeRepository from '../services/CorrelativeRepository'

const useCorrelativeUpdater = () => {
    const correlativeRepo = new CorrelativeRepository()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

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
    return { update }
}

export default useCorrelativeUpdater
