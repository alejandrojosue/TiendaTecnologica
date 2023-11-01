import { fetchDataFromAPI } from './api/context'
export default class ShoppingRepository {
    async getAll() {
        try {
            const currentMonth = new Date().getMonth()
            const currentYear = new Date().getFullYear()
            const startDate = new Date(`${currentYear}-${currentMonth + 1}-01`)
            const endDate = new Date(`${currentYear}-${currentMonth + 1}-${new Date().getUTCDate()}`)
            const { data } = await fetchDataFromAPI(`/compras?populate=deep&filters[$and][0][createdAt][$gte]=${new Date(startDate).toISOString()}&filters[$and][1][createdAt][$lte]=${new Date(endDate).toISOString()}&pagination[pageSize]=200`,
                // const { data } = await fetchDataFromAPI(`/compras?populate=deep`,
                'GET', '64a578b33e94884c13c614dd84aac3e19866bdada71825207c8872cf00c6d71d13924e83ce2cc80f659335cdfd321af0523900ca33a6e37727d7bd195f4a64658e62207aff14b004373954a00509fc323ef5275efac237fdbd45e3f09aedb6371acdbf938aeb4d2e30323aa7b2296a22aa36dfee060cb177399321e384b4b0fc')
            return data.map(shop => ({
                details: shop.attributes.detalleCompras,
            }))
        } catch (error) {
            console.log('Error al obtener compras', error);
        }
    }
}