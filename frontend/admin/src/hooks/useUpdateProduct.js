import { useState } from 'react';
import ProductsRepository from '../services/ProductsRepository';

const productsRepository = new ProductsRepository();

export const useUpdateProduct = () => {
    const [isLoadingProduct, setIsLoadingProduct] = useState(false);
    const [error, setError] = useState(null);

    const updateProduct = async (id, _quantity) => {
        setIsLoadingProduct(true);
        try {
            const { quantity } = await productsRepository.getById(id)
            await productsRepository.update({
                data: {
                    existencia: parseInt(quantity) - parseInt(_quantity)
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