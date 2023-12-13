import { useState } from "react";
import axiosClient from "../axios";
import { setUserTokenFunc } from "../redux/UserSlice";
import { setCurrentUserFunc } from "../redux/UserSlice";
import { useDispatch } from "react-redux";
export default function Login() {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axiosClient.post('/login', formData).then(({ data }) => {
            dispatch(setCurrentUserFunc(data.user));
            dispatch(setUserTokenFunc(data.token))
        }).catch((error) => {
            if (error.response) {
                const finalErrors = error.response.data.error
                setError(finalErrors) //sunucudan gelen hata mesajlarını tek bir dizide topladık.
            }
        })
    }




    return (
        <div className="h-screen bg-slate-200 flex items-center flex-col justify-center" >
            <div className="flex flex-col w-1/3  py-10 px-10 rounded gap-y-4 ">
                {error && (
                    <div className="bg-[#A5372A] py-2 px-3 rounded-md text-white">
                        {error}
                    </div>
                )}
                <form className="mt-5" onSubmit={onSubmit} action="#" method="POST">
                    <div className="mb-10">
                        <p className="text-4xl font-bold text-slate-700">
                            Sign in to your account
                        </p>
                    </div>
                    <div className="mt-3">
                        <label className="font-semibold text-xl text-slate-500" htmlFor="">Email address</label>
                        <input className="border-b border-slate-500 font-semibold px-2 text-slate-500 bg-slate-200 w-full outline-none"
                            onChange={handleInputChange} type="text" name="email" id="email" />
                    </div>

                    <div className="mt-5">
                        <label className="font-semibold text-xl text-slate-500" htmlFor="">Password</label>
                        <input className="border-b border-slate-500 bg-slate-200 w-full outline-none"
                            onChange={handleInputChange} type="password" name="password" id="password" />
                    </div>

                    <div className="flex items-center justify-between mt-5">
                        <div className="flex gap-2 font-semibold">
                            <p>Remember me</p>
                            <input className="accent-slate-500" type="checkbox" name="" id="" />

                        </div>

                        <div className="flex gap-2 font-medium text-slate-900 hover:text-slate-600 cursor-pointer">
                            <p>Forgot your password?</p>
                        </div>
                    </div>

                    <div className="flex justify-center items-center mt-5 select-none">
                        <button className="bg-slate-500 w-1/2 px-2 py-2 text-white rounded-md hover:bg-slate-400">
                            Sign in!
                        </button>
                    </div>
                </form>
            </div>


        </div >
    )
}
