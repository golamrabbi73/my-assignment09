import { useState } from "react";
import axiosSecure from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth"
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";


const BookingModal = ({car, onClose, onSuccess}) => {
    const {user} = useAuth();

    const [driverNeeded, setDriverNeeded] = useState("no");
    const [specialNote, setSpecialNote] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBook = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const booking = {
                carId: car._id,
                carName: car.carModel,
                carImage: car.image,
                carType: car.carType,
                dailyPrice: car.dailyRentalPrice,
                location: car.location,

                userEmail: user.email,
                userName: user.displayName,

                driverNeeded,
                specialNote,

                bookingDate: new Date().toISOString(),
                status: "confirmed",
            };

            const res = await axiosSecure.post("/bookings", booking);
            
            if(res.data.insertedId){
                toast.success("Car booked successfuly!");
                onSuccess?.();
                onClose();
            }
        }catch(err){
            console.log(err);
            toast.error(
                err.response?.data?.message ||
                    "Booking failed. Please try again."
            );
        } finally{
            setLoading(false);
        }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-md relative">

        {/* header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300">
            <div>
                <h3 className="font-heading font-bold text-lg text-base-content">
                    Book This Car
                </h3>

                <p className="text-sm text-base-content/60 mt-0.5">
                    {car.carModel}
                </p>
            </div>

            <button
                onClick={onClose}
                className="btn btn-ghost btn-sm btn-circle"
            >
                <FiX />
            </button>
        </div>

        {/* car info */}
        <div className="p-6 border-b border-base-300 flex items-center gap-4">
            <img
                src={car.image}
                alt={car.carModel}
                className="w-20 h-14 object-cover rounded-lg"
                onError={(e) => {
                    e.target.src="https://placehold.co/200x140?text=Car";
                }}
            />

            <div>
                <p className="font-heading font-semibold text-base-content">
                    {car.carModel}
                </p>

                <p className="text-sm text-base-content/60">
                    {car.carType} • {car.location}
                </p>

                <p className="text-primary font-bold font-heading mt-1">
                    ${car.dailyRentalPrice}
                    <span className="text-xs text-base-content/50 font-normal">
                        /day
                    </span>
                </p>
            </div>
        </div>

        {/* form */}
        <form
            onSubmit={handleBook}
            className="p-6 space-y-4"
        >
            {/* user name */}
            <div>
                <label className="label">
                    <span className="label-text font-medium">
                        Your Name
                    </span>
                </label>

                <input
                    type="text"
                    value={user?.displayName || ""}
                    className="input input-bordered w-full input-sm"
                    disabled
                />
            </div>

            {/* user email */}
            <div>
                <label className="label">
                    <span className="label-text font-medium">
                        Your Email
                    </span>
                </label>

                <input
                    type="email"
                    value={user?.email || ""}
                    className="input input-bordered w-full input-sm"
                    disabled
                />
            </div>

            {/* driver needed */}
            <div>
                <label className="label">
                    <span className="label-text font-medium">
                        Driver Needed?
                    </span>
                </label>

                <select
                    value={driverNeeded}
                    className="select select-bordered w-full select-sm"
                    onChange={(e) =>
                        setDriverNeeded(e.target.value)
                    }
                >
                    <option value="no">
                        No - I'll drive myself
                    </option>

                    <option value="yes">
                        Yes - Include a drive
                    </option>
                </select>
            </div>

            {/* special note */}
            <div>
                <label className="label">
                    <span className="label-text font-medium">
                        Special Note (Optional)
                    </span>
                </label>

                <textarea
                    rows={3}
                    placeholder="Any special requirements or requests..."
                    value={specialNote}
                    className="textarea textarea-bordered w-full text-sm"
                    onChange={(e) =>
                        setSpecialNote(e.target.value)
                    }
                />
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="btn btn-ghost flex-1"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary flex-1 font-heading"
                >
                    {loading ? (
                        <span className="loading laoding-spinner loading-sm"/>
                    ) : (
                        "Confirm Booking"
                    )}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
