export default class Return {
    estado = ''
    vendedor = null
    noFactura = null
    detalleDevoluciones
    constructor(estado, vendedor, noFactura, detalleDevoluciones) {
        this.estado = estado
        this.vendedor = vendedor
        this.noFactura = noFactura
        this.detalleDevoluciones = detalleDevoluciones
    }

}