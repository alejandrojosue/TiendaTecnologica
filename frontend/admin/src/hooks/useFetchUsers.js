import { useState, useEffect } from "react"
import UsersRepository from "../services/UsersRepository"

export const useFetchUsers = (rtn) => {
    const [dataUser, setDataUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [controller, setController] = useState(null)

    useEffect(() => {
        const abortController = new AbortController()
        setController(abortController)
        setLoading(true);
        (new UsersRepository()).getCustomersByRTN(rtn)
            .then((result) => setDataUser(result))
            .catch((error) => {
                (error.name === 'AbortError')
                    ? console.log('Request Cancelled') : setError(error)
            })
            .finally(() => setLoading(false));
        return () => abortController.abort()
    }, [rtn])

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
        }
    }
    return { dataUser, loading, error, handleCancelRequest }
}