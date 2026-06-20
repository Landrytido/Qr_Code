import ContentCard from '../UI/ContentCard'
import FeatureCard from '../UI/FeatureCard'
import QRLogo from '../UI/QRLogo'
import { useApp } from '../../hooks/useApp'
const Home = () => {
    const { setCurrentPage } = useApp()

    const shortcuts = [
        {
            icon: "⚡",
            title: "Générer un QR Code",
            description: "Créez votre QR code rapidement",
            action: () => setCurrentPage('generate'),
            color: "#00d4aa"
        },
        {
            icon: "🎨",
            title: "Personnaliser le style",
            description: "Couleurs et options avancées",
            action: () => setCurrentPage('customize'),
            color: "#667eea"
        },
        {
            icon: "📚",
            title: "Voir l'historique",
            description: "Retrouvez vos QR codes créés",
            action: () => setCurrentPage('history'),
            color: "#8b5cf6"
        }
    ]

    return (
        <ContentCard>
            <QRLogo />
            <h1 className="main-title">QR Studio</h1>
            <p className="main-description">
                Créez, personnalisez et partagez vos QR codes avec style.<br />
                Choisissez une action pour commencer :
            </p>

            <div className="shortcuts-grid">
                {shortcuts.map((shortcut, index) => (
                    <div
                        key={index}
                        className="shortcut-card"
                        onClick={shortcut.action}
                        style={{ '--accent-color': shortcut.color }}
                    >
                        <div className="shortcut-icon">{shortcut.icon}</div>
                        <h3 className="shortcut-title">{shortcut.title}</h3>
                        <p className="shortcut-description">{shortcut.description}</p>
                        <div className="shortcut-arrow">→</div>
                    </div>
                ))}
            </div>

            <div className="quick-stats">
                <div className="stat-item">
                    <span className="stat-number">∞</span>
                    <span className="stat-label">QR codes possibles</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Gratuit</span>
                </div>
                <div className="stat-item">
                    <span className="stat-number">3</span>
                    <span className="stat-label">Étapes simples</span>
                </div>
            </div>
        </ContentCard>
    )
}

export default Home