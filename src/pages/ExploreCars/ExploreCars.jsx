import { useEffect, useState } from "react"
import axiosSecure from "../../api/axiosInstance";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import CarCard from "../../components/car/CarCard";


const ExploreCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [search, setSearch] = useState("");
    const [carType, setCarType] = useState("");

    const fetchCars = async () => {
      setLoading(true);

      try{
        const res = await axiosSecure.get(
          `/cars?search=${search}&carType=${carType}`
        );

        setCars(res.data);
      } catch(error){
        console.log(error);
      } finally{
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchCars();
    }, [search, carType]);

    if(loading) {
      return <LoadingSpinner />
    }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">Explore Cars</h2>

      {/* search bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by car name..."
          className="input input-bordered flex-1"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="select select-bordered"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Luxury">Luxury</option>
          <option value="Electric">Electric</option>
          <option value="Convertible">Convertible</option>
          <option value="Truck">Truck</option>
        </select>

        <button
          className="btn btn-primary"
          onClick={() => setSearch(searchText)}
        >
          Search
        </button>
      </div>

      {/* car cards section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
            <CarCard key={car._id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default ExploreCars;
