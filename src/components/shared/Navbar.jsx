import { useState } from 'react'
import { MdDirectionsCar } from 'react-icons/md'
import { FiMenu, FiX } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'

const Navbar = () => {
  const {user, logoutUser} = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try{
      await logoutUser();
      toast.success("Logged out successfully");
      navigate('/');
    } catch{
      toast.error("Logout failed");
    }
  };

  const navlinks = [
    {to: '/', label: 'Home'},
    {to: '/cars', label: 'Explore Cars'},
  ];

  const privateLinks = [
    {to: '/add-car', label: 'Add Car'},
    {to: '/my-bookings', label: 'My Bookings'},
    {to: '/my-added-cars', label: 'My Added Cars'},
  ]


  return (
    <nav className='sticky top-0 z-50
     bg-base-100 border-b border-base-300'>
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
                  className={({ isActive }) =>
                  `transition-colors rounded text-sm font-medium ${isActive ? 'text-primary' : 'text-base-content/70'}`
                }
                >
                  {links.label}
                </NavLink>
              ))
            }
          </div>

          {/* right side */}
          <div className='flex items-center gap-3'>
            {/* theme button */}
            <ThemeToggle />

            {user ? (
              <div className='dropdown dropdown-end'>
                <label tabIndex={0} role='button' className='cursor-pointer'>
                  <div className='avatar'>
                    <div className='w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1'>
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                      />
                    </div>
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className='dropdown-content menu bg-base-100 rounded-box z-[9999] w-56 p-2 shadow-xl border border-base-300 mt-2'
                >
                  <li className='px-3 py-2 text-sm font-medium text-base-content/60 border-b border-base-300 mb-1'>
                    {user.displayName || user.email}
                  </li>
                  {privateLinks.map((l) => (
                    <li key={l.to}>
                      <NavLink to={l.to}
                        className={({ isActive }) =>
                          `transition-colors rounded text-sm font-medium ${isActive ? 'text-primary' : 'text-base-content/70'}`}>
                        {l.label}
                      </NavLink>
                    </li>
                  ))}
                  <li className='border-t border-base-300 mt-1'>
                    <button
                      onClick={handleLogout}
                      className='text-sm text-error'
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="btn btn-primary btn-sm font-heading"
              >
                Login
              </Link>
            )}

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
            {user && 
              privateLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className={({isActive}) =>
                    `px-2 py-1.5 rounded text-sm font-medium ${
                      isActive ? "text-primary" : "text-base-content/70"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
