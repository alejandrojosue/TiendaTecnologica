import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class SubcategoriesRepository {
    constructor() {
        if (!SubcategoriesRepository.instance)
            SubcategoriesRepository.instance = this
        return SubcategoriesRepository.instance
    }
    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/subcategorias?populate=deep')
            return data.map(subcategory => ({
                id: subcategory.id,
                name: subcategory.attributes.nombre,
                description: subcategory.attributes.descripcion,
                category: subcategory.attributes.categoria.data.attributes.nombre,
            }))
        } catch (error) {
            console.log('Error al obtener subcategorias', error);
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