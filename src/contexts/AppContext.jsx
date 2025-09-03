import { createContext, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

// Actions
const ACTIONS = {
    SET_QR_DATA: 'SET_QR_DATA',
    SET_QR_OPTIONS: 'SET_QR_OPTIONS',
    ADD_TO_HISTORY: 'ADD_TO_HISTORY',
    SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
    LOAD_HISTORY: 'LOAD_HISTORY'
}

// État initial
const initialState = {
    currentPage: 'home',
    qrData: '',
    qrOptions: {
        size: 256,
        bgColor: '#ffffff',
        fgColor: '#000000',
        level: 'M',
        includeMargin: true
    },
    history: []
}

// Reducer
const appReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_CURRENT_PAGE:
            return { ...state, currentPage: action.payload }

        case ACTIONS.SET_QR_DATA:
            return { ...state, qrData: action.payload }

        case ACTIONS.SET_QR_OPTIONS:
            return {
                ...state,
                qrOptions: { ...state.qrOptions, ...action.payload }
            }

        case ACTIONS.ADD_TO_HISTORY: {
            const newHistoryItem = {
                id: Date.now(),
                data: action.payload.data,
                options: action.payload.options,
                createdAt: new Date().toISOString()
            }
            // Limite à 6 éléments - supprime le plus ancien après 6
            const updatedHistory = [newHistoryItem, ...state.history].slice(0, 6)

            localStorage.setItem('qr-history', JSON.stringify(updatedHistory))

            return { ...state, history: updatedHistory }
        }

        case ACTIONS.LOAD_HISTORY:
            return { ...state, history: action.payload }

        default:
            return state
    }
}

// Contexte
const AppContext = createContext()

// Provider
export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState)

    // Charger l'historique au démarrage
    useEffect(() => {
        const savedHistory = localStorage.getItem('qr-history')
        if (savedHistory) {
            try {
                const parsedHistory = JSON.parse(savedHistory)
                dispatch({ type: ACTIONS.LOAD_HISTORY, payload: parsedHistory })
            } catch (error) {
                console.error('Erreur lors du chargement de l\'historique:', error)
            }
        }
    }, [])

    // Actions
    const setCurrentPage = (page) => {
        dispatch({ type: ACTIONS.SET_CURRENT_PAGE, payload: page })
    }

    const setQrData = (data) => {
        dispatch({ type: ACTIONS.SET_QR_DATA, payload: data })
    }

    const setQrOptions = (options) => {
        dispatch({ type: ACTIONS.SET_QR_OPTIONS, payload: options })
    }

    const generateQR = () => {
        if (state.qrData.trim()) {
            dispatch({
                type: ACTIONS.ADD_TO_HISTORY,
                payload: {
                    data: state.qrData,
                    options: state.qrOptions
                }
            })
            return true
        }
        return false
    }

    const value = {
        // État
        ...state,
        // Actions
        setCurrentPage,
        setQrData,
        setQrOptions,
        generateQR
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppContext
