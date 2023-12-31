import './MuiDateRange.scss'
import 'rsuite/dist/rsuite-rtl.css'
import { DateRangePicker } from 'rsuite'
import { useState } from 'react'

const MuiDateRange = ({ onDateRangeChange }) => {
    const [dateRange, setDateRange] = useState([null, null])

    const handleDateRangeChange = (value) => {
        setDateRange(value)
        onDateRangeChange(value) // Llama a la función proporcionada por prop para pasar las fechas seleccionadas a Datatable
    }

    return (
        <div className='dates' style={{ margin: '0px 10px 0px 0px' }}>
            Rango de Fechas:&nbsp;
            <DateRangePicker onChange={handleDateRangeChange} />
        </div>
    )
}

export default MuiDateRange
