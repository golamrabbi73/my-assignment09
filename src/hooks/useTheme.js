import { useEffect, useState } from 'react'

const useTheme = () => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'dark'
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

  return { theme, toggleTheme };
}

export default useTheme
