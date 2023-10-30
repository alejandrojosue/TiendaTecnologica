import { fetchDataFromAPI } from './api/context'; // Asegúrate de importar tu función correctamente
export default class InvoiceRepository {
    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/ventas?populate=deep&pagination[pageSize]=80', 'GET',
                sessionStorage.getItem('daiswadod'))
            return data.map(invoice => ({
                id: invoice.id,
                nInvoice: invoice.attributes.noFactura,
                date: `${new Date(invoice.attributes.createdAt).getDate()} /
                        ${new Date(invoice.attributes.createdAt).getMonth() + 1} /
                        ${new Date(invoice.attributes.createdAt).getFullYear()}`,
                paymentMethod: invoice.attributes.metodoPago,
                total: `L. ${invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento));
                }, 0).toFixed(2)}`,
                status: invoice.attributes.estado
            }))
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        try {
            const { data } = await fetchDataFromAPI(`/ventas/${id}?populate[0]=cliente&populate[1]=vendedor&populate[2]=detalleVentas.producto`,
                'GET', sessionStorage.getItem('daiswadod'))
            if (data)
                return ({
                    nInvoice: data.attributes.noFactura,
                    status: data.attributes.estado,
                    date: new Date(data.attributes.createdAt)
                        .toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }),
                    customer: data.attributes.cliente.data.attributes.nombre + ' ' + data.attributes.cliente.data.attributes.apellido,
                    seller: data.attributes.vendedor.data.attributes.nombre + ' ' + data.attributes.vendedor.data.attributes.apellido,
                    details: data.attributes.detalleVentas
                        .map(detail => {
                            return {
                                productName: detail.producto.data.attributes.nombre,
                                sku: detail.producto.data.attributes.codigo,
                                quantity: detail.cantidad,
                                unitPrice: detail.precio,
                                discount: detail.descuento,
                                tax: detail.isv,
                            }
                        }),
                    subtotal: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio);
                    }, 0).toFixed(2),
                    total: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento));
                    }, 0).toFixed(2),
                    tax: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio * value.isv);
                    }, 0).toFixed(2),
                    discount: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio * value.descuento);
                    }, 0).toFixed(2),
                })
            else return null
        } catch (error) {
            console.error('Error al obtener invoice:', error);
        }
    }

    async getByDateRange(startDate, endDate = new Date().toISOString()) {
        try {
            const { data } =
                await fetchDataFromAPI(`/ventas?populate=deep&filters[$and][0][createdAt][$gte]=${new Date(startDate).toISOString()}&filters[$and][1][createdAt][$lte]=${new Date(endDate).toISOString()}`, 'GET',
                    sessionStorage.getItem('daiswadod'))
            return data.map(invoice => ({
                id: invoice.id,
                nInvoice: invoice.attributes.noFactura,
                date: `${new Date(invoice.attributes.createdAt).getDate()} /
                        ${new Date(invoice.attributes.createdAt).getMonth() + 1} /
                        ${new Date(invoice.attributes.createdAt).getFullYear()}`,
                paymentMethod: invoice.attributes.metodoPago,
                total: `L. ${invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento));
                }, 0).toFixed(2)}`,
                status: invoice.attributes.estado
            }))
        } catch (error) {
            console.error(error);
        }
    }

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