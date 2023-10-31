import InvoiceValidations from '../middlewares/invoiceValidations'

const invoiceValidations = new InvoiceValidations()

const performInvoiceValidations = (dataCompany, dataCorrelative) => {

    invoiceValidations.isExpired(dataCompany.invoiceDueDate)
    invoiceValidations.outRange(
        parseInt(dataCorrelative.nInvoice) + 1,
        parseInt(dataCompany.finalInvoiceRange)
    )
}

const beforeCreateInvoice = (seller, dataCompany, dataUser, invoiceItems) => {
    return invoiceValidations
        .beforeCreate(
            seller,
            dataCompany.invoiceDueDate, //dueDate
            invoiceItems.length,
            invoiceItems.length && invoiceItems[0].sku,
            dataCompany, dataUser
        )
}
export { performInvoiceValidations, beforeCreateInvoice }