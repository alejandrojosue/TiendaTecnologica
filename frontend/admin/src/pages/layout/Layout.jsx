import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"

const Layout = ({ children }) => {
    return (<div className="container">
        <Sidebar />
        <div className="reportContainer">
            <Navbar />
            <div className="children">
                {children}
            </div>
        </div>
    </div>)
}

export default Layout