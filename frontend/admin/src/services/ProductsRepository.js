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
            const { data } = await fetchDataFromAPI(`/productos/${id}`)
            return data.map(product => ({
                id: product.id,
                sku: product.attributes.codigo,
                name: product.attributes.nombre,
                description: product.attributes.descripcion,
                quantity: product.attributes.existencia,
                img: product.img.data.attributes.formats.thumbnail.url,
                status: product.attributes.activo,
            }))
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }

    async getBySubcategories(id){
        try {
            // const { data } = await fetchDataFromAPI(`/productos?populate[0]=subcategorias&filters[subcategorias][nombre][$eq]=${id}`)
            // return data.map(product => ({
            //     id: product.id,
            //     sku: product.attributes.codigo,
            //     name: product.attributes.nombre,
            //     description: product.attributes.descripcion,
            //     quantity: product.attributes.existencia,
            //     status: product.attributes.activo,
            // }))
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }
}