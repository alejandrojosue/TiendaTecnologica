const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "sku",
    headerName: "Código",
    width: 155,
  },
  {
    field: "name",
    headerName: "Nombre",
    width: 620,
  },
  {
    field: "quantity",
    headerName: "Existencia",
    with: 70,
    renderCell: (params) => {
      return (
        <div style={{
          color: parseInt(params.row.quantity) < 10 ? 'red' : 'black',
          fontWeight: parseInt(params.row.quantity) < 10 ? 'bold' : 'normal',
          backgroundColor: parseInt(params.row.quantity) < 10 ? '#F5B7B1' : 'transparent',
          padding: parseInt(params.row.quantity) < 10 ? '5px' : '0',
          borderRadius: parseInt(params.row.quantity) < 10 ? '5px' : '0',
        }}>
          {params.row.quantity}
        </div>
      );
    }
  },
  {
    field: "status",
    headerName: "Estado",
    width: 75,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status ? 'Activo' : 'Inactivo'}
        </div>
      );
    },
  }
]

const categoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Nombre",
    width: 200,
  },
  {
    field: "description",
    headerName: "Descripción",
    width: 430
  }
]
const subCategoryColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Nombe",
    width: 200,
  },
  {
    field: "description",
    headerName: "Descripción",
    width: 430
  }
]

const InvoiceColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "nInvoice",
    headerName: "No. Factura",
    width: 120,
  },
  {
    field: "date",
    headerName: "Fecha (dd/MM/yyyy)",
    width: 200
  },
  {
    field: "paymentMethod",
    headerName: "Método de Pago",
    width: 150
  },
  {
    field: "total",
    headerName: "Total",
    width: 150
  },
  {
    field: "status",
    headerName: "Estado",
    width: "200",
    renderCell: (params) => {
      const status = {
        "No Pagada": 'No-Pagada',
        Pagada: 'Pagada',
        Anulada: 'Anulada',
        "Parcialmente Pagada": "Parcialmente-Pagada"
      }
      return (
        <div className={`cellWithStatus ${status[params.row.status]}`}>
          {params.row.status}
        </div>
      )
    }
  }
]

const ReturnColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "nInvoice",
    headerName: "No. Factura",
    width: 100
  },
  {
    field: "date",
    headerName: "Fecha (dd/MM/yyyy)",
    width: 150
  },
  {
    field: "seller",
    headerName: "Vendedor",
    width: 400
  },
  {
    field: "status",
    headerName: "Estado",
    width: 120,
    renderCell: (params) => {
      const status = {
        Entregada: 'Entregada',
        Cancelada: 'Cancelada',
        "En proceso": "En-Proceso"
      }
      return (
        <div className={`cellWithStatus ${status[params.row.status]}`}>
          {params.row.status}
        </div>
      )
    }
  }
]

const orderColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "date",
    headerName: "Fecha (dd/MM/yyyy)",
    width: 150
  },
  {
    field: "agent",
    headerName: "Encargado de Compras",
    width: 300
  },
  {
    field: "supplier",
    headerName: "Proveedor  ",
    width: 300
  },
  {
    field: "status",
    headerName: "Estado",
    width: 120,
    renderCell: (params) => {
      const status = {
        Recibida: 'Entregada',
        Cancelada: 'Cancelada',
        "EN PROCESO": "En-Proceso"
      }
      return (
        <div className={`cellWithStatus ${status[params.row.status]}`}>
          {params.row.status}
        </div>
      )
    }
  }
]

export {
  productColumns, categoryColumns, subCategoryColumns, InvoiceColumns,
  ReturnColumns, orderColumns
}