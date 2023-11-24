import { useState, useEffect } from 'react';
import ProvidersRepository from '../services/ProvidersRepository ';

const useProvider = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const providersRepository = new ProvidersRepository();
        const providersData = await providersRepository.getProviders();
        setProviders(providersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching providers', error);
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);


  return { providers, loading };
};


export default useProvider;
