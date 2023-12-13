import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import axiosClient from "../../axios";
import { setCurrentUserFunc } from "../../redux/UserSlice";
import { setUserTokenFunc } from "../../redux/UserSlice";

export default function DefaultLatyout() {
    const [menu, setMenu] = useState(false)
    const { currentUser, userToken } = useSelector(state => state.user)
    const dispatch = useDispatch();


    if (!userToken) {
        return <Navigate to="login" />
    }

    const navigation = [
        {
            name: 'Dashboard', to: '/',
        },
        {
            name: 'Surveys', to: '/surveys',
        }
    ]

    const logout = (ev) => {
        ev.preventDefault();
        axiosClient.post('/logout').then((res) => {
            dispatch(setCurrentUserFunc({}))
            dispatch(setUserTokenFunc(null))

        })
    }

    return (
        <div>
            <nav className="bg-slate-600 w-full h-20 flex justify-between">

                <div className="flex flex-wrap items-center justify-between gap-5 mx-5">
                    {navigation?.map((n, i) => (
                        <NavLink to={n.to} key={i}
                            className={({ isActive }) => isActive ?
                                'text-white font-semibold mx-2 opacity-100 cursor-pointer hover:opacity-100 bg-slate-800  p-3 rounded-md' :
                                'text-white font-semibold mx-2 opacity-70 cursor-pointer hover:opacity-100 hover:bg-slate-700 p-3 rounded-md'}>
                            {n.name}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                    <FaBell size={24} className="text-white hover:text-slate-200" />
                    <div className="relative">
                        <img onClick={() => setMenu(!menu)} className="w-12 h-12 rounded-full mx-10 active:outline"
                            src={currentUser?.imgUrl} />

                        {menu && (
                            <div className="absolute top-15 right-14 bg-white h-15 rounded-md px-4 py-2 shadow-md ">
                                <p className="whitespace-nowrap opacity-70">
                                    <b>Name: </b>  {currentUser.name} <b>Email: </b> {currentUser.email}</p>
                                <hr className="m-2" />
                                <p onClick={(ev) => logout(ev)} className=" text-md opacity-70 px-5 whitespace-nowrap text-center cursor-pointer">Sign out</p>
                            </div>
                        )}
                    </div>

                </div>
            </nav>
            <Outlet />
        </div>
    )
}
