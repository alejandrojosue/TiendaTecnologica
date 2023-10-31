const dateFormatToSpanish = (_date = '') => {
    const date = new Date(_date)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    const dateFormat = new Intl.DateTimeFormat('es-ES', options)
    return dateFormat.format(date) + " "
}
export default dateFormatToSpanish