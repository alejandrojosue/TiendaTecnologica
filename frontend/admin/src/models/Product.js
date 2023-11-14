export default class Product {
    id = 0
    nombre = null
    codigo = null
    descripcion = null
    isv = 0.0
    precio_venta = 0.0
    precio_compra = 0.0
    existencia = 0
    descuento = 0
    modelo = null
    activo = false
    constructor(
        id,
        // nombre,
        // codigo,
        // descripcion,
        // isv,
        // precio_venta,
        // precio_compra,
        // existencia,
        // descuento,
        // modelo,
        // activo
    ) {
        this.id = id
    }
}