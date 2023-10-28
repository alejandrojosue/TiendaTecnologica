import { useState } from 'react';
import ProductsRepository from '../services/ProductsRepository';

const productsRepository = new ProductsRepository();

export const useUpdateProduct = () => {
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [error, setError] = useState(null);

    const updateProduct = async (id, quantity) => {
        setIsLoadingProduct(true);
        try {
            const data = await productsRepository.getById(id)
            await productsRepository.update({
                data: {
                    existencia: parseInt(data.attributes.existencia) - parseInt(quantity)
                }
            }, id)
            setIsLoadingProduct(false);
        } catch (err) {
            setError(err);
            setIsLoadingProduct(false);
            return null;
        }
    };

    return {
        isLoadingProduct,
        error,
        updateProduct,
    };
};
