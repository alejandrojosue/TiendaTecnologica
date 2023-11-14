export default class InvoiceDeatil {
    cantidad = 0
    precio = 0.0
    isv = 0.0
    descuento = 0.0
    producto = null
    constructor(
        cantidad,
        precio,
        isv,
        descuento,
        producto
    ) {
        this.cantidad = cantidad
        this.precio = precio
        this.isv = isv
        this.descuento = descuento
        this.producto = producto
    }
}