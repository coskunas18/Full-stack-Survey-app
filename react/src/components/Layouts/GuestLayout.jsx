import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {

    const { userToken } = useSelector(state => state.user);

    if (userToken) {
        return <Navigate to="/" />
    }
    return (
        <div>
            <Outlet />
        </div>
    )
}
