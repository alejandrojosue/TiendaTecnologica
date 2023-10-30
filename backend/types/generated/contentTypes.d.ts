import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    > &
      Attribute.Required;
    password: Attribute.Password &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 8;
      }>;
    nombre: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    apellido: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    FechaNacimiento: Attribute.Date & Attribute.Required;
    telefono: Attribute.String &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 8;
        maxLength: 8;
      }>;
    RTN: Attribute.String &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 14;
        maxLength: 14;
      }>;
    jurado: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaCategoria extends Schema.CollectionType {
  collectionName: 'categorias';
  info: {
    singularName: 'categoria';
    pluralName: 'categorias';
    displayName: 'Categoria';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nombre: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 5;
        maxLength: 70;
      }>;
    descripcion: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    img: Attribute.Media & Attribute.Required;
    producto: Attribute.Relation<
      'api::categoria.categoria',
      'oneToOne',
      'api::producto.producto'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria.categoria',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria.categoria',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCompraCompra extends Schema.CollectionType {
  collectionName: 'compras';
  info: {
    singularName: 'compra';
    pluralName: 'compras';
    displayName: 'Compra';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    proveedor: Attribute.Relation<
      'api::compra.compra',
      'oneToOne',
      'api::proveedor.proveedor'
    >;
    noFactura: Attribute.Integer & Attribute.Required & Attribute.Unique;
    metodoPago: Attribute.Enumeration<
      [
        'Efectivo',
        'Tarjeta de Cr\u00E9dito',
        'Transferencia Bancaria',
        'Cheque'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Transferencia Bancaria'>;
    detalleCompras: Attribute.Component<'detalles.detalles', true> &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::compra.compra',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::compra.compra',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCorrelativoCorrelativo extends Schema.SingleType {
  collectionName: 'correlativos';
  info: {
    singularName: 'correlativo';
    pluralName: 'correlativos';
    displayName: 'Correlativo';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    NoFactura: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }> &
      Attribute.DefaultTo<0>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::correlativo.correlativo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::correlativo.correlativo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCuponCupon extends Schema.CollectionType {
  collectionName: 'cupons';
  info: {
    singularName: 'cupon';
    pluralName: 'cupons';
    displayName: 'Cupon';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    producto: Attribute.Relation<
      'api::cupon.cupon',
      'oneToOne',
      'api::producto.producto'
    >;
    descripcion: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    descuento: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 10;
      }> &
      Attribute.DefaultTo<100>;
    codigo: Attribute.UID &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
        maxLength: 12;
      }>;
    fechaLimite: Attribute.Date & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::cupon.cupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::cupon.cupon',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDanadoDanado extends Schema.CollectionType {
  collectionName: 'danados';
  info: {
    singularName: 'danado';
    pluralName: 'danados';
    displayName: 'Da\u00F1ado';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    producto: Attribute.Relation<
      'api::danado.danado',
      'oneToOne',
      'api::producto.producto'
    >;
    Estado: Attribute.Enumeration<['Da\u00F1ado', 'No Recibido', 'Robado']> &
      Attribute.Required &
      Attribute.DefaultTo<'Da\u00F1ado'>;
    Motivo: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    Cantidad: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::danado.danado',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::danado.danado',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDevolucionDevolucion extends Schema.CollectionType {
  collectionName: 'devolucions';
  info: {
    singularName: 'devolucion';
    pluralName: 'devolucions';
    displayName: 'Devolucion';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    vendedor: Attribute.Relation<
      'api::devolucion.devolucion',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    fecha: Attribute.DateTime;
    motivo: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 25;
      }>;
    estado: Attribute.Enumeration<['Entregada', 'En proceso', 'Cancelada']> &
      Attribute.Required &
      Attribute.DefaultTo<'En proceso'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::devolucion.devolucion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::devolucion.devolucion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmpresaEmpresa extends Schema.SingleType {
  collectionName: 'empresas';
  info: {
    singularName: 'empresa';
    pluralName: 'empresas';
    displayName: 'Empresa';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nombre: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    direccion: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    correo: Attribute.Email & Attribute.Required;
    telefono: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 8;
        maxLength: 8;
      }>;
    lema: Attribute.String &
      Attribute.DefaultTo<'- Eslogan de la compa\u00F1\u00EDa -'>;
    website: Attribute.String;
    CAI: Attribute.String & Attribute.Required;
    RangoInicial: Attribute.Integer & Attribute.Required;
    RangoFinal: Attribute.Integer & Attribute.Required;
    fechaVencimiento: Attribute.Date;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::empresa.empresa',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::empresa.empresa',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGarantiaGarantia extends Schema.CollectionType {
  collectionName: 'garantias';
  info: {
    singularName: 'garantia';
    pluralName: 'garantias';
    displayName: 'Garantia';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    categoria: Attribute.Relation<
      'api::garantia.garantia',
      'oneToOne',
      'api::categoria.categoria'
    >;
    fechaCompra: Attribute.DateTime & Attribute.Required;
    fechaVencimiento: Attribute.DateTime & Attribute.Required;
    Estado: Attribute.Enumeration<['Activa', 'Vencida', 'Reclamada']> &
      Attribute.Required &
      Attribute.DefaultTo<'Activa'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::garantia.garantia',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::garantia.garantia',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInteraccionInteraccion extends Schema.CollectionType {
  collectionName: 'interaccions';
  info: {
    singularName: 'interaccion';
    pluralName: 'interaccions';
    displayName: 'Interaccion';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    users_permissions_user: Attribute.Relation<
      'api::interaccion.interaccion',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    producto: Attribute.Relation<
      'api::interaccion.interaccion',
      'oneToOne',
      'api::producto.producto'
    >;
    fecha: Attribute.DateTime & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interaccion.interaccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::interaccion.interaccion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLogLog extends Schema.CollectionType {
  collectionName: 'logs';
  info: {
    singularName: 'log';
    pluralName: 'logs';
    displayName: 'Log';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    DateTime: Attribute.DateTime;
    ACTION: Attribute.Enumeration<['POST', 'PUT', 'DELETE', 'GET']> &
      Attribute.Required;
    Table: Attribute.String & Attribute.Required;
    Description: Attribute.Text & Attribute.Required;
    admin_user: Attribute.Relation<'api::log.log', 'oneToOne', 'admin::user'>;
    rowID: Attribute.Integer & Attribute.Required;
    information: Attribute.JSON & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::log.log', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::log.log', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMarcaMarca extends Schema.CollectionType {
  collectionName: 'marcas';
  info: {
    singularName: 'marca';
    pluralName: 'marcas';
    displayName: 'Marca';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nombre: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 2;
        maxLength: 30;
      }>;
    img: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::marca.marca',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::marca.marca',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductoProducto extends Schema.CollectionType {
  collectionName: 'productos';
  info: {
    singularName: 'producto';
    pluralName: 'productos';
    displayName: 'Producto';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nombre: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 5;
        maxLength: 95;
      }>;
    codigo: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 13;
        maxLength: 13;
      }>;
    descripcion: Attribute.Text;
    marca: Attribute.Relation<
      'api::producto.producto',
      'oneToOne',
      'api::marca.marca'
    >;
    isv: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 0.15;
      }> &
      Attribute.DefaultTo<0.15>;
    precio_venta: Attribute.Float &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    precio_compra: Attribute.Float &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    existencia: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
      }> &
      Attribute.DefaultTo<1>;
    descuento: Attribute.Decimal &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 0;
        max: 1;
      }>;
    img: Attribute.Media & Attribute.Required;
    modelo: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        maxLength: 30;
      }>;
    subcategorias: Attribute.Relation<
      'api::producto.producto',
      'oneToMany',
      'api::subcategoria.subcategoria'
    >;
    activo: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::producto.producto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::producto.producto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPromocionPromocion extends Schema.CollectionType {
  collectionName: 'promocions';
  info: {
    singularName: 'promocion';
    pluralName: 'promocions';
    displayName: 'Promocion';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nombre_promocion: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 13;
      }>;
    fechaInicio: Attribute.Date & Attribute.Required;
    fechaFin: Attribute.Date & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::promocion.promocion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::promocion.promocion',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProveedorProveedor extends Schema.CollectionType {
  collectionName: 'proveedors';
  info: {
    singularName: 'proveedor';
    pluralName: 'proveedors';
    displayName: 'Proveedor';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    RTN: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 14;
        maxLength: 14;
      }>;
    nombre: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
        maxLength: 30;
      }>;
    telefono: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 8;
        maxLength: 8;
      }>;
    direccion: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 70;
      }>;
    correo: Attribute.Email & Attribute.Required & Attribute.Unique;
    website: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        maxLength: 30;
      }>;
    vendedor: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
        maxLength: 40;
      }>;
    contactoVendedor: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 8;
        maxLength: 8;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::proveedor.proveedor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::proveedor.proveedor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSubcategoriaSubcategoria extends Schema.CollectionType {
  collectionName: 'subcategorias';
  info: {
    singularName: 'subcategoria';
    pluralName: 'subcategorias';
    displayName: 'Subcategoria';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nombre: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
        maxLength: 40;
      }>;
    descripcion: Attribute.Text &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    categoria: Attribute.Relation<
      'api::subcategoria.subcategoria',
      'oneToOne',
      'api::categoria.categoria'
    > &
      Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::subcategoria.subcategoria',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::subcategoria.subcategoria',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSucursalSucursal extends Schema.CollectionType {
  collectionName: 'sucursals';
  info: {
    singularName: 'sucursal';
    pluralName: 'sucursals';
    displayName: 'Sucursal';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nombre: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 5;
      }>;
    direccion: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
    telefono: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 8;
        maxLength: 8;
      }>;
    correoSucursal: Attribute.Email & Attribute.Unique;
    fechaApertura: Attribute.Date & Attribute.Required;
    activa: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sucursal.sucursal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sucursal.sucursal',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVentaVenta extends Schema.CollectionType {
  collectionName: 'ventas';
  info: {
    singularName: 'venta';
    pluralName: 'ventas';
    displayName: 'Venta';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    noFactura: Attribute.Integer &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMax<{
        min: 0;
      }>;
    metodoPago: Attribute.Enumeration<
      [
        'Efectivo',
        'Tarjeta de Cr\u00E9dito',
        'Transferencia Bancaria',
        'Cheque'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Efectivo'>;
    cliente: Attribute.Relation<
      'api::venta.venta',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    detalleVentas: Attribute.Component<'detalles.detalles', true> &
      Attribute.Required;
    estado: Attribute.Enumeration<
      ['Pagada', 'Anulada', 'No Pagada', 'Parcialmente Pagada']
    > &
      Attribute.Required &
      Attribute.DefaultTo<'No Pagada'>;
    vendedor: Attribute.Relation<
      'api::venta.venta',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::venta.venta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::venta.venta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::categoria.categoria': ApiCategoriaCategoria;
      'api::compra.compra': ApiCompraCompra;
      'api::correlativo.correlativo': ApiCorrelativoCorrelativo;
      'api::cupon.cupon': ApiCuponCupon;
      'api::danado.danado': ApiDanadoDanado;
      'api::devolucion.devolucion': ApiDevolucionDevolucion;
      'api::empresa.empresa': ApiEmpresaEmpresa;
      'api::garantia.garantia': ApiGarantiaGarantia;
      'api::interaccion.interaccion': ApiInteraccionInteraccion;
      'api::log.log': ApiLogLog;
      'api::marca.marca': ApiMarcaMarca;
      'api::producto.producto': ApiProductoProducto;
      'api::promocion.promocion': ApiPromocionPromocion;
      'api::proveedor.proveedor': ApiProveedorProveedor;
      'api::subcategoria.subcategoria': ApiSubcategoriaSubcategoria;
      'api::sucursal.sucursal': ApiSucursalSucursal;
      'api::venta.venta': ApiVentaVenta;
    }
  }
}
