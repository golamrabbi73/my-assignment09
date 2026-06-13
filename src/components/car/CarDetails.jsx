import { useLoaderData, useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { MdAttachMoney, MdDirectionsCar, MdLocationOn, MdPeople } from "react-icons/md";
import { FiCalendar } from "react-icons/fi";
import BookingModal from "./BookingModal";


const CarDetails = () => {
    const car = useLoaderData();
    console.log("CAR DATA:", car);
    const navigate = useNavigate();
    const {user} = useAuth();

    const [showModal, setShowModal] = useState(false);

    const handleBooking = () => {
        if(!user){
            toast.error("Please login first");
            navigate("/login");
            return;
        }
        setShowModal(true);
    };

  return (
    <section className="py-12 bg-base-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
            <button
                onClick={() => navigate(-1)}
                className="btn btn-ghost mb-4"
            >
                <FaArrowLeft />
                Back
            </button>

            <div className="grid lg:grid-cols-2 gap-10">

                {/* left side */}
                <div>
                    <img
                        src={car.image}
                        alt={car.carModel}
                        className="w-full h-[450px] object-cover rounded-2xl shadow-lg"
                    />
                </div>

                {/* right side */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="badge badge-primary badge-lg">
                            {car.carType}
                        </span>

                        <span
                            className={`badge badge-lg ${
                                car.availability
                                    ? "badge-success"
                                    : "badge-error"
                            }`}
                        >
                            {car.availability
                                ? "Available"
                                : "Unavailable"
                            }
                        </span>
                    </div>

                    <h1 className="text-4xl font-bold mb-4">
                        {car.carModel}
                    </h1>

                    <p className="text-base-content/70 mb-6 leading-relaxed">
                        {car.description}
                    </p>

                    {/* details */}
                    <div className="grid grid-cols-2 gap-4 mb-8">

                        {/* seat */}
                        <div className="bg-base-200 p-4 rounded-xl">
                            <div className="flex items-center gap-2">
                                <MdPeople />
                                <span>Seat Capacity</span>
                            </div>

                            <h3 className="font-bold mt-2">
                                {car.seatCapacity}
                            </h3>
                        </div>

                        {/* location */}
                        <div className="bg-base-200 p-4 rounded-xl">
                            <div className="flex items-center gap-2">
                                <MdLocationOn />
                                <span>Location</span>
                            </div>

                            <h3 className="font-bold mt-2">
                                {car.location}
                            </h3>
                        </div>

                        {/* car type */}
                        <div className="bg-base-200 p-4 rounded-xl">
                            <div className="flex items-center gap-2">
                                <MdDirectionsCar />
                                <span>Car Type</span>
                            </div>

                            <h3 className="font-bold mt-2">
                                {car.carType}
                            </h3>
                        </div>

                        {/* rental price */}
                        <div className="bg-base-200 p-4 rounded-xl">
                            <div className="flex items-center gap-2">
                                <MdAttachMoney />
                                <span>Daily Rent</span>
                            </div>

                            <h3 className="font-bold mt-2">
                                ${car.dailyRentalPrice}
                            </h3>
                        </div>
                    </div>

                    {/* price section */}
                    <div className="bg-base-200 rounded-2xl p-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">
                                 Daily Rental Price
                            </p>

                            <h2 className="text-4xl font-bold text-primary">
                                ${car.dailyRentalPrice}
                                <span className="text-lg font-normal">
                                    /day
                                </span>
                            </h2>
                        </div>

                        <button
                            onClick={handleBooking}
                            disabled={!car.availability}
                            className="btn btn-primary btn-lg"
                        >
                            <FiCalendar />
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* booking modal */}
                {showModal && (
                    <BookingModal 
                        car={car}
                        onClose={() => setShowModal(false)}
                        onSuccess={() => navigate("/my-bookings")}
                    />
                )}
        </div>
    </section>
  )
}

export default CarDetails;
