import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/shared/Navbar"
import Footer from "../components/shared/Footer"
import ScrollToTop from "../components/scroll/ScrollToTop"
import { AnimatePresence, motion } from "framer-motion";

const pageVarians = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
};

const MainLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      
      {/* page animation */}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVarians}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex-1 page-enter"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default MainLayout
