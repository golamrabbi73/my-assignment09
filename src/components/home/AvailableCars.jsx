import { useEffect, useState } from "react"
import CarCard from "../car/CarCard";
import LoadingSpinner from "../shared/LoadingSpinner";


const AvailableCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/cars`)
        .then((res) => res.json())
        .then((data) =>  {
            setCars(data.slice(0, 6));
            setLoading(false);
        })
        .catch(() => {
            setError("Failed to load cars");
            setLoading(false);
        });
    }, []);

    if(loading) return <LoadingSpinner />

    if(error) return <p className="text-center text-red-500 py-10">{error}</p>

  return (
    <section className="py-15 px-4 md:px-10">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-10">
            Available <span className="text-primary">Cars</span>
        </h2>
        {/* cards section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-3">
            {cars.map((car) => (
                <CarCard key={car._id} car={car} />
            ))}
        </div>
    </section>
  )
}

export default AvailableCars
