

const CustomerReviews = () => {
  return (
    <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-10">
                Customer Reviews
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="group relative rounded-2xl bg-base-200
                            dark:bg-base-300 border border-white/8
                            overflow-hidden flex flex-col h-full
                            transition-all duration-400 ease-out
                            shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                            hover:border-primary/30
                            hover:-translate-y-2
                            hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                            dark:shadow-[0_2px_16px_rgba(0,0,0,0.35)]
                            dark:hover:shadow-[0_20px_60px_rgba(255,77,0,0.18)]">
                    <div className="card-body">
                        <p>
                            "Excellent service and well-maintained cars. Highly recommended!"
                        </p>

                        <h4 className="font-bold mt-3">
                            - Sarah Ahmed
                        </h4>
                    </div>
                </div>

                <div className="group relative rounded-2xl bg-base-200
                            dark:bg-base-300 border border-white/8
                            overflow-hidden flex flex-col h-full
                            transition-all duration-400 ease-out
                            shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                            hover:border-primary/30
                            hover:-translate-y-2
                            hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                            dark:shadow-[0_2px_16px_rgba(0,0,0,0.35)]
                            dark:hover:shadow-[0_20px_60px_rgba(255,77,0,0.18)]">
                    <div className="card-body">
                        <p>
                            "Booking process was simple and the car was in perfect condition."
                        </p>

                        <h4 className="font-bold mt-3">
                            - Hasan Mahmud
                        </h4>
                    </div>
                </div>

                <div className="group relative rounded-2xl bg-base-200
                            dark:bg-base-300 border border-white/8
                            overflow-hidden flex flex-col h-full
                            transition-all duration-400 ease-out
                            shadow-[0_2px_12px_rgba(0,0,0,0.08)]
                            hover:border-primary/30
                            hover:-translate-y-2
                            hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                            dark:shadow-[0_2px_16px_rgba(0,0,0,0.35)]
                            dark:hover:shadow-[0_20px_60px_rgba(255,77,0,0.18)]">
                    <div className="card-body">
                        <p>
                            "Affordable pricing and amazing customer support."
                        </p>

                        <h4 className="font-bold mt-3">
                            — Nusrat Jahan
                        </h4>
                    </div>
                </div>

            </div>
        </div>
    </section>
  )
}

export default CustomerReviews
