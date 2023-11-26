'use strict';

/**
 * devolucion controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::devolucion.devolucion', ({ strapi }) => ({
    async report(ctx) {
        try {
            ctx.query = { ...ctx.query, populate: 'vendedor,noFactura.cliente,detalleDevoluciones.producto' }

            const response = await super.find(ctx)
            response.data = response.data?.flatMap(item => (
                item.attributes.detalleDevoluciones)
                .map(value => ({
                    id: item.id,
                    "No. Factura": item.attributes.noFactura.data?.attributes.noFactura,
                    'Estado': item.attributes.estado,
                    'Fecha': new Date(item.attributes.createdAt)
                        .toLocaleDateString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                        }),
                    Vendedor: `${item.attributes.vendedor.data.attributes.nombre} ${item.attributes.vendedor.data.attributes.apellido}`,
                    'Nombre Cliente': item.attributes.noFactura.data?.attributes.cliente.data.attributes.nombre + " " +
                        item.attributes.noFactura.data?.attributes.cliente.data.attributes.apellido,
                    'Código Producto': "P" + value.producto.data.attributes.codigo,
                    "Nombre Producto": value.producto.data.attributes.nombre,
                    Cantidad: value.cantidad,
                    'Monto Total': (value.cantidad * value.producto.data.attributes.precio_venta * (1 + value.producto.data.attributes.isv - value.producto.data.attributes.descuento))
                        .toFixed(2).replace('.', ','),
                })
                ))
            return response
        } catch (error) {
            ctx.body = error
        }
    }
}));
