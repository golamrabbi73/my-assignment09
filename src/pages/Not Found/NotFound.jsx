import React from 'react'
import { FiHome } from 'react-icons/fi'
import { MdDirectionsCar } from 'react-icons/md'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-base-100 px-4'>
        <div className='text-center max-w-lg'>
            {/* icon */}
            <div className='flex justify-center mb-6'>
                <div className='w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center'>
                    <MdDirectionsCar className='text-5xl text-primary'/>
                </div>
            </div>
            {/* 404 */}
            <h1 className='font-heading text-7xl md:text-8xl font-black text-primary mb-2'>
                404
            </h1>
            <h2 className='font-heading text-2xl md:text-3xl font-bold text-base-content mb-3'>
                Looks Like You Took a Wrong Turn
            </h2>
            <p className='text-base-content/60 mb-8 leading-relaxed'>
            The page you're looking for has driven off somewhere. Let's get you back on the road.
            </p>

            <Link
                to="/"
                className='btn btn-primary font-heading gap-2 px-8'
            >
                <FiHome />
                Back to Home
            </Link>
        </div>
    </div>
  )
};

export default NotFound;