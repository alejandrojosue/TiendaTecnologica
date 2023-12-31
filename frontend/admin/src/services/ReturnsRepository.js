import { fetchDataFromAPI } from './api/context' // Asegúrate de importar tu función correctamente

export default class ReturnsRepository {
    constructor() {
        if (!ReturnsRepository.instance)
            ReturnsRepository.instance = this
        return ReturnsRepository.instance
    }

    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/devolucions?populate=vendedor,noFactura,detalleDevoluciones.producto&pagination[pageSize]=100', 'GET',
                sessionStorage.getItem('daiswadod'))
            return data.map(valueReturn => ({
                id: valueReturn.id,
                nInvoice: valueReturn.attributes.noFactura.data?.attributes.noFactura,
                status: valueReturn.attributes.estado,
                date: new Date(valueReturn.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                seller: `${valueReturn.attributes.vendedor.data.attributes.nombre} ${valueReturn.attributes.vendedor.data.attributes.apellido}`,
                details:
                    (valueReturn.attributes.detalleDevoluciones)
                        .map(value => ({
                            id: value.id,
                            quantity: value.cantidad,
                            poductSKU: value.producto.data.attributes.codigo,
                            poductName: value.producto.data.attributes.nombre,
                        })),
            }))
        } catch (error) {
            console.error(error)
        }
    }

    async getById(id) {
        try {
            const { data } = await fetchDataFromAPI(`/devolucions/${id}?populate=vendedor,noFactura,detalleDevoluciones.producto&pagination[pageSize]=100`, 'GET',
                sessionStorage.getItem('daiswadod'))
            return ({
                id: data.id,
                nInvoice: data.attributes.noFactura.data.attributes.noFactura,
                status: data.attributes.estado,
                date: new Date(data.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                seller: `${data.attributes.vendedor.data.attributes.nombre} ${data.attributes.vendedor.data.attributes.apellido}`,
                details:
                    (data.attributes.detalleDevoluciones)
                        .map(value => ({
                            id: value.id,
                            quantity: value.cantidad,
                            reason: value.motivo,
                            productSKU: value.producto.data.attributes.codigo,
                            productName: value.producto.data.attributes.nombre,
                        })),
            })
        } catch (error) {
            console.error(error)
        }
    }

    async getByDateRange(_startDate, _endDate) {
        const startDate = new Date(_startDate).setHours(0, 0, 0)
        const endDate = new Date(_endDate).setHours(23, 59, 59)
        try {
            const { data } = await fetchDataFromAPI(`/devolucions?populate=vendedor,noFactura,detalleDevoluciones.producto&pagination[pageSize]=100&filters[$and][0][createdAt][$gte]=${new Date(startDate).toISOString()}&filters[$and][1][createdAt][$lte]=${new Date(endDate).toISOString()}`, 'GET',
                sessionStorage.getItem('daiswadod'))
            return data.map(valueReturn => ({
                id: valueReturn.id,
                nInvoice: valueReturn.attributes.noFactura.data.attributes.noFactura,
                status: valueReturn.attributes.estado,
                date: new Date(valueReturn.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                seller: `${valueReturn.attributes.vendedor.data.attributes.nombre} ${valueReturn.attributes.vendedor.data.attributes.apellido}`,
                details:
                    (valueReturn.attributes.detalleDevoluciones)
                        .map(value => ({
                            id: value.id,
                            quantity: value.cantidad,
                            poductSKU: value.producto.data.attributes.codigo,
                            poductName: value.producto.data.attributes.nombre,
                        })),
            }))
        } catch (error) {
            console.error(error)
        }
    }

    async create(data) {
        try {
            const response = await fetchDataFromAPI('/devolucions',
                'POST', sessionStorage.getItem('daiswadod'), data)
            if (!response) {
                alert('No se pudo crear nueva devolucion.')
            }
        } catch (error) {
            console.error(error)

        }
    }

    async report(max = 1000) {
        try {
            const { data } = await fetchDataFromAPI(`/devoluciones/report?pagination[limit]=${max}`, 'GET',
                sessionStorage.getItem('daiswadod'))
            return data
        } catch (error) {
            console.error(error)
        }
    }
}