import { createBrowserRouter } from "react-router-dom";
import MainHome from "../pages/MainHome";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Form from "../pages/Form";



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
        path: "/form",
        element: <Form />
    }

])


export default publicRoutes;