import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth"
import axiosSecure from "../../api/axiosInstance";
import LoadingSpinner from "../../components/shared/LoadingSpinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { MdDirectionsCar, MdLocationOn } from "react-icons/md";
import Swal from "sweetalert2";

const CAR_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Convertible', 'Truck'];

const MyAddedCars = () => {
    const {user} = useAuth();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editCar, setEditCar] = useState(null);
    const [saving, setSaving] = useState(false);

    const fetchCars = () => {
        if(!user?.email) return;

        setLoading(true);

        axiosSecure
            .get(`/my-cars?email=${user.email}`)
            .then((res) => {
                setCars(res.data);
            })
            .catch(() => {
                toast.error("Failed to laod cars")
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchCars();
    }, [user?.email]);

    const handleDelete = async(id, name) => {
        const result = await Swal.fire({
            title: "Delete Car?",
            text: `${name} will be removed permanently.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Delete",
        });

        if(result.isConfirmed){
            try{
                await axiosSecure.delete(`/cars/${id}`);

                setCars((prev) =>
                    prev.filter((car) => car._id !== id)
                );

                toast.success("Car deleted successfully");
            }catch(error){
                toast.error("Delete failed")
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        setSaving(true);

        try{
            await axiosSecure.put(
                `/cars/${editCar._id}`,
                editCar
            );

            toast.success("Car updated successfully");

            setEditCar(null);
            fetchCars();
        } catch(error){
            toast.error("Update failed");
        } finally{
            setSaving(false);
        }
    };

    if(loading) {
        return <LoadingSpinner />
    }

  return (
    <div className="min-h-screen bg-base-200 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-base-content">
                        My <span className="text-primary">Cars</span>
                    </h1>
                    <p className="text-base-content/60 mt-1">
                        {cars.length} listing{cars.length !== 1 ? 's' : ''}
                    </p>
                </div>
                <Link
                    to={"/add-car"}
                    className="btn btn-primary font-heading gap-2"
                >
                    <FiPlus /> Add Car
                </Link>
            </div>

            {cars.length === 0 ? (
                <div className="bg-base-100 rounded-2xl p-16 text-center border border-base-300">
                    <div className="text-6xl mb-4">
                        <MdDirectionsCar className="text-2xl" />
                    </div>
                    <h3 className="font-heading text-xl font-bold text-base-content mb-2">No cars listed yet</h3>
                    <p className="text-base-content/60 mb-6">Start by adding your first car listing</p>
                    <Link to="/add-car" className="btn btn-primary font-heading">List a Car</Link>
                </div>
            ) : (
                <div className="bg-base-100 rounded-2xl border border-base-300 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-base-200">
                                <tr>
                                    <th className="font-heading">Car</th>
                                    <th className="font-heading">Type</th>
                                    <th className="font-heading">Price/Day</th>
                                    <th className="font-heading">Location</th>
                                    <th className="font-heading">Status</th>
                                    <th className="font-heading">Bookings</th>
                                    <th className="font-heading">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map((car) => (
                                    <tr key={car._id} className="hover: bg-base-200/50">
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-12 h-10 rounded-lg">
                                                        <img
                                                            src={car.image}
                                                            alt={car.carModel}
                                                            className="object-cover"
                                                            onError={(e) => { e.target.src = 'https://placehold.co/80x60?text=Car'; }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-heading font-semibold text-sm text-base-content line-clamp-1">{car.carModel}</div>
                                                    <div className="text-xs text-base-content/50">{car.seatCapacity} seats</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="badge badge-ghost text-xs">{car.carType}</span></td>
                                        <td className="font-heading font-bold text-primary">{car.dailyRentalPrice}</td>
                                        <td>
                                            <span className="flex items-center gap-1 text-sm text-base-content/70">
                                                <MdLocationOn className="text-primary"/> {car.location}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge badge-sm ${car.availability ? "badge-success" : "badge-error"}`}>
                                                {car.availability ? "Available" : "Unavailable"}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="badge badge-outline badge-sm">{car.bookingCount || 0}</span>
                                        </td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditCar({ ...car})}
                                                    className="btn btn-ghost btn-xs gap-1 text-info"
                                                >
                                                    <FiEdit2 /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(car._id, car.carModel)}
                                                    className="btn btn-ghost btn-xs gap-1 text-error"
                                                >
                                                    <FiTrash2 /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
        
        {/* update modal */}
        {editCar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-base-300 flex items-center justify-between">
                        <h3 className="font-heading font-bold text-lg">Update Car</h3>
                        <button
                            onClick={() => setEditCar(null)}
                            className="btn btn-ghost btn-sm btn-circle"
                        >
                            ✕
                        </button>
                    </div>
                    <form
                        onSubmit={handleUpdate}
                        className="p-6 spay-4"
                    >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Car Name</span>
                            </label>
                            <input
                                className="input input-bordered input-sm"
                                value={editCar.carModel}
                                onChange={(e) => setEditCar((p) => ({ ...p, carModel: e.target.value}))}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            {/* daily price */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Daily Rental Price</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    className="input input-bordered input-sm"
                                    value={editCar.dailyRentalPrice}
                                    onChange={(e) => setEditCar((p) => ({ ...p, dailyRentalPrice: e.target.value}))}
                                />
                            </div>

                            {/* car type */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Car Type</span>
                                </label>
                                <select
                                    className="select select-bordered select-sm"
                                    value={editCar.carType}
                                    onChange={(e) => setEditCar((p) => ({ ...p, carType: e.target.value}))}
                                >
                                    {CAR_TYPES.map((t) => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>
                        {/* image url */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Image URL</span>
                            </label>
                            <input
                                type="url"
                                className="input input-bordered input-sm"
                                value={editCar.image}
                                onChange={(e) => setEditCar((p) => ({ ...p, image: e.target.value}))}
                            />
                        </div>

                        {/* location */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Location</span>
                            </label>
                            <input
                                className="input input-bordered input-sm"
                                value={editCar.location}
                                onChange={(e) => setEditCar((p) => ({ ...p, location: e.target.value}))}
                            />
                        </div>

                        {/* description */}
                        <div className="form-control sm:col-span-2">
                            <label className="label">
                                <span className="label-text font-medium">Description</span>
                            </label>
                            <textarea
                                rows={3}
                                className="textarea textarea-bordered text-sm"
                                value={editCar.description}
                                onChange={(e) => setEditCar((p) => ({ ...p, description: e.target.value}))}
                            />
                        </div>

                        {/* availability */}
                        <div className="form-control">
                            <label className="cursor-pointer flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="toggle toggle-primary toggle-sm"
                                    checked={editCar.availability}
                                    onChange={(e) => setEditCar((p) => ({ ...p, availability: e.target.checked}))}
                                />
                                <span className="label-text font-medium">Available for booking</span>
                            </label>
                        </div>
                        
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setEditCar(null)}
                                className="btn btn-ghost flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary flex-1 font-heading"
                                disabled={saving}
                            >
                                {saving ? <span className="loading loading-spinner loading-sm"/> : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

export default MyAddedCars;
