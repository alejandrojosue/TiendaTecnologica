import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class CorrelativeRepository {
    async get() {
        try {
            const { data } = await fetchDataFromAPI('/correlativo', 'GET',
                sessionStorage.getItem('daiswadod'))
            return {
                nInvoice: data.attributes.NoFactura,
            }
        } catch (error) {
            console.log(error);
        }
    }

    async update(nInvoice = 0) {
        try {
            const data = {
                data: {
                    NoFactura: parseInt(nInvoice)
                }
            }
            await fetchDataFromAPI('/correlativo', 'PUT',
                sessionStorage.getItem('daiswadod'), data)
                .then(console.log)
                .catch(console.error)
        } catch (error) {
            console.log(error);
        }
    }
}