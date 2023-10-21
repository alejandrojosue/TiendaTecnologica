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
                quantity: product.attributes.existencia,
                subcategory: product.attributes.subcategorias.data,
                status: product.attributes.activo,
            }))
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    async getById(id) {
        try {
            const { data } = await fetchDataFromAPI(`/productos/${id}?populate=deep`)
            return  ({
                id: data.id,
                sku: data.attributes.codigo,
                name: data.attributes.nombre,
                description: data.attributes.descripcion,
                quantity: data.attributes.existencia,
                subcategory: data.attributes.subcategorias.data,
                img: data.attributes.img.data.attributes.formats.thumbnail.url,
                status: data.attributes.activo,
            })
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }
}