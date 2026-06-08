import { FaGasPump } from "react-icons/fa"
import { GiGearStickPattern } from "react-icons/gi"
import { MdAirlineSeatReclineNormal, MdLocationOn } from "react-icons/md"
import { Link } from "react-router-dom"


const CarCard = ({ car }) => {
  return (
    <div
        className="
            group relative rounded-2xl bg-base-200
            dark:bg-base-300 border border-white/8
            overflow-hidden flex flex-col h-full
            transition-all duration-400 ease-out
            shadow-[0_2px_12px_rgba(0,0,0,0.08)]
            hover:border-primary/30
            hover:-translate-y-2
            hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]
            dark:shadow-[0_2px_16px_rgba(0,0,0,0.35)]
            dark:hover:shadow-[0_20px_60px_rgba(255,77,0,0.18)]
            "
    >
        {/* image */}
        <div className={`relative overflow-hidden h-[210px]
            ${!car.availability ? 'opacity-60 grayscale' : ''}`}
        >
            <img
                src={car.image}
                alt={car.carModel}
                className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-107"
                onError={e => e.target.src='https://placehold.co/600x200/111118/FF4D00?text=DriveFleet'}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"/>

            {/* badges */}

            {/* brand badge */}
            <div className="absolute top-3 left-3 z-10">
                <span className="bg-black/60 font-heading
                        text-[9px] tracking-[2.5px] uppercase font-bold
                        px-2.5 py-1 rounded-md border border-white/20
                        backdrop-blur-md text-white/90">
                    {car.brand}
                </span>
            </div>

            {/* availability badge */}
            <div className="absolute top-3 right-3 z-10 ">
                <span className={`font-heading text-[9px] px-2.5 py-1 rounded-md
                            backdrop-blur-md border font-bold tracking-[2px] uppercase
                        ${car.availability
                            ? "bg-black/50 text-emerald-400 border-emerald-400/40"
                            : "bg-black/50 text-red-400 border-red-400/40"}`}>
                    {car.availability ? "Available" : "Unavailable"}
                </span>
            </div>

            {/* booking count */}
            <div className="absolute bottom-3 left-3 z-10">
                {car.bookingCount > 0 ? (
                    <span className="
                        flex items-center gap-1.5 bg-black/40
                        backdrop-blur-sm px-2.5 py-1 rounded-full
                        border border-white/10
                    ">
                        <span className="text-secondary text-[11px]">★</span>
                        <span className="text-white/70 font-medium text-[10px]">{car.bookingCount} bookings</span>
                    </span>
                ) : (
                    <span className="
                         font-heading bg-primary text-[9px] font-bold
                         tracking-[2px] uppercase px-2.5 py-1 rounded-full
                         text-white shadow-[0_2px_10px_rgba(255,77,0,0.5)]"
                    >
                        new
                    </span>
                    // <span className="badge badge-warning uppercase">
                    //     new
                    // </span>
                )}
            </div>
            
        </div>

        {/* body */}
        <div className="p-[18px] flex flex-col flex-1">
            <h3 className="font-heading font-extrabold text-3xl text-base-content mb-[6px] leading-snug truncate">
                {car.carModel}
            </h3>

            {/* meta info */}
            <div className="grid grid-cols-2 gap-x-2 gap-y-2 mb-4">

                {/* location */}
                <span className="flex items-center gap-1 text-[11px] text-base-content/60">
                    <MdLocationOn
                        className="text-lg text-primary flex-shrink-0"
                    />
                    {car.location}
                </span> 

                {/* seats */}
                <span className="flex items-center gap-1 text-[11px] text-base-content/60">
                    <MdAirlineSeatReclineNormal
                        className="text-lg text-primary flex-shrink-0"
                    />
                    {car.seatCapacity} seats
                </span>

                {/* transmission */}
                <span className="flex items-center gap-1 text-[11px] text-base-content/60">
                    <GiGearStickPattern
                        className="text-lg text-primary flex-shrink-0"
                    />
                    {car.transmission}
                </span>

                {/* fuel type */}
                <span className="flex items-center gap-1 text-[11px] text-base-content/60">
                    <FaGasPump
                        className="text-lg text-primary flex-shrink-0"
                    />
                    {car.fuelType}
                </span>
            </div>

            <div className="h-px bg-base-content/10 mb-4 mt-auto"/>

            <div className="flex items-center justify-between">
                <div>
                    <span className="font-mono font-bold text-3xl text-primary">
                        ${car.dailyRentalPrice}
                    </span>
                    <span className="text-sm text-gray-400 ml-1">
                        /day
                    </span>
                </div>

            <Link
                to={`/cars/${car._id}`}
                className="font-heading bg-primary uppercase
                    hover:bg-accent text-white font-heading
                    font-bold text-[10px] tracking-[2px]
                    px-5 py-2.5 rounded-full
                    transition-all duration-200
                    hover:shadow-[0_6px_24px_rgba(255,77,0,0.45)]
                    active:scale-95
                "
            >
                Details
            </Link>
            </div>
            

            
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[2px]
                bg-gradient-to-r from-primary via-accent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity
                duration-300
            "
        />
    </div>
  )
}

export default CarCard
