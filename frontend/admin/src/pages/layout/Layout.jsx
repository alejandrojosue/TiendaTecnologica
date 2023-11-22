import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './layout.scss'
const Layout = ({ children }) => {
    return (<div className="container">
        <Sidebar />
        <div className="layoutContainer">
            <Navbar />
            <div className="children">
                {children}
            </div>
        </div>
    </div>)
}

export default Layout