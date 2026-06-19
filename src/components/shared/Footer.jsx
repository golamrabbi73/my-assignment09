import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from 'react-icons/fa6'
import { MdDirectionsCar, MdEmail, MdLocationOn, MdPhone } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-slate-900 text-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                {/* logo */}
                <div>
                    <div className='flex items-center gap-2 font-heading font-bold text-xl mb-4'>
                        <MdDirectionsCar className='text-primary text-2xl'/>
                        <span>
                            Drive
                            <span className='text-primary'>Fleet</span>
                        </span>
                    </div>
                    <p className='text-white/60 text-sm leading-relaxed'>
                        DriveFleet makes car rental simple, secure, and convenient. Explore a wide range of vehicles and book the perfect ride for every journey.
                    </p>
                    <div className='flex gap-3 mt-5'>
                        {[
                            {icon: <FaXTwitter />, href: "https://x.com"},
                            {icon: <FaInstagram />, href: "https://instagram.com"},
                            {icon: <FaFacebook />, href: "https://facebook.com"},
                            {icon: <FaLinkedin />, href: "https://linkedin.com"},
                        ].map((s, i) => (
                            <a
                                href={s.href}
                                key={i}
                                className='w-9 h-9 rounded-lg bg-white/10 hover:bg-primary flex items-center justify-center transition-colors text-sm'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* quick links */}
                <div>
                    <h4 className='text-white font-heading font-semibold mb-4'>
                        Quick Links
                    </h4>

                    <ul className='space-y-2'>
                        <li>
                            <Link
                                to={"/"} className='hover:text-primary transition'
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/cars"} className='hover:text-primary transition'
                            >
                                Explore Cars
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/add-car"} className='hover:text-primary transition'
                            >
                                Add Car
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/my-added-cars"} className='hover:text-primary transition'
                            >
                                My Added Car
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/my-bookings"} className='hover:text-primary transition'
                            >
                                My Bookings
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* car types */}
                <div>
                    <h4 className='font-heading font-semibold text-white mb-4'>
                        Car Categories
                    </h4>
                    <ul className='space-y-2'>
                        {[
                            'SUV', 'Sedan', 'Hatchback', 'Luxury', 'Electric', 'Convertible'
                        ].map((t) => (
                            <li key={t}>
                                <Link
                                    to={`/cars?type=${t}`}
                                    className='text-white/60 hover:text-primary text-sm transition-colors'
                                >
                                    {t}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* contact */}
                <div>
                    <h3 className='text-white font-heading font-semibold mb-4'>
                        Contact Us
                    </h3>

                    <div className='space-y-3'>
                        <div className='flex items-start gap-3 text-white/60 text-sm'>
                            <MdLocationOn className='text-lg flex-shrink-0 text-primary mt-0.5' />
                            <span>
                                Sirajganj, Bangladesh
                            </span>
                        </div>

                        <div className='flex items-start gap-3 text-white/60 text-sm'>
                            <MdPhone className='text-lg flex-shrink-0 text-primary' />
                            <span>
                                +8801608177973
                            </span>
                        </div>

                        <div className='flex items-start gap-3 text-white/60 text-sm'>
                            <MdEmail className='text-lg flex-shrink-0 text-primary' />
                            <span>
                                support@drivefleet.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3'>
                <p className='text-white/40 text-sm'>
                    © {new Date().getFullYear()} DriveFleet. All rights reserved.
                </p>
                <div className='flex gap-4 text-white/40 text-sm'>
                    <span className='hover:text-white/70 cursor-pointer transition-colors'>
                        Privacy Policy
                    </span>
                    <span className='hover:text-white/70 cursor-pointer transition-colors'>
                        Terms of Service
                    </span>
                </div>
            </div>

            <div className='text-center mt-3'>
                <p className='text-white/30 text-xs'>
                    DriveFleet — Your trusted partner for secure and affordable car rentals.
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer