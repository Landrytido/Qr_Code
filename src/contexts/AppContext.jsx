import { createContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

const ACTIONS = {
    SET_QR_DATA: 'SET_QR_DATA',
    SET_QR_OPTIONS: 'SET_QR_OPTIONS',
    ADD_TO_HISTORY: 'ADD_TO_HISTORY',
    REMOVE_HISTORY_ITEM: 'REMOVE_HISTORY_ITEM',
    CLEAR_HISTORY: 'CLEAR_HISTORY',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    LOAD_HISTORY: 'LOAD_HISTORY',
    LOAD_FROM_HISTORY: 'LOAD_FROM_HISTORY'
}

const DEFAULT_OPTIONS = {
    size: 256,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'M',
    includeMargin: true
}

function loadSavedOptions() {
    try {
        const saved = localStorage.getItem('qr-options')
        return saved ? { ...DEFAULT_OPTIONS, ...JSON.parse(saved) } : DEFAULT_OPTIONS
    } catch {
        return DEFAULT_OPTIONS
    }
}

const initialState = {
    currentPage: 'home',
    qrData: '',
    qrOptions: loadSavedOptions(),
    history: []
}

const appReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload }

        case ACTIONS.SET_QR_DATA:
            return { ...state, qrData: action.payload }

        case ACTIONS.SET_QR_OPTIONS: {
            const updated = { ...state.qrOptions, ...action.payload }
            try { localStorage.setItem('qr-options', JSON.stringify(updated)) } catch {}
            return { ...state, qrOptions: updated }
        }

        case ACTIONS.ADD_TO_HISTORY: {
            const newItem = {
                id: Date.now(),
                data: action.payload.data,
                options: action.payload.options,
                createdAt: new Date().toISOString()
            }
            const updated = [newItem, ...state.history].slice(0, 20)
            localStorage.setItem('qr-history', JSON.stringify(updated))
            return { ...state, history: updated }
        }

        case ACTIONS.REMOVE_HISTORY_ITEM: {
            const filtered = state.history.filter(item => item.id !== action.payload)
            localStorage.setItem('qr-history', JSON.stringify(filtered))
            return { ...state, history: filtered }
        }

        case ACTIONS.CLEAR_HISTORY:
            localStorage.removeItem('qr-history')
            return { ...state, history: [] }

        case ACTIONS.LOAD_HISTORY:
            return { ...state, history: action.payload }

        case ACTIONS.LOAD_FROM_HISTORY:
            return {
                ...state,
                qrData: action.payload.data,
                qrOptions: action.payload.options,
                currentPage: 'generate'
            }

        default:
            return state
    }
}

const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    useEffect(() => {
        const saved = localStorage.getItem('qr-history')
        if (saved) {
            try {
                dispatch({ type: ACTIONS.LOAD_HISTORY, payload: JSON.parse(saved) })
            } catch (e) {
                console.error('Erreur chargement historique:', e)
            }
        }
    }, [])

    const setCurrentPage = (page) => dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page })
    const setQrData = (data) => dispatch({ type: ACTIONS.SET_QR_DATA, payload: data })
    const setQrOptions = (options) => dispatch({ type: ACTIONS.SET_QR_OPTIONS, payload: options })

    const generateQR = (data, options) => {
        const d = data ?? state.qrData
        const o = options ?? state.qrOptions
        if (d.trim()) {
            dispatch({ type: ACTIONS.ADD_TO_HISTORY, payload: { data: d, options: o } })
            return true
        }
        return false
    }

    const removeHistoryItem = (id) => dispatch({ type: ACTIONS.REMOVE_HISTORY_ITEM, payload: id })
    const clearHistory = () => dispatch({ type: ACTIONS.CLEAR_HISTORY })
    const loadFromHistory = (item) => dispatch({ type: ACTIONS.LOAD_FROM_HISTORY, payload: item })

    const value = {
        ...state,
        setCurrentPage,
        setQrData,
        setQrOptions,
        generateQR,
        removeHistoryItem,
        clearHistory,
        loadFromHistory
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

AppProvider.propTypes = { children: PropTypes.node.isRequired }

export default AppContext
