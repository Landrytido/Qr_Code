
import React from 'react';

function Home() {
    const features = [
        { icon: '✨', title: 'Génération rapide', desc: 'Créez vos QR codes en quelques clics' },
        { icon: '🎨', title: 'Personnalisation', desc: 'Couleurs et styles à votre goût' },
        { icon: '📱', title: 'Responsive', desc: 'Parfait sur mobile et desktop' },
    ];

    return (
        <div className="modern-home-bg">
            <div className="modern-home-center">
                <div className="modern-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '3rem', fontWeight: '900', color: 'white', textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>QR</span>
                </div>
                <h1 className="modern-title">QR Studio</h1>
                <p className="modern-desc">Créez, personnalisez et partagez vos QR codes avec style.<br />Une expérience moderne et intuitive pour tous vos besoins.</p>
                <button className="modern-btn" onClick={() => window.location.href = '/generate'}>Commencer maintenant</button>
                <div className="modern-features-grid">
                    {features.map((feature, idx) => (
                        <div className="modern-feature-card" key={idx}>
                            <div className="modern-feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;