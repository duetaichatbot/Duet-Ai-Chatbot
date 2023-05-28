import { createBrowserRouter } from "react-router-dom";
import MainHome from "../pages/MainHome";



// const  publicRoutes = [
//     {
//         path: "/",
//         element: <MainHome />
//     }

// ]

const  publicRoutes = createBrowserRouter([
    {
        path: "/",
        element: <MainHome />
    }

])


export default publicRoutes;