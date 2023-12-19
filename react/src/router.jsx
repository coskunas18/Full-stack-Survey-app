import { Navigate, createBrowserRouter } from "react-router-dom"
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Surveys from "./views/Surveys";
import Signup from "./views/Signup";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import GuestLayout from "./components/Layouts/GuestLayout";
import SurveyView from "./views/SurveyView";
const router = createBrowserRouter([

    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to="/" />
            },
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: 'surveys',
                element: <Surveys />
            },
            {
                path: 'survey/create',
                element: <SurveyView />
            },
            {
                path: '/surveys/:id',
                element: <SurveyView />
            },

        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'signup',
                element: <Signup />
            }
        ]
    }

]);

export default router
