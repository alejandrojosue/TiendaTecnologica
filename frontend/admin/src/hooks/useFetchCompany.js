import { useState, useEffect } from "react";
import CompanyRepository from "../services/CompanyRepository";

export const useFetchCompany = () => {
    const [dataCompany, setDataCompany] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        setController(abortController);
        (new CompanyRepository())
            .get()
            .then((result) => setDataCompany(result))
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

    return { dataCompany, loading, error, handleCancelRequest };
};
