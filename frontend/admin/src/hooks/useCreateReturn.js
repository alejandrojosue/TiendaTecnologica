import { useState } from 'react';
import ReturnsRepository from '../services/ReturnsRepository'

const useCreateReturn = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const createReturn = async (returnData) => {
        setLoading(true);
        setError(null);

        try {
            const returnRepo = new ReturnsRepository();
            await returnRepo
                .create(returnData, sessionStorage.getItem('daiswadod'))
            alert('Devolución guardada exitósamente!')
            window.location.href = '/returns'
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
