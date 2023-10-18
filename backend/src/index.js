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

    const ACTIONS = {
      POST: 'POST',
      PUT: 'PUT',
      DELETE: 'DELETE',
      GET: 'GET'
    };

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

  },
};
