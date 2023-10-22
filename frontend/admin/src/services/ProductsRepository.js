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
            const response = await fetchDataFromAPI(`/productos/${id}?populate=deep`)
            return response.data
        } catch (error) {
            console.error('Error al obtener producto:', error);
        }
    }

    async create(data, token) {
        try {
            const response = await fetchDataFromAPI('/productos', 'POST', token, data);

            if (response) {
                // El producto se creó con éxito, y response puede contener información sobre el nuevo producto creado.
                console.log('Producto creado con éxito:', response);
            } else {
                // La respuesta no contiene información del nuevo producto.
                console.error('No se pudo obtener información del nuevo producto.');
            }
        } catch (error) {
            // Maneja errores de red o del servidor
            console.error('Error al crear el producto:', error.message);
        }
    }
}