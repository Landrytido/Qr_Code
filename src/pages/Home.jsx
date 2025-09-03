import React from 'react'
import SEOHead from '../components/SEOHead'
import './Home.css'

function Home() {
    const features = [
        {
            icon: '⚡',
            title: 'Génération rapide',
            description: 'Créez vos QR codes en quelques clics'
        },
        {
            icon: '🎨',
            title: 'Personnalisation',
            description: 'Couleurs et styles à votre goût'
        },
        {
            icon: '📱',
            title: 'Responsive',
            description: 'Parfait sur mobile et desktop'
        },
        {
            icon: '💾',
            title: 'Sauvegarde',
            description: 'Historique de tous vos QR codes'
        }
    ]

    return (
        <div className="home">
            <SEOHead
                title="QR Studio - Générateur de QR Code Gratuit et Moderne"
                description="Créez des QR codes personnalisés gratuitement avec QR Studio. Interface moderne, personnalisation complète et téléchargement haute qualité. Générateur rapide et intuitif."
                keywords="QR code gratuit, générateur QR code, QR code personnalisé, créer QR code, QR code français, QR Studio"
                path="/"
            />
            <div className="hero">
                <div className="hero-content">
                    <div className="hero-logo">
                        <span className="hero-logo-text">QR</span>
                    </div>
                    <h1 className="hero-title">QR Studio</h1>
                    <p className="hero-subtitle">
                        Créez, personnalisez et partagez vos QR codes avec style.
                        <br />
                        Une expérience moderne et intuitive pour tous vos besoins.
                    </p>
                    <button className="btn btn-primary hero-btn">
                        Commencer maintenant
                    </button>
                </div>
            </div>

            <div className="features">
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card glass">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home