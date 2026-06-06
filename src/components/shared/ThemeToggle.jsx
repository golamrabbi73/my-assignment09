import { FiMoon, FiSun } from 'react-icons/fi';
import useTheme from '../../hooks/useTheme';


const ThemeToggle = () => {
    const { theme, toggleTheme} = useTheme();
    

  return (
    <button
        onClick={toggleTheme}
        className='btn btn-ghost btn-sm btn-circle'
    >
        {theme === 'light' ? (
            <FiMoon className='text-lg' />
        ) : (
            <FiSun className='text-lg' />
        )}
    </button>
  )
}

export default ThemeToggle
