import { Outlet, Navigate } from 'react-router-dom'
import { SessionValidate } from '../middlewares/SessionValidate'

const ProtectedRouted = () => {
    // SessionValidate()
    return sessionStorage.getItem('daiswadod') ? <Outlet /> : <Navigate to="/login" />
}
export default ProtectedRouted