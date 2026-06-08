import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/Navbar"

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 page-enter">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
