import { Component } from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, info) {
        console.error('ErrorBoundary caught:', error, info)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    padding: '2rem',
                    textAlign: 'center',
                    background: 'var(--main-gradient, #1a1d29)',
                    color: '#e2e8f0'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                        Quelque chose s'est mal passé
                    </h2>
                    <p style={{ color: '#94a3b8', marginBottom: '1.5rem', maxWidth: '400px', lineHeight: 1.6 }}>
                        Une erreur inattendue est survenue. Rechargez la page pour réessayer.
                    </p>
                    <details style={{ marginBottom: '1.5rem', maxWidth: '500px', textAlign: 'left' }}>
                        <summary style={{ cursor: 'pointer', color: '#64748b', fontSize: '0.85rem' }}>
                            Détails de l'erreur
                        </summary>
                        <pre style={{
                            marginTop: '0.5rem', fontSize: '0.75rem', color: '#ff6b6b',
                            background: 'rgba(255,0,0,0.05)', padding: '0.75rem',
                            borderRadius: '8px', overflowX: 'auto', whiteSpace: 'pre-wrap'
                        }}>
                            {this.state.error?.message}
                        </pre>
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            background: '#00d4aa', color: '#fff', border: 'none',
                            borderRadius: '10px', padding: '0.75rem 1.5rem',
                            fontWeight: 600, fontSize: '1rem', cursor: 'pointer'
                        }}
                    >
                        Recharger la page
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}

ErrorBoundary.propTypes = { children: PropTypes.node.isRequired }

export default ErrorBoundary
