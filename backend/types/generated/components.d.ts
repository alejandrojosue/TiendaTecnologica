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
      Attribute.SetMinMax<{
        min: 1;
      }> &
      Attribute.DefaultTo<1>;
    precio: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    descuento: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    isv: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<0.15>;
    producto: Attribute.Relation<
      'detalles.detalles',
      'oneToOne',
      'api::producto.producto'
    >;
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
    >;
    cantidad: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    motivo: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'detalles.detalles': DetallesDetalles;
      'detalles.devoluciones': DetallesDevoluciones;
    }
  }
}
