import { useContext } from 'react'
import ToastContext from '../contexts/ToastContext'

const useToast = () => {
    const ctx = useContext(ToastContext)
    if (!ctx) throw new Error('useToast doit être utilisé dans un ToastProvider')
    return ctx
}

export default useToast
