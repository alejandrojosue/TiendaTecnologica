import { useState } from 'react';
import ReturnsRepository from '../services/ReturnsRepository'

const useCreateReturn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createReturn = (returnData) => {
        setLoading(true);
        setError(null);

        try {
            const returnRepo = new ReturnsRepository();
            returnRepo
                .create(returnData)
                .then(() => alert('Devolución guardada exitósamente!'))
            setSuccess(true);
        } catch (error) {
            setError(error);
            alert(error)
        } finally {
            setLoading(false);
        }
    };

    return {
        createReturn,
        loading,
        error,
        success,
    };
};

export default useCreateReturn;
