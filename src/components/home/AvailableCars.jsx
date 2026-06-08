import { useEffect, useState } from "react"
import CarCard from "../car/CarCard";


const AvailableCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/cars")
        .then((res) => res.json())
        .then((data) => setCars(data.slice(1, 7)))
        .catch((err) => console.log(err));
    }, []);

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
