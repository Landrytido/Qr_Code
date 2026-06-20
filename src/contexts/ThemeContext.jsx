import { createContext, useContext, useLayoutEffect, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem('qr-theme') || 'dark'
        } catch {
            return 'dark'
        }
    })

    useLayoutEffect(() => {
        const root = document.documentElement
        root.setAttribute('data-theme', theme)
        root.style.colorScheme = theme
    }, [theme])

    useEffect(() => {
        try {
            localStorage.setItem('qr-theme', theme)
        } catch {
            // Ignore storage failures in private mode or restricted environments.
        }
    }, [theme])

    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme doit être utilisé dans un ThemeProvider')
    return ctx
}
