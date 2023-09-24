import { useState, useEffect } from "react";
import { fetchDataFromAPI } from '../services/api/context';

export const useAuth = (credentials) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const authenticate = async () => {
            try {
                const response = await fetchDataFromAPI('/auth/local', 'POST', null, credentials);
                console.log(response.jwt)
                sessionStorage.setItem('jwtToken', response.jwt)
                setUser(response.user)
                setLoading(false)
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        if (credentials) {
            authenticate();
        } else {
            setLoading(false);
        }
    }, [credentials]);

    return { loading, error, user };
};
