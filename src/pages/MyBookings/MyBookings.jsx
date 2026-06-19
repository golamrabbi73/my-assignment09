import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axiosSecure from "../../api/axiosInstance";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import { FiCalendar, FiClipboard, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdLocationOn, MdPeople } from "react-icons/md";


const MyBookings = () => {
    const {user} = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if(!user?.email) return;

            setLoading(true);
            
            try{
                const res = await axiosSecure.get(
                    `/bookings?email=${user.email}`
                );
                setBookings(res.data || []);
            } catch(error){
                toast.error("Failed to load bookings");
            } finally{
                setLoading(false);
            }
        };
        
        fetchBookings();
    }, [user?.email, axiosSecure]);

    const handleCancel = async(id, carModel) => {
        const result = await Swal.fire({
            title: "Cancel this booking?",
            html: `Your booking for <b>${carModel}</b> will be cancelled.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#E8390E",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, cancel it",
            cancelButtonText: "Keep booking",
        });

        if(!result.isConfirmed) return;

        try{
            await axiosSecure.patch(`/bookings/${id}`, {
                status: "cancelled",
            });

            setBookings((prev) =>
                prev.map((b) =>
                    b._id === id ? { ...b, status: "cancelled"} : b
                )
            );

            toast.success("Booking cancelled successfully");
        } catch(error){
            toast.error("Cancellation failed");
        }
    };

    const statusBadge = (status) => {
        const map = {
            confirmed: "badge-success",
            cancelled: "badge-error",
            pending: "badge-warning",
        };
        return map[status] || "badge-ghost";
    };
    
    if(loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-base-200 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* header */}
            <div className="mb-8">
                <h1 className="font-heading text-3xl font-bold text-base-content">
                    My <span className="text-primary">Bookings</span>
                </h1>
                <p className="text-base-content/60 mt-1">
                    {bookings.length} booking{bookings.length !== 1 ? 's' : ''} total
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="bg-base-100 rounded-2xl p-16 text-center border border-base-300">
                    <div className="text-6xl mb-4"><FiClipboard size={20} /></div>
                    <h3 className="font-heading text-xl font-bold text-base-content mb-2">No bookings yet</h3>
                    <p className="text-base-content/60 mb-6">Explore our cars and make your first booking</p>
                    <Link to="/cars" className="btn btn-primary font-heading">Explore Cars</Link>
                </div>
                ) : (
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="bg-base-100 rounded-2xl border border-base-300 p-5 flex flex-col sm:flex-row gap-4"
                        >
                            {/* Car image */}
                            <div className="flex-shrink-0">
                                <img
                                    src={booking.carImage}
                                    alt={booking.carName}
                                    className="w-full sm:w-32 h-24 object-cover rounded-xl"
                                    onError={(e) => { e.target.src = 'https://placehold.co/200x120?text=Car'; }}
                                />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div>
                                        <h3 className="font-heading font-bold text-base-content text-lg">{booking.carName}</h3>
                                        <div className="flex flex-wrap gap-3 text-sm text-base-content/60 mt-1">
                                            <span className="flex items-center gap-1">
                                                <MdLocationOn className="text-primary" />{booking.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <FiCalendar className="text-primary" />
                                                {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                                                    year: 'numeric', month: 'short', day: 'numeric',
                                                })}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MdPeople className="text-primary" />
                                                Driver: {booking.driverNeeded === 'yes' ? 'Yes' : 'No'}
                                            </span>
                                        </div>
                                        {booking.specialNote && (
                                            <p className="text-sm text-base-content/50 mt-1 italic">"{booking.specialNote}"</p>
                                        )}
                                    </div>
                                    <span className={`badge ${statusBadge(booking.status)} capitalize`}>
                                    {booking.status}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <span className="font-heading text-2xl font-bold text-primary">${booking.dailyPrice}</span>
                                        <span className="text-xs text-base-content/50 ml-1">/day</span>
                                    </div>
                                    {booking.status === 'confirmed' && (
                                        <button
                                            onClick={() => handleCancel(booking._id, booking.carName)}
                                            className="btn btn-outline btn-error btn-sm gap-1 font-heading"
                                        >
                                            <FiX /> Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default MyBookings;
