import { FiDollarSign } from "react-icons/fi"
import { MdDirectionsCar, MdSupportAgent } from "react-icons/md"


const WhyChooseUs = () => {
    const features = [
        {
            icon: <FiDollarSign className="text-3xl texat-primary" />,
            title: "Affordable Pricing",
            desc: "Enjoy competitive rental rates with no hidden charges, ensuring the best value for your money.",
        },
        {
            icon: <MdDirectionsCar className="text-3xl texat-primary" />,
            title: "Wide Car Collection",
            desc: "Choose from a variety of vehicles including SUVs, Sedans, Luxury Cars, and Family Vans.",
        },
        {
            icon: <MdSupportAgent className="text-3xl texat-primary" />,
            title: "24/7 Customer Support",
            desc: "Our dedicated support team is available around the clock to assist you whenever needed.",
        },
    ];

  return (
    <section className="py-20 bg-base-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* section header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold">
                    Why Choose <span className="text-primary">DriveFleet?</span>
                </h2>

                <p className="text-base-content/70 mt-4 max-w-2xl mx-auto">
                    We provide a seamless car rental experience with affordable prices, a wide range of vehicles, and reliable customer support.
                </p>
            </div>

            {/* feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature) => (
                    <div
                        key={feature.title}
                        className="group relative rounded-2xl bg-base-200
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
                        <div className="card-body items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-primary/10
                                    flex items-center justify-center mb-3
                                "
                            >
                                {feature.icon}
                            </div>

                            <h3 className="text-xl font-bold">
                                {feature.title}
                            </h3>

                            <p className="text-base-content/70">
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default WhyChooseUs
