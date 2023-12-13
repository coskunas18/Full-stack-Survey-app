import { Link } from "react-router-dom"
import axiosClient from "../axios.js"
import { useState } from "react";
import { setUserTokenFunc } from "../redux/UserSlice.js";
import { setCurrentUserFunc } from "../redux/UserSlice.js";
import { useDispatch } from "react-redux";

export default function Signup() {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [error, setError] = useState({ __html: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(userToken)
        axiosClient.post('/signup', formData).then(({ data }) => {
            dispatch(setCurrentUserFunc(data.user));
            dispatch(setUserTokenFunc(data.token))
        }).catch((error) => {
            if (error.response) {
                const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...next, ...accum], [])
                setError({ __html: finalErrors.join('<br>') }) //sunucudan gelen hata mesajlarını tek bir dizide topladık.
            }
        })
    }





    return (

        <div className="h-screen bg-slate-200 flex items-center flex-col justify-center">
            <div className="flex flex-col w-1/3 py-10 px-10 rounded gap-y-4 ">
                <div className="mb-10">
                    <p className="text-4xl font-bold text-slate-700">
                        Sign up for free!
                    </p>
                </div>
                {error.__html && (
                    <div className="bg-[#A5372A] py-2 px-3 rounded-md text-white" dangerouslySetInnerHTML={error}>

                    </div>
                )}
                <form onSubmit={onSubmit} action="#" method="POST">
                    <div className="mt-7">
                        <label className="font-semibold text-xl text-slate-500" htmlFor="">Name Surname</label>
                        <input className="border-b border-slate-500 font-semibold px-2 text-slate-500 bg-slate-200 w-full outline-none"
                            value={formData.name} onChange={handleInputChange} type="text" name="name" id="full-name" required placeholder="Full Name" />
                    </div>
                    <div className="mt-7">
                        <label className="font-semibold text-xl text-slate-500" htmlFor="email-address">Email address</label>
                        <input className="border-b border-slate-500 font-semibold px-2 text-slate-500 bg-slate-200 w-full outline-none"
                            value={formData.email} onChange={handleInputChange} type="email" name="email" id="email" placeholder="user@user.com" />
                    </div>

                    <div className="mt-7">
                        <label className="font-semibold text-xl text-slate-500" htmlFor="">Password</label>
                        <input className="border-b px-2 border-slate-500 font-semibold bg-slate-200 w-full outline-none" placeholder="Password"
                            value={formData.password} onChange={handleInputChange} type="password" name="password" id="password" />
                    </div>

                    <div className="mt-7">
                        <label className="font-semibold text-xl text-slate-500" htmlFor="password-confirmation">Password Confirmation</label>
                        <input className="border-b px-2 border-slate-500 font-semibold bg-slate-200 w-full outline-none"
                            value={formData.password_confirmation} onChange={handleInputChange} type="password" name="password_confirmation" id="password-confirmation" placeholder="Password Confirmation" />
                    </div>

                    <div>
                        <p className="mt-2 text-right text-md text-gray-600 font-semibold">
                            <Link to="/login">
                                Login with your account
                            </Link>
                        </p>
                    </div>

                    <div className="flex justify-center items-center mt-5 select-none">
                        <button type="submit" className="bg-slate-500 w-1/2 px-2 py-2 text-white rounded-md hover:bg-slate-400">
                            Sign in!
                        </button>
                    </div>
                </form>
            </div>


        </div>
    )
}
