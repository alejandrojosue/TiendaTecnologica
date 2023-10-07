import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './unauthorized.scss'
const Unauthorized = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <h1>No autorizado!</h1>
            </div>
        </div>
    )
}

export default Unauthorized