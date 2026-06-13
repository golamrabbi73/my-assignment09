import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home/Home"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import PrivateRoute from "./PrivateRoute"
import AddCar from "../pages/AddCar/AddCar"
import MyAddedCars from "../pages/MyAddedCars/MyAddedCars"
import ExploreCars from "../pages/ExploreCars/ExploreCars"
import CarDetails from "../components/car/CarDetails"


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
        { index: true, element: <Home /> },
        { path: "/login", element: <Login />},
        { path: "/register", element: <Register />},
        ],
    },

    {
        path: "/cars",
        element: <ExploreCars />
    },

    {
        path: "/cars/:id",
        element: <CarDetails />,
        loader: ({params}) =>
            fetch(`${import.meta.env.VITE_API_URL}/cars/${params.id}`),
    },

    {
        path: "/add-car",
        element: (
            <PrivateRoute >
                <AddCar />
            </PrivateRoute>
        )
    },

    {
        path: "/my-added-cars",
        element: (
            <PrivateRoute >
                <MyAddedCars />
            </PrivateRoute>
        )
    },
]);

export default router;
