import { useState } from 'react'
import { MdDirectionsCar } from 'react-icons/md'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const navlinks = [
    {to: '/', label: 'Home'},
    {to: '/cars', label: 'Explore Cars'},
  ];

  return (
    <nav className='bg-base-100 border-b border-base-300'>
      {/* nav container */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

        {/* desktop nav */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
            <Link to={"/"} className="flex items-center gap-2 font-heading font-bold text-xl text-primary">
                <MdDirectionsCar className="text-2xl" />
                <span>Drive<span className="text-base-content">Fleet</span></span>
            </Link>

          {/* desktop menu */}
          <div className='hidden md:flex items-center gap-6'>
            {
              navlinks.map((links) =>(
                <NavLink
                  key={links.to}
                  to={links.to}
                  className="font-medium text-sm transition-colors"
                >
                  {links.label}
                </NavLink>
              ))
            }
          </div>

          {/* right side */}
          <div className='flex items-center gap-3'>
            <ThemeToggle />
            <Link to={"/login"} className="btn btn-primary btn-sm font-heading">
              Login
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden btn btn-ghost btn-sm btn-circle"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
        

        {/* mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-base-300 pt-3 flex flex-col gap-2">
            {navlinks.map((links) => (
              <NavLink
                key={links.to}
                to={links.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded text-sm font-medium ${isActive ? 'text-primary' : 'text-base-content/70'}`
                }
              >
                {links.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
