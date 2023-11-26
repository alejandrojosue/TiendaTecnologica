'use strict';

/**
 * venta controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::venta.venta', ({ strapi }) => ({
    async report(ctx) {
        try {
            ctx.query = { ...ctx.query, populate: 'cliente,detalleVentas,vendedor' }

            const response = await super.find(ctx)
            response.data = response.data?.map(sale => ({
                id: sale.id,
                'No. Factura': sale.attributes.noFactura,
                "Fecha": new Date(sale.attributes.createdAt)
                    .toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    }),
                "Método de Pago": sale.attributes.metodoPago,
                'RTN Cliente': `R${sale.attributes.cliente.data.attributes.RTN}`,
                'Nombre Cliente': sale.attributes.cliente.data.attributes.nombre,
                'Apellido Cliente': sale.attributes.cliente.data.attributes.apellido,
                'ID de Vendedor': sale.attributes.vendedor.data.id,
                'Nombre Vendedor': sale.attributes.vendedor.data.attributes.nombre,
                'Apellido Vendedor': sale.attributes.vendedor.data.attributes.apellido,
                'SubTotal': (sale.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * value.precio)
                }, 0).toFixed(2)).replace('.', ','),
                'ISV': (sale.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * value.precio * value.isv)
                }, 0).toFixed(2)).replace('.', ','),
                'Descuento': (sale.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * value.precio * value.descuento)
                }, 0).toFixed(2)).replace('.', ','),
                'Monto Total': (sale.attributes.detalleVentas.reduce((acc, value) => {
                    return acc + (value.cantidad * (value.precio * (1 + value.isv) - value.precio * value.descuento))
                }, 0).toFixed(2)).replace('.', ','),
                'Estado': sale.attributes.estado
            }));
            return response
        } catch (error) {
            ctx.body = error
        }
    }
}));
