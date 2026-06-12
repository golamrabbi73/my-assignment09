import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import axiosSecure from "../../api/axiosInstance";
import LoadingSpinner from "../../components/shared/LoadingSpinner";


const MyAddedCars = () => {
    const {user} = useAuth();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!user?.email) return;

        axiosSecure
            .get(`/my-cars?email=${user.email}`)
            .then((res) => {
                setCars(res.data);
            })
            .catch(console.log);
    }, [user?.email]);

    if(loading) {
        <LoadingSpinner />
    }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8">
        My Added Cars
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Car</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Bookings</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                {cars.map((car) => (
                    <tr key={car._id}>
                        <td>
                            <img
                                src={car.image}
                                alt=""
                                className="w-20 h-14 object-cover rounded"
                            />
                        </td>

                        <td>{car.carModel}</td>
                        <td>{car.carType}</td>
                        <td>{car.dailyRentalPrice}</td>
                        <td>{car.bookingCount}</td>
                        <td>
                            {car.availability ? (
                                <span className="badge badge-success">
                                    Available
                                </span>
                            ) : (
                                <span className="badge badge-error">
                                    Unavailable
                                </span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAddedCars;
