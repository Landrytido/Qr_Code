import { createContext, useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import Toast from '../components/UI/Toast'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'info', duration = 3500) => {
        const id = Date.now()
        setToasts((prev) => [...prev, { id, message, type, duration }])
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const toast = useMemo(() => ({
        success: (msg, duration) => addToast(msg, 'success', duration),
        error: (msg, duration) => addToast(msg, 'error', duration),
        warning: (msg, duration) => addToast(msg, 'warning', duration),
        info: (msg, duration) => addToast(msg, 'info', duration)
    }), [addToast])

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div className="toast-container" aria-live="polite">
                {toasts.map((t) => (
                    <Toast key={t.id} {...t} onRemove={removeToast} />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

ToastProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default ToastContext
