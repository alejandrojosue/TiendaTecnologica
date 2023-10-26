'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */

  register(/*strapi*/) {
    // console.log('hola register')
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // console.log('hola bootstrap')
    try {
      //strapi.$io.raw("event", "hola")
    } catch (error) {
    }

    const ACTIONS = Object.freeze({
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE',
      GET: 'GET'
    });


    /*
      lifecycles para {PRODUCTO}
    */

    strapi.db.lifecycles.subscribe({
      models: ['api::producto.producto'],
      afterCreate: async ({ result }) => {
        const { id,
          nombre,
          descripcion,
          marca,
          isv,
          precio_venta,
          precio_compra,
          descuento,
          modelo,
          subcategorias,
          activo,
          createdAt, createdBy } = result
        const information = {
          nombre,
          descripcion,
          marca,
          isv,
          precio_venta,
          precio_compra,
          descuento,
          modelo,
          subcategorias,
          activo
        }
        await strapi.service("api::log.log").create({
          data: {
            DateTime: createdAt,
            ACTION: ACTIONS.POST,
            Table: 'PRODUCTO',
            Description: 'CREATE NEW PRODUCTO',
            admin_user: createdBy,
            rowID: id,
            information
          }
        })
      },
      beforeUpdate: async ({ params }) => {
        const admin_user = params.data.updatedBy
        const updated = params.data.updatedAt
        const { id } = params.where // id de la fila de tabla
        const {
          publishedAt,
          nombre,
          descripcion,
          marca,
          isv,
          precio_venta,
          precio_compra,
          descuento,
          modelo,
          subcategorias,
          activo
        } = await strapi.query('api::producto.producto').findOne({ id });
        const lastRecord = {
          publishedAt,
          nombre,
          descripcion,
          marca,
          isv,
          precio_venta,
          precio_compra,
          descuento,
          modelo,
          subcategorias,
          activo
        }
        if (admin_user)
          await strapi.service("api::log.log").create({
            data: {
              DateTime: updated,
              ACTION: ACTIONS.PUT,
              Table: 'PRODUCTO',
              Description: `UPDATE PRODUCTO`,
              admin_user,
              rowID: id,
              information: lastRecord
            }
          })
      }
    })

    /*
      lifecycles para {DAÑADO}
    */

    strapi.db.lifecycles.subscribe({
      models: ['api::danado.danado'],
      afterCreate: async ({ result, params }) => {
        const {
          id,
          Cantidad,
          Estado,
          Motivo,
          createdAt, createdBy } = result
        const information = {
          id,
          Cantidad,
          Estado,
          Motivo,
        }
        const productId = params.data.producto.connect[0].id
        const updateProduct = (await strapi
          .service("api::producto.producto")
          .find({ id: productId }))
          .results[0]

        await strapi.service("api::log.log").create({
          data: {
            DateTime: createdAt,
            ACTION: ACTIONS.POST,
            Table: 'DAÑADO',
            Description: 'CREATE NEW DAÑADO',
            admin_user: createdBy,
            rowID: id,
            information
          }
        })
        await strapi
          .service("api::producto.producto")
          .update(productId, {
            data: {
              existencia: parseInt(updateProduct.existencia) - parseInt(Cantidad)
            }
          })
      },
      beforeUpdate: async ({ params }) => {
        const admin_user = params.data.updatedBy
        const updated = params.data.updatedAt
        const { id } = params.where // id de la fila de tabla
        const {
          publishedAt,
          Estado,
          Motivo,
          Cantidad,
        } = await strapi.query('api::danado.danado').findOne({ id });
        const lastRecord = {
          publishedAt,
          Estado,
          Motivo,
          Cantidad,
        }
        await strapi.service("api::log.log").create({
          data: {
            DateTime: updated,
            ACTION: ACTIONS.PUT,
            Table: 'DAÑADO',
            Description: `UPDATE DAÑADO`,
            admin_user,
            rowID: id,
            information: lastRecord
          }
        })
      }
    })
  },
};
