export default class OrderDetail {
    producto = null
    cantidad = 0
    constructor(productoID, cantidad) {
        this.producto = { id: parseInt(productoID) }
        this.cantidad = cantidad
    }
}