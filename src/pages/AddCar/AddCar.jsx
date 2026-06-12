import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import { useState } from "react";
import toast from "react-hot-toast";
import axiosSecure from "../../api/axiosInstance";
import { FaArrowLeft } from "react-icons/fa";

const CAR_TYPES = ['SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Convertible', 'Truck'];

const AddCar = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [form, setForm] = useState({
        carModel: "",
        carType: "Sedan",
        dailyRentalPrice: "",
        availability: true,
        seatCapacity: "",
        location: "",
        description: "",
        image: "",
    });

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try{
            const carData = {
                carModel: form.carModel,
                carType: form.carType,
                dailyRentalPrice: Number(form.dailyRentalPrice),
                availability: form.availability,
                seatCapacity: Number(form.seatCapacity),
                location: form.location,
                description: form.description,
                image: form.image,
                bookingCount: 0,
                ownerName: user?.displayName,
                ownerEmail: user?.email,
                createdAt: new Date(),
            };

            const {data} = await axiosSecure.post(
                "/cars",
                carData
            );

            if(data.insertedId){
                toast.success("Car listed successfully");

                navigate("/my-added-cars");
            }
        }catch(error){
             console.log(error);
            toast.error("Failed to add car");
        }finally{
            setLoading (false);
        }
    };
  return (
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-2xl mx-auto px-4">
        {/* header */}
        <div className="mb-8">
            <button
                onClick={() => navigate(-1)}
                className="btn btn-ghost mb-4"
            >
                <FaArrowLeft />
                Back
            </button>
            <h1 className="font-heading text-3xl font-bold text-base-content">
                List Your <span className="text-primary">Car</span>
            </h1>
            <p className="text-base-content/60 mt-1">
                Fill in the details to list your car for rent
            </p>
        </div>

        <form
            onSubmit={handleSubmit}
            className="bg-base-100 rounded-2xl p-8 border border-base-300 space-y-5"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* car name */}
                <div className="form-control sm:col-span-2">
                    <label className="label">
                        <span className="label-text font-medium">Car Name *</span>
                    </label>
                    <input
                        type="text"
                        name="carModel"
                        required
                        placeholder="e.g. Toyota RAV4 2023"
                        className="input input-bordered"
                        value={form.carModel}
                        onChange={handleChange}
                    />
                </div>

                {/* daily price */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Daily Rental Price *</span>
                    </label>
                    <input
                        type="number"
                        name="dailyRentalPrice"
                        required
                        min="1"
                        placeholder="e.g. 65"
                        className="input input-bordered"
                        value={form.dailyRentalPrice}
                        onChange={handleChange}
                    />
                </div>

                {/* car type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Car Type *</span>
                    </label>
                    <select
                        name="carType"
                        className="select select-bordered"
                        value={form.carType}
                        onChange={handleChange}
                    >
                        {CAR_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                </div>

                {/* seats */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Seat Capacity *</span>
                    </label>
                    <input
                        type="number"
                        name="seatCapacity"
                        required
                        min="1"
                        max="20"
                        placeholder="e.g. 5"
                        className="input input-bordered"
                        value={form.seatCapacity}
                        onChange={handleChange}
                    />
                </div>

                {/* location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Location *</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        required
                        placeholder="e.g. Dhaka"
                        className="input input-bordered"
                        value={form.location}
                        onChange={handleChange}
                    />
                </div>

                {/* image url */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium">Image URL *</span>
                    </label>
                    <input
                        type="url"
                        name="image"
                        required
                        placeholder="https://imgbb.com/your-car-image.jpg"
                        className="input input-bordered"
                        value={form.image}
                        onChange={handleChange}
                    />
                    {form.image && (
                        <div className="mt-2 rounded-lg overflow-hidden h-40">
                            <img
                                src={form.image}
                                alt="Preview"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none';}}
                            />
                        </div>
                    )}
                </div>

                {/* description */}
                <div className="form-control sm:col-span-2">
                    <label className="label">
                        <span className="label-text font-medium">Description *</span>
                    </label>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        placeholder="Describe your car — features, condition, any special notes..."
                        className="textarea textarea-bordered text-sm"
                        value={form.description}
                        onChange={handleChange}
                    />
                </div>

                {/* availability */}
                <div className="form-control sm:col-span-2">
                    <label className="label">
                        <span className="label-text font-medium">Availability *</span>
                        <input
                            type="checkbox"
                            name="availability"
                            className="toggle toggle-primary"
                            checked={form.availability}
                            onChange={handleChange}
                        />
                        <span className="label-text font-medium">
                            Mark as Available
                            <span className="text-base-content/50 ml-1 text-sm">
                                (renters can book immediately)
                            </span>
                        </span>
                    </label>
                </div>
            </div>

            <div className="pt-2">
                <button
                    type="submit"
                    className="btn btn-primary w-full font-heading btn-lg"
                    disabled={loading}
                >
                    {loading ? <span className="loading loading-spinner"/> : "List My Car"}
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
