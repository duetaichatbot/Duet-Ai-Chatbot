import { createBrowserRouter } from "react-router-dom";
import MainHome from "../pages/MainHome";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Feedbacks from "../pages/Feedbacks";



const  publicRoutes = createBrowserRouter([
    {
        path: "/",
        element: <MainHome />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/feedbacks",
        element: <Feedbacks />
    }

])


export default publicRoutes;