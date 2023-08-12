import { createBrowserRouter } from "react-router-dom";
import MainHome from "../pages/MainHome";
import Signup from "../pages/Signup";
import Login from "../pages/Login";



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
    }

])


export default publicRoutes;