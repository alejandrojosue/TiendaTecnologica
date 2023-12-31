import { fetchDataFromAPI } from './api/context' // Asegúrate de importar tu función correctamente
export default class InvoiceRepository {
    constructor() {
        if (!InvoiceRepository.instance)
            InvoiceRepository.instance = this
        return InvoiceRepository.instance
    }
    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/ventas?populate=detalleVentas&pagination[pageSize]=80', 'GET',
                sessionStorage.getItem('daiswadod'))
            return data.map(invoice => ({
                id: invoice.id,
                nInvoice: invoice.attributes.noFactura,
                date: new Date(invoice.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                paymentMethod: invoice.attributes.metodoPago,
                total: `L. ${invoice.attributes.detalleVentas
                    .reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio * (1 + value.isv - value.descuento))
                    }, 0).toFixed(2)}`,
                status: invoice.attributes.estado
            }))
        } catch (error) {
            console.error(error)
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
                                productID: detail.producto.data.id,
                                productName: detail.producto.data.attributes.nombre,
                                sku: detail.producto.data.attributes.codigo,
                                quantity: detail.cantidad,
                                unitPrice: detail.precio,
                                discount: detail.descuento,
                                tax: detail.isv,
                                id: detail.id
                            }
                        }),
                    subtotal: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio)
                    }, 0).toFixed(2),
                    total: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio * (1 + value.isv - value.descuento))
                    }, 0).toFixed(2),
                    tax: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio * value.isv)
                    }, 0).toFixed(2),
                    discount: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio * value.descuento)
                    }, 0).toFixed(2),
                })
            else return null
        } catch (error) {
            console.error('Error al obtener invoice:', error)
        }
    }

    async getByDateRange(_startDate, _endDate) {
        const startDate = new Date(_startDate).setHours(0, 0, 0)
        const endDate = new Date(_endDate).setHours(23, 59, 59)
        try {
            const { data } =
                await fetchDataFromAPI(`/ventas?populate=deep&filters[$and][0][createdAt][$gte]=${new Date(startDate).toISOString()}&filters[$and][1][createdAt][$lte]=${new Date(endDate).toISOString()}`, 'GET',
                    sessionStorage.getItem('daiswadod'))
            return data.map(invoice => ({
                id: invoice.id,
                nInvoice: invoice.attributes.noFactura,
                date: new Date(invoice.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                paymentMethod: invoice.attributes.metodoPago,
                total: `L. ${invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento))
                }, 0).toFixed(2)}`,
                status: invoice.attributes.estado
            }))
        } catch (error) {
            console.error(error)
        }
    }

    async create(data) {
        try {
            const response = await fetchDataFromAPI('/ventas',
                'POST', sessionStorage.getItem('daiswadod'), data)

            if (!response) {
                // La respuesta no contiene información del nuevo invoiceo.
                console.error('No se pudo obtener información del nuevo invoiceo.')
            }
        } catch (error) {
            // Maneja errores de red o del servidor
            console.error('Error al crear el invoiceo:', error.message)
        }
    }

    async getForDashboard(currentDate = false) {
        try {
            const date = new Date(new Date().setDate(1)).setHours(0, 0, 0)
            const startDate = currentDate ? new Date().setHours(0, 0, 0) : date
            const { data } =
                await fetchDataFromAPI(`/ventas?populate=detalleVentas&filters[$and][0][createdAt][$gte]=${new Date(startDate).toISOString()}&sort=noFactura:DESC&pagination[pageSize]=200`,
                    'GET', sessionStorage.getItem('daiswadod'))
            return data.map(invoice => ({
                id: invoice.id,
                nInvoice: invoice.attributes.noFactura,
                date: new Date(invoice.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                paymentMethod: invoice.attributes.metodoPago,
                tax: invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * value.precio * value.isv)
                }, 0).toFixed(2),
                discount: invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * value.precio * value.descuento)
                }, 0).toFixed(2),
                total: invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento))
                }, 0).toFixed(2),
                status: invoice.attributes.estado
            }))
        } catch (error) {
            console.error(error)
        }
    }

    async getByRTN(rtn) {
        try {
            const { data } = await fetchDataFromAPI(`/ventas?populate=cliente,detalleVentas.producto&filters[$and][0][cliente][RTN][$eq]=${rtn}&sort=noFactura:DESC&pagination[pageSize]=50&filters[estado][$ne]=Anulada`,
                'GET', sessionStorage.getItem('daiswadod'))
            return data.map(invoice => ({
                id: invoice.id,
                nInvoice: invoice.attributes.noFactura,
                date: new Date(invoice.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                paymentMethod: invoice.attributes.metodoPago,
                total: `L. ${invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento))
                }, 0).toFixed(2)}`,
                status: invoice.attributes.estado
            }))
        } catch (error) {
            console.error('Error al obtener invoice:', error)
        }
    }

    async getByNoFactura(nInvoice) {
        try {
            const { data } = await fetchDataFromAPI(`/ventas?populate=cliente,vendedor,detalleVentas.producto&filters[noFactura]=${nInvoice}`,
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
                        return acc + (value.cantidad * value.precio)
                    }, 0).toFixed(2),
                    total: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento))
                    }, 0).toFixed(2),
                    tax: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio * value.isv)
                    }, 0).toFixed(2),
                    discount: data.attributes.detalleVentas.reduce((acc, value) => {
                        return acc + (value.cantidad * value.precio * value.descuento)
                    }, 0).toFixed(2),
                })
            else return null
        } catch (error) {
            console.error('Error al obtener invoice:', error)
        }
    }
    async getBySellerId(id) {
        try {
            const { data } = await fetchDataFromAPI(`/ventas?populate=detalleVentas&filters[vendedor][id][$eq]=${id}&sort=noFactura:DESC&pagination[pageSize]=200`, 'GET',
                sessionStorage.getItem('daiswadod'))
            return data.map(invoice => ({
                id: invoice.id,
                nInvoice: invoice.attributes.noFactura,
                date: new Date(invoice.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        year: 'numeric',
                        month: '2-digit',
                    }),
                paymentMethod: invoice.attributes.metodoPago,
                tax: invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * value.precio * value.isv)
                }, 0).toFixed(2),
                discount: invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * value.precio * value.descuento)
                }, 0).toFixed(2),
                total: invoice.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento))
                }, 0).toFixed(2),
                status: invoice.attributes.estado
            }))
        } catch (error) {
            console.error(error)
        }
    }

    async report(max = 1000) {
        try {
            const { data } = await fetchDataFromAPI(`/ventas/report?pagination[pageSize]=${max}`, 'GET',
                sessionStorage.getItem('daiswadod'))
            /** @param {Array} data esta configurado el mapeo en strapi */
            return data
            // const { data } = await fetchDataFromAPI(`/ventas?populate=vendedor,cliente,detalleVentas.producto&pagination[limit]=${max}`, 'GET',
            //     sessionStorage.getItem('daiswadod'))

            // return data.map(invoice => ({
            //     id: invoice.id,
            //     'No. Factura': invoice.attributes.noFactura,
            //     "Fecha": new Date(invoice.attributes.createdAt)
            //         .toLocaleDateString('es-ES', {
            //             day: '2-digit',
            //             month: '2-digit',
            //             year: 'numeric'
            //         }),
            //     "Método de Pago": invoice.attributes.metodoPago,
            //     'RTN Cliente': `R${invoice.attributes.cliente.data.attributes.RTN}`,
            //     'Nombre Cliente': invoice.attributes.cliente.data.attributes.nombre,
            //     'Apellido Cliente': invoice.attributes.cliente.data.attributes.apellido,
            //     'ID de Vendedor': invoice.attributes.vendedor.data.id,
            //     'Nombre Vendedor': invoice.attributes.vendedor.data.attributes.nombre,
            //     'Apellido Vendedor': invoice.attributes.vendedor.data.attributes.apellido,
            //     'Total': (invoice.attributes.detalleVentas.reduce((acc, value) => {
            //         return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento))
            //     }, 0).toFixed(2)).replace('.', ','),
            //     'Estado': invoice.attributes.estado
            // }))
        } catch (error) {
            console.error(error)
        }
    }
}