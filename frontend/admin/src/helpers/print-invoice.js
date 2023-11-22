const print = (
    dataCompany = {},
    invoiceItems = [],
    invoiceInfo = {}) => {
    // Crear un formato imprimible con la información recolectada
    if (!Array.isArray(invoiceItems) || typeof dataCompany !== 'object' || typeof invoiceInfo !== 'object') {
        alert('Los parámetros ingresados no son los requeridos!')
        return
    }
    const printableContent = `
        <div style="width: 160px; display: flex; flex-direction:column; text-align: left;">
            <div style="width: 100%; font-weight: bold; font-size:14px"><center>${dataCompany.dataName}</center></div>
            <div>Dirección: ${dataCompany.address}</div>
            <div>Correo: ${dataCompany.email}</div>
            <div>Teléfono: ${dataCompany.telphone}</div>
            <div>Sitio Web: ${dataCompany.website}</div>
            <div>RTN: 0301-9014-31231</div>
            <div>CAI: ${dataCompany.CAI}</div>
            <hr>
            <hr>
            <div>RTN del Cliente: ${invoiceInfo.rtnCustomer}</div>
            <div>Cliente: ${invoiceInfo.customerName}</div>
            <div>Vendedor: ${invoiceInfo.vendorName}</div>
            <div>Fecha de Emisión: ${invoiceInfo.creationDate}</div>
            <div>Fecha de Vencimiento: ${dataCompany.invoiceDueDate}</div>
            <div>Original* Copia</div>
            <hr>
            <hr>
            ${invoiceItems
            .map((item) => `
            <div style="width: 100%;">
                <div>${item.sku}</div>
                <div>${(item.product).length > 63 ? (item.product).slice(0, 63) + '...' : item.product}</div>
                <div>
                    <span>Unds: ${item.quantity}</span>
                    <span>P/U: ${item.price}${item.tax === 0 ? '' : '*'}${item.discount === 0 ? '' : '**'}</span>
                    <span style="display: inline-block; float: right;">L. ${item.total}</span>
                </div>
            </div>
            <hr>
            `).join('')}
            <hr>
            <div style="width: 100%; text-align: right;">
                <div>Subtotal: L. ${invoiceInfo.subtotal}</div>
                <div>ISV: L. ${invoiceInfo.taxTotal}</div>
                <div>Descuento: L. ${invoiceInfo.discountTotal}</div>
                <div>Monto Total: L. ${invoiceInfo.total}</div>
            </div>
            <div style="text-align: center;">La factura es beneficio de todos "Exíjala"</div>
      </div>
      `
    const printWindow = window.open('', ' ', '')
    printWindow.document.open()
    printWindow.document.write(`
          <html>
          <head>
              <title>&nbsp;</title>
          </head>
          <body>
          <style>
                  *{
                      margin: 0;
                      padding: 0;
                      box-sizing: border-box;
                      font-family: Arial;
                      font-size: 8px;
                  }
                  div, hr{
                      margin-top: 3px;
                  }

              </style>
          <div>${printableContent}</div>
          </body>
          </html>
      `)
    printWindow.document.close()
    printWindow.print()
    printWindow.close()
}

export default print