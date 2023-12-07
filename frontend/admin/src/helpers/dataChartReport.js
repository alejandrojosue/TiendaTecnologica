const dataChartReport = (data, key, field) => {

    const months =
        [, 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    let currentMonthArr = [], lastMonthArr = [],
        lastSecondMonthArr = [], lastThirdMonthArr = []
    const currentMonth = new Date().getMonth() + 1
    const lastMonth = new Date().getMonth()
    const lastSecondMonth = new Date().getMonth() - 1
    const lastThirdMonth = new Date().getMonth() - 2
    data
        .filter(value => value.Estado === 'Pagada' && value[key] === field)
        .forEach(invoice => {
            const month = parseInt(('' + invoice.Fecha).split('/')[1])
            if (month === currentMonth)
                currentMonthArr.push(parseFloat(invoice['Monto Total'].replace(',', '.')))
            else if (month === lastMonth)
                lastMonthArr.push(parseFloat(invoice['Monto Total'].replace(',', '.')))
            else if (month === lastSecondMonth)
                lastSecondMonthArr.push(parseFloat(invoice['Monto Total'].replace(',', '.')))
            else if (month === lastThirdMonth)
                lastThirdMonthArr.push(parseFloat(invoice['Monto Total'].replace(',', '.')))
        })

    let dataChart = [
        {},
        { name: months[lastThirdMonth], Total: lastThirdMonthArr.reduce((acc, value) => { return acc + value }, 0) },
        { name: months[lastSecondMonth], Total: lastSecondMonthArr.reduce((acc, value) => { return acc + value }, 0) },
        { name: months[lastMonth], Total: lastMonthArr.reduce((acc, value) => { return acc + value }, 0) },
        { name: months[currentMonth], Total: currentMonthArr.reduce((acc, value) => { return acc + value }, 0) },
    ]


    return dataChart
}

export default dataChartReport