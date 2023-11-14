export default class Invoice {
    noFactura = 0
    medotoPago = null
    estado = null
    vendedor = null
    cliente = null
    detalleVentas = null
    constructor(
        noFactura,
        medotoPago,
        estado,
        vendedor,
        cliente,
        detalleVentas
    ) {
        this.noFactura = noFactura
        this.medotoPago = medotoPago
        this.estado = estado
        this.vendedor = vendedor
        this.cliente = cliente
        this.detalleVentas = detalleVentas
    }
}