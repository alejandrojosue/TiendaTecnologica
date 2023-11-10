import jsPDF from 'jspdf'

const generatePDFReport = (
    title = '',
    columnsArr = [],
    rowsArr = []
) => {
    const doc = new jsPDF()
    // title
    doc.setFontSize(18)
    doc.text(`Reporte de ${title}`, 10, 10)
    const columns = columnsArr.map(column => (column.headerName))
    const rows = rowsArr.map(row =>
        columnsArr.map(column => row[column.field])
    );
    doc.autoTable({
        startY: 20, // Posición inicial en la página
        head: [columns], // Encabezados de la tabla
        body: rows,
    });

    doc.save(`reporte_${title}`)
}

export default generatePDFReport