import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './notFound.scss'
const NotFound = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <h1>Página No Encontrada</h1>
            </div>
        </div>
    )
}

export default NotFound