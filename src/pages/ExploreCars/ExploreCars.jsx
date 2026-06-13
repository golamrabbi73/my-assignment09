import { useEffect, useState } from "react"
import axiosSecure from "../../api/axiosInstance";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import CarCard from "../../components/car/CarCard";


const ExploreCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosSecure
            .get("/cars")
            .then((res) => {
                setCars(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    if(loading) {
        <LoadingSpinner />
    }
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Explore Cars</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
            <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default ExploreCars;
