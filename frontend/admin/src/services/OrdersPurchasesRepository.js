import { fetchDataFromAPI } from "./api/context";

export default class OrdersPurchasesRepository {
    constructor() {
        if (!OrdersPurchasesRepository.instance)
            OrdersPurchasesRepository.instance = this
        return OrdersPurchasesRepository.instance
    }
    async getAll() {
        try {
            const { data } = await fetchDataFromAPI('/ordens?populate=encargado,Ordenes.producto,proveedor',
                'GET', sessionStorage.getItem('daiswadod'))
            return data.map(order => ({
                id: order.id,
                date: new Date(order.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                agent: `${order.attributes.encargado?.data?.attributes?.nombre} ${order.attributes.encargado?.data?.attributes?.apellido}`,
                supplier: order.attributes.proveedor?.data?.attributes?.nombre,
                supplierID: order.attributes.encargado?.data?.id,
                orderDetails: (order.attributes.Ordenes)?.map(detail => ({
                    quantity: detail.cantidad,
                    productID: detail.producto?.data?.id,
                    productName: detail.producto?.data?.attributes.nombre,
                    unitPrice: detail.producto?.data?.attributes.precio_compra
                })),
                status: order.attributes.estado
            }))
        } catch (error) {
            console.log('Error al obtener ordenes de compra', error);
        }
    }

    async getById(id) {
        try {
            const { data } = await fetchDataFromAPI(`/ordens/${id}?populate=encargado,Ordenes.producto,proveedor`,
                'GET', sessionStorage.getItem('daiswadod'))
            if (data)
                return ({
                    id: data.id,
                    status: data.attributes.estado,
                    date: new Date(data.attributes.createdAt)
                        .toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }),
                    agent: data.attributes.encargado.data.attributes.nombre + ' ' + data.attributes.encargado.data.attributes.apellido,
                    supplierRTN: data.attributes.proveedor.data.attributes.RTN,
                    supplier: data.attributes.proveedor.data.attributes.nombre,
                    contactName: data.attributes.proveedor.data.attributes.contactoVendedor,
                    phone: data.attributes.proveedor.data.attributes.telefono,
                    details: data.attributes.Ordenes
                        .map(detail => {
                            return {
                                quantity: detail.cantidad,
                                productID: detail.producto?.data?.id,
                                sku: detail.producto?.data?.attributes.codigo,
                                productName: detail.producto?.data?.attributes.nombre,
                                unitPrice: detail.producto?.data?.attributes.precio_compra
                            }
                        }),
                    subtotal: data.attributes.Ordenes.reduce((acc, value) => {
                        return acc + (value.cantidad * value.producto.data.attributes.precio_compra)
                    }, 0).toFixed(2),
                    total: data.attributes.Ordenes.reduce((acc, value) => {
                        return acc + (value.cantidad * (value.producto.data.attributes.precio_compra * (1 + value.producto.data.attributes.isv) - value.producto.data.attributes.precio_compra * value.producto.data.attributes.descuento))
                    }, 0).toFixed(2),
                    tax: data.attributes.Ordenes.reduce((acc, value) => {
                        return acc + (value.cantidad * value.producto.data.attributes.precio_compra * value.producto.data.attributes.isv)
                    }, 0).toFixed(2),
                    discount: data.attributes.Ordenes.reduce((acc, value) => {
                        return acc + (value.cantidad * value.producto.data.attributes.precio_compra * value.producto.data.attributes.descuento)
                    }, 0).toFixed(2),
                })
            else return null
        } catch (error) {
            console.error('Error al obtener ordenes de compra:', error)
        }
    }

    async getByDateRange(startDate, endDate) {
        try {
            const { data } = await fetchDataFromAPI(`/ordens?populate=encargado,Ordenes.producto,proveedor&filters[$and][0][createdAt][$gte]=${new Date(startDate).toISOString()}&filters[$and][1][createdAt][$lte]=${new Date(endDate).toISOString()}`,
                'GET', sessionStorage.getItem('daiswadod'))
            return data.map(order => ({
                id: order.id,
                date: new Date(order.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                agent: `${order.attributes.encargado?.data?.attributes?.nombre} ${order.attributes.encargado?.data?.attributes?.apellido}`,
                supplier: order.attributes.proveedor?.data?.attributes?.nombre,
                supplierID: order.attributes.encargado?.data?.id,
                orderDetails: (order.attributes.Ordenes)?.map(detail => ({
                    quantity: detail.cantidad,
                    productID: detail.producto?.data?.id,
                    productName: detail.producto?.data?.attributes.nombre,
                    unitPrice: detail.producto?.data?.attributes.precio_compra
                })),
                status: order.attributes.estado
            }))
        } catch (error) {
            console.log('Error al obtener ordenes de compra', error);
        }
    }
}