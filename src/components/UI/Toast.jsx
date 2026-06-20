import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Toast.css'

const ICONS = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
}

const Toast = ({ id, type = 'info', message, duration = 3500, onRemove }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        requestAnimationFrame(() => setVisible(true))

        const timer = setTimeout(() => {
            setVisible(false)
            setTimeout(() => onRemove(id), 300)
        }, duration)

        return () => clearTimeout(timer)
    }, [id, duration, onRemove])

    return (
        <div className={`toast toast--${type} ${visible ? 'toast--visible' : ''}`} role="alert">
            <span className="toast__icon">{ICONS[type]}</span>
            <span className="toast__message">{message}</span>
            <button
                className="toast__close"
                onClick={() => {
                    setVisible(false)
                    setTimeout(() => onRemove(id), 300)
                }}
                aria-label="Fermer"
            >
                ✕
            </button>
        </div>
    )
}

Toast.propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
    message: PropTypes.string.isRequired,
    duration: PropTypes.number,
    onRemove: PropTypes.func.isRequired
}

export default Toast
