import type { Schema, Attribute } from '@strapi/strapi';

export interface DetallesDetalles extends Schema.Component {
  collectionName: 'components_detalles_detalles';
  info: {
    displayName: 'detalles';
    icon: 'shoppingCart';
    description: '';
  };
  attributes: {
    cantidad: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    precio: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    descuento: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 1;
        },
        number
      >;
    isv: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0.15>;
    producto: Attribute.Relation<
      'detalles.detalles',
      'oneToOne',
      'api::producto.producto'
    > &
      Attribute.Required;
  };
}

export interface DetallesDevoluciones extends Schema.Component {
  collectionName: 'components_detalles_devoluciones';
  info: {
    displayName: 'devoluciones';
    icon: 'attachment';
    description: '';
  };
  attributes: {
    producto: Attribute.Relation<
      'detalles.devoluciones',
      'oneToOne',
      'api::producto.producto'
    > &
      Attribute.Required;
    cantidad: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    motivo: Attribute.Text & Attribute.Required;
  };
}

export interface DetallesOrdenes extends Schema.Component {
  collectionName: 'components_detalles_ordenes';
  info: {
    displayName: 'Ordenes';
  };
  attributes: {
    producto: Attribute.Relation<
      'detalles.ordenes',
      'oneToOne',
      'api::producto.producto'
    > &
      Attribute.Required;
    cantidad: Attribute.Integer & Attribute.Required & Attribute.DefaultTo<1>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'detalles.detalles': DetallesDetalles;
      'detalles.devoluciones': DetallesDevoluciones;
      'detalles.ordenes': DetallesOrdenes;
    }
  }
}
