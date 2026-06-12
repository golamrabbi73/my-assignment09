import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

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
