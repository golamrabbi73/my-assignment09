import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home/Home";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login />},
      { path: "/register", element: <Register />},
    ],
  },
]);


function App() {

  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </>
  )
}

export default App
