import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class CategoriesRepository {
    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/categorias?populate=deep')
            return data.map(category => ({
                id: category.id,
                name: category.attributes.nombre,
                description: category.attributes.descripcion,
                imgURL: category.attributes.img.data.attributes.formats.medium.url
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