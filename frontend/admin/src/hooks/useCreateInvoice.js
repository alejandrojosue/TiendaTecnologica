import { useState } from 'react';
import InvoiceRepository from '../services/InvoicesRepository'

const useCreateInvoice = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createInvoice = async (invoiceData) => {
        setLoading(true);
        setError(null);

        try {
            const invoiceRepo = new InvoiceRepository();
            await invoiceRepo.create(invoiceData, sessionStorage.getItem('daiswadod'))
                .then(() => {
                    alert('Factura guardada exitósamente!')
                    window.location.reload()
                })
                .catch(console.error)

            setSuccess(true);


        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return {
        createInvoice,
        loading,
        error,
        success,
    };
};

export default useCreateInvoice;
