import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class ProductsRepository {
    async getAll() {
        try {
            const response = await fetchDataFromAPI('/productos?populate=deep')
            return (response.data).map(product => ({
                id: product.id,
                sku: product.attributes.codigo,
                name: product.attributes.nombre,
                description: product.attributes.descripcion,
                status: product.attributes.activo,
            }))
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    async getById(id) {
        try {
            const response = await fetchDataFromAPI(`/productos/${id}?populate=deep`)
            return response.data
        } catch (error) {
            console.error('Error al obtener producto:', error);
        }
    }
}