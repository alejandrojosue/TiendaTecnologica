import { useState, useEffect } from "react"
import InvoicesRepository from '../services/InvoicesRepository'

export const useFetchInvoices = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [rtn, setRTN] = useState(null)
    const [nInvoice, setNInvoice] = useState(null)
    const [controller, setController] = useState(null)
    useEffect(() => {
        const abortController = new AbortController()
        setController(abortController);
        if(rtn)
            (new InvoicesRepository()).getByRTN(rtn)
            .then((result) => {
                console.log('Resultado de la búsqueda:', result); // Agregar un console.log para mostrar el resultado
                setData(result);
            })
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));
                else if(nInvoice)
                (new InvoicesRepository()).getByNoFactura(nInvoice)
                .then((result) => setData(result))
                .catch((error) => {
                    if (error.name === 'AbortError')
                        console.log('Request Cancelled')
                    else setError(error)
                })
                .finally(() => setLoading(false));

       
        return () => abortController.abort()
    }, [rtn, nInvoice])
    const handleCancelRequest = () => {
        if (controller) {
            controller.abort()
            setError('Request Cancelled')
        }
    }
    const handleRTN=(rtn)=>{
        setRTN(rtn)
    }
    const handleNIvoice=(nInvoice)=>{
        setNInvoice(nInvoice)
    }
    return { data, loading, error, handleCancelRequest,handleRTN,handleNIvoice }
}