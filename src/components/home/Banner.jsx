import { Link } from "react-router-dom"
import car1 from "../../assets/banner_img_1.avif"
import car2 from "../../assets/banner_img_2.avif"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


const Banner = () => {
    const images = [car1, car2];

  return (
    <section className="w-full">

        <Swiper 
            modules={[Autoplay, Navigation]}
            autoplay={{
                delay: 8000,
                disableOnInteraction: false,
            }}
            navigation
            loop={true}
            className="overflow-hidden"
        >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                        <div className="relative w-full h-[320px] md:h-[450px]">
                            <img
                                src={img}
                                alt={`Car ${index + 1}`}
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 flex flex-col items-center text-center px-4">
                                <h1 className="text-white text-3xl md:text-5xl font-bold pt-8">
                                    Find Your Perfect Rental Car
                                </h1>

                                <p className="text-white max-w-2xl mx-auto mt-2 mb-6">
                                Explore thousands of cars from trusted owners. Book instantly and
                                travel with comfort, safety, and style.
                                </p>

                                <Link
                                to="/cars"
                                className="btn btn-primary px-6 py-3 border-none text-white"
                                >
                                Explore Cars
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                    ))}
            </Swiper>
    </section>
  )
}

export default Banner
