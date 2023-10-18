const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "sku",
    headerName: "Código",
    width: 140,
  },
  {
    field: "name",
    headerName: "Nombre",
    width: 550,
  },
  {
    field: "existencia",
    headerName: "Existencia",
    width: 100,
  },
  {
    field: "status",
    headerName: "Activo",
    width: 60,
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
const damagedColumns =[
  {field: "id", headerName: "ID", width: 70},
  {
    field: "sku",
    headerName: "Código",
    width: 140,
  },
  {
    field: "estado",
    headerName: "Estado",
    width: 140,
  },
  {
    field: "motivo",
    headerName: "Motivo",
    with: 140,
  },
  {
    field: "cantidad",
    headerName: "Cantidad",
    with: 100,
  }
]

export {
  productColumns, categoryColumns, subCategoryColumns, damagedColumns
}