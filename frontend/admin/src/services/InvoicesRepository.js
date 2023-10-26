import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class InvoiceRepository {
    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/ventas?populate=deep', 'GET',
                sessionStorage.getItem('daiswadod'))
            return data.map(invoice => ({
                id: invoice.id,
                nInvoice: invoice.attributes.noFactura,
                date: `${new Date(invoice.attributes.createdAt).getDay()} /
                        ${new Date(invoice.attributes.createdAt).getMonth() + 1} /
                        ${new Date(invoice.attributes.createdAt).getFullYear()}`,
                paymentMethod: invoice.attributes.metodoPago,
                total: `L. ${invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento / 100));
                }, 0)}`,
                status: invoice.attributes.estado
            }))
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        try {
            const response = await fetchDataFromAPI(`/ventas/${id}?populate=deep`)
            return response.data
        } catch (error) {
            console.error('Error al obtener invoiceo:', error);
        }
    }

    async getByDateRange(startDate, endDate = new Date().toISOString()) { }

    async create(data, token) {
        try {
            const response = await fetchDataFromAPI('/ventas', 'POST', token, data);

            if (!response) {
                // La respuesta no contiene información del nuevo invoiceo.
                console.error('No se pudo obtener información del nuevo invoiceo.');
            }
        } catch (error) {
            // Maneja errores de red o del servidor
            console.error('Error al crear el invoiceo:', error.message);
        }
    }
}