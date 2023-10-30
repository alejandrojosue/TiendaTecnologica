
export default class InvoiceValidations {
    constructor() {
        this.errorHandled = false
    }

    beforeCreate(seller, dueDate, invoiceItemsCount, invoiceFirstItem, dataCompany, dataUser) {
        const validator =
            [seller, dueDate, invoiceItemsCount, invoiceFirstItem, dataCompany, dataUser]
        if (validator.includes(null || 0) || validator.includes("" || undefined))
            return false
        return true
    }

    isExpired(dueDate) {
        if (this.errorHandled) return
        if (dueDate === undefined) return
        if (new Date() > new Date(dueDate)) {
            this._error('No puede usar este módulo, por favor actualice el CAI y fecha de expiración de la factura.')
        }
        return false
    }

    outRange(currentValue, maxValue) {
        if (this.errorHandled) return
        if (currentValue === undefined || maxValue === undefined) return
        if (currentValue > maxValue) {
            this._error('No puede usar este módulo debido a que se ha superado el límite del número de facturas autorizados, por favor actualice el CAI.')
        }
    }

    _error(msg) {
        alert(msg)
        window.location.href = '/invoices'
        this.errorHandled = true
    }
}