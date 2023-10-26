import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class CompanyRepository {
    async get() {
        try {
            const { data } = await fetchDataFromAPI('/empresa')
            return {
                id: data.id,
                dataName: data.attributes.nombre,
                address: data.attributes.direccion,
                email: data.attributes.correo,
                telphone: data.attributes.telefono,
                website: data.attributes.website,
                slogan: data.attributes.lema,
                CAI: data.attributes.CAI,
                initialInvoiceRange: data.attributes.RangoInicial,
                finalInvoiceRange: data.attributes.RangoFinal,
                invoiceDueDate: data.attributes.fechaVencimiento,
            }
        } catch (error) {
            console.error(error);
        }
    }
}