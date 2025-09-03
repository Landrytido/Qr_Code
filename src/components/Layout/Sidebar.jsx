import PropTypes from 'prop-types'

const Sidebar = ({ currentPage, onPageChange }) => {
    const menuItems = [
        { id: 'home', label: 'Accueil', icon: HomeIcon },
        { id: 'generate', label: 'Générer', icon: GridIcon },
        { id: 'customize', label: 'Personnaliser', icon: EditIcon },
        { id: 'history', label: 'Historique', icon: HistoryIcon }
    ]

    return (
        <div className="sidebar">
            <div className="logo">QR Studio</div>
            <div className="subtitle">Générateur moderne</div>

            <ul className="nav-menu">
                {menuItems.map(item => (
                    <li key={item.id} className="nav-item">
                        <button
                            className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                            onClick={() => onPageChange(item.id)}
                        >
                            <item.icon className="nav-icon" />
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="footer">
                © 2025 QR Studio<br />
                Design Landry
            </div>
        </div>
    )
}

// Icônes SVG en tant que composants
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

// PropTypes pour les icônes
const iconPropTypes = {
    className: PropTypes.string
}

HomeIcon.propTypes = iconPropTypes
GridIcon.propTypes = iconPropTypes
EditIcon.propTypes = iconPropTypes
HistoryIcon.propTypes = iconPropTypes

Sidebar.propTypes = {
    currentPage: PropTypes.string.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Sidebar