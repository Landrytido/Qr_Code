import { useEffect } from 'react'
import PropTypes from 'prop-types'
import './Modal.css'

const Modal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    confirmLabel = 'Confirmer',
    cancelLabel = 'Annuler',
    confirmVariant = 'danger',
    icon
}) => {
    useEffect(() => {
        if (!isOpen) return
        const handleKey = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {icon && (
                    <div className="modal-icon">
                        {icon}
                    </div>
                )}
                <h3 className="modal-title">{title}</h3>
                <div className="modal-body">{children}</div>
                <div className="modal-actions">
                    <button className="modal-btn modal-btn--cancel" onClick={onClose}>
                        {cancelLabel}
                    </button>
                    {onConfirm && (
                        <button
                            className={`modal-btn modal-btn--${confirmVariant}`}
                            onClick={onConfirm}
                        >
                            {confirmLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    confirmLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    confirmVariant: PropTypes.oneOf(['danger', 'primary']),
    icon: PropTypes.node
}

export default Modal
