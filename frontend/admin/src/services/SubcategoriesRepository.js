import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class SubcategoriesRepository {
    async getAll() {
        try {
            const response = await fetchDataFromAPI('/subcategorias?populate=deep')
            return (response.data).map(subcategory => ({
                id: subcategory.id,
                name: subcategory.attributes.nombre,
                description: subcategory.attributes.descripcion,
            }))
        } catch (error) {
            console.error('Error al obtener subcategorias:', error);
        }
    }

    async getById(id) {
        try {
            const response = await fetchDataFromAPI(`/subcategorias/${id}?populate=deep`)
            return response.data
        } catch (error) {
            console.error('Error al obtener subcategoria:', error);
        }
    }
}