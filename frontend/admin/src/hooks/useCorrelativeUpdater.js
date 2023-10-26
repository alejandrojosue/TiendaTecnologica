import { useState, useCallback } from 'react';
import CorrelativeRepository from '../services/CorrelativeRepository'; // Asegúrate de importar tu repositorio correctamente

const useCorrelativeUpdater = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const updateCorrelative = useCallback(async (nInvoice) => {
        setLoading(true);
        setError(null);

        try {
            const correlativeRepo = new CorrelativeRepository();
            await correlativeRepo.update(nInvoice);

            setSuccess(true);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        updateCorrelative,
        loading,
        error,
        success,
    };
};

export default useCorrelativeUpdater;
