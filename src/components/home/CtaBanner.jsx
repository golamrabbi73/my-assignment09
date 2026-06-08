import { FiArrowRight } from "react-icons/fi"
import { Link } from "react-router-dom"


const CtaBanner = () => {
  return (
    <section className="py-16" style={{background: 'linear-gradient(135deg, #E8390E, #c22d08)'}}>
        <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Drive Your Dream Car?
            </h2>

            <p className="text-white/80 text-lg mb-8">
                Browse our collection and book your perfect ride today.
            </p>

            <Link 
                to={"/cars"}
                className="btn btn-lg bg-[#c22d08]  text-white border border-white/30
                hover:bg-[#a82606] gap-2
                shadow-none
                "
            >
                Explore Cars <FiArrowRight />
            </Link>
        </div>
    </section>
  )
}

export default CtaBanner
