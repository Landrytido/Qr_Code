import PropTypes from 'prop-types'
import { useMobile } from '../../hooks/useMobile'

const Sidebar = ({ currentPage, onPageChange }) => {
    const { isMobile, isMenuOpen, setIsMenuOpen } = useMobile()

    const menuItems = [
        { id: 'home', label: 'Accueil', icon: HomeIcon },
        { id: 'generate', label: 'Générer', icon: GridIcon },
        { id: 'customize', label: 'Personnaliser', icon: EditIcon },
        { id: 'history', label: 'Historique', icon: HistoryIcon }
    ]

    const handleMenuItemClick = (pageId) => {
        onPageChange(pageId)
        if (isMobile) {
            setIsMenuOpen(false)
        }
    }

    return (
        <>
            <button
                className="mobile-menu-toggle"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div className={`sidebar ${isMenuOpen ? 'sidebar-open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo">QR Studio</div>
                    <div className="subtitle">Générateur moderne</div>
                    <button
                        className="mobile-close"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        ×
                    </button>
                </div>

                <ul className="nav-menu">
                    {menuItems.map(item => (
                        <li key={item.id} className="nav-item">
                            <button
                                className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                                onClick={() => handleMenuItemClick(item.id)}
                            >
                                <item.icon className="nav-icon" />
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>

                <div className="sidebar-footer">
                    <div className="footer-signature">
                        <div className="signature-main">
                            <strong>QR Studio</strong>
                            <span className="version">v1.0</span>
                        </div>

                        <div className="signature-author">
                            <span>Créé par</span>
                            <div className="author-info">
                                <strong>Landry Tido</strong>
                                <div className="author-links">
                                    <a
                                        href="https://www.linkedin.com/in/landry-tido-atikeng/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link linkedin"
                                        title="LinkedIn - Landry Tido Atikeng"
                                    >
                                        <LinkedInIcon className="social-icon" />
                                    </a>
                                    <a
                                        href="https://github.com/Landrytido"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link github"
                                        title="GitHub - Landrytido"
                                    >
                                        <GitHubIcon className="social-icon" />
                                    </a>
                                    <a
                                        href="mailto:landrytido727@gmail.com"
                                        className="social-link email"
                                        title="Contact email"
                                    >
                                        <EmailIcon className="social-icon" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="signature-year">
                            © 2025 • Développé avec 🤬😡
                        </div>
                    </div>
                </div>
            </div>

            {isMenuOpen && <div className="sidebar-overlay" onClick={() => setIsMenuOpen(false)} />}
        </>
    )
}

const HomeIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
)

const GridIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    </svg>
)

const EditIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
)

const HistoryIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3a2 2 0 012 0v1a1 1 0 102 0V3a2 2 0 012 2v6.5A1.5 1.5 0 0112.5 13h-5A1.5 1.5 0 016 11.5V5zm8 5v2a1 1 0 11-2 0v-2a1 1 0 112 0zm-6 0v2a1 1 0 11-2 0v-2a1 1 0 112 0z" clipRule="evenodd" />
    </svg>
)

const LinkedInIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
)

const GitHubIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
)

const EmailIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
)

const iconPropTypes = {
    className: PropTypes.string
}

HomeIcon.propTypes = iconPropTypes
GridIcon.propTypes = iconPropTypes
EditIcon.propTypes = iconPropTypes
HistoryIcon.propTypes = iconPropTypes
LinkedInIcon.propTypes = iconPropTypes
GitHubIcon.propTypes = iconPropTypes
EmailIcon.propTypes = iconPropTypes

Sidebar.propTypes = {
    currentPage: PropTypes.string.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Sidebar