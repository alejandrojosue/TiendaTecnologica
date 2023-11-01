import { fetchDataFromAPI } from './api/context' // Asegúrate de importar tu función correctamente

export default class ReturnsRepository {
    constructor() {
        if (!ReturnsRepository.instance)
            ReturnsRepository.instance = this
        return ReturnsRepository.instance
    }

    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/devolucions?populate=vendedor,noFatura,detalleDevoluciones.producto&pagination[pageSize]=100', 'GET',
                sessionStorage.getItem('daiswadod'))
            return data.map(valueReturn => ({
                id: valueReturn.id,
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

    async create(data, token) {
        try {
            const response = await fetchDataFromAPI('/devolucions', 'POST', token, data)
            if (!response) {
                // La respuesta no contiene información de la nueva devolucion.
                console.error('No se pudo obtener información del nuevo invoiceo.')
            }
        } catch (error) {
            // Maneja errores de red o del servidor
            console.error(error)

        }
    }
}