export default class Order {
    encargado = null
    proveedor = null
    resumen = ''
    estado = ''
    constructor(encargado, proveedor, Ordenes, resumen, estado) {
        this.encargado = encargado
        this.proveedor = proveedor
        this.Ordenes = Ordenes
        this.resumen = resumen
        this.estado = estado
    }
}