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

export {
  productColumns, categoryColumns
}