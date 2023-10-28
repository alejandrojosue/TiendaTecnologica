import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class ProductsRepository {
    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/productos?populate=deep')
            return data.map(product => ({
                id: product.id,
                sku: product.attributes.codigo,
                name: product.attributes.nombre,
                description: product.attributes.descripcion,
                discount: product.attributes.descuento,
                price: product.attributes.precio_venta,
                status: product.attributes.activo,
            }))
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    async getById(id) {
        try {
            const { data } = await fetchDataFromAPI(`/productos/${id}?filters[activo]=true&populate=deep`)
            return data
        } catch (error) {
            console.error('Error al obtener producto:', error);
        }
    }

    async getByCodigo(sku) {
        try {
            const data = await fetchDataFromAPI(`/productos?filters[activo]=true&filters[codigo][$eq]=${sku}`);
            console.log(data[0].attributes)
            return ({
                sku: data[0].attributes.codigo,
                name: data[0].attributes.nombre,
                discount: data[0].attributes.descuento,
                price: data[0].attributes.precio_venta,
                status: data[0].attributes.activo,
            })
        } catch (error) {
            // Maneja errores de red o del servidor
            console.log('Error al obtener el producto repo:', error.message);
        }
    }

    async update(data, id) {
        try {
            const response = await fetchDataFromAPI(`/productos/${id}`, 'PUT', sessionStorage.getItem('daiswadod'), data);
            if (!response) console.error('Error en repo: No se pudo actualizar producto')
        } catch (error) {
            // Maneja errores de red o del servidor
            console.error('Error al actualizar el producto:', error.message);
        }
    }
}