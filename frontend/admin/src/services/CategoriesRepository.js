import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class CategoriesRepository {
    constructor() {
        if (!CategoriesRepository.instance)
            CategoriesRepository.instance = this
        return CategoriesRepository.instance
    }
    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/categorias?populate=deep')
            return data.map(category => ({
                id: category.id,
                name: category.attributes.nombre,
                description: category.attributes.descripcion,
                // imgURL: category.attributes.img.data.attributes.formats.medium.url: Falla por la imagen en la bd
            }))
        } catch (error) {
            console.log('Error al obtener categorias', error);
        }
    }
    async getById(id) {
        try {
            const response = await fetchDataFromAPI(`/categorias/${id}?populate=deep`)
            return response.data
        } catch (error) {
            console.error('Error al obtener categoria:', error);
        }
    }
}