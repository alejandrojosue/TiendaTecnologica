import { useState, useEffect } from "react";
import CorrelativeRepository from "../services/CorrelativeRepository";

const useFetchCorrelative = () => {
    const [dataCorrelative, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        (new CorrelativeRepository())
            .get()
            .then((result) => setData(result))
            .catch((error) =>
                (error.name === 'AbortError') ?
                    console.log('Request Cancelled')
                    : setError(error)
            )
            .finally(() => setLoading(false))

        return () => abortController.abort()
    }, []);

    const handleCancelRequest = () => {
        if (controller) {
            controller.abort();
            setError('Request Cancelled');
        }
    };

    return { dataCorrelative, loading, error, handleCancelRequest };
};

export { useFetchCorrelative }