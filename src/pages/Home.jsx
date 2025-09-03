import React, { useState, useEffect } from 'react';

function ModernHome() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div style={{
            textAlign: 'center',
            position: 'relative',
            minHeight: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            {/* Logo animé */}
            <div style={{
                width: '140px',
                height: '140px',
                background: 'linear-gradient(135deg, #00f5a0 0%, #00d9ff 100%)',
                borderRadius: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                boxShadow: '0 20px 60px rgba(0, 245, 160, 0.3)',
                position: 'relative',
                animation: 'logoFloat 6s ease-in-out infinite'
            }}>
                <span style={{
                    fontSize: '3.5rem',
                    fontWeight: '900',
                    color: 'white',
                    textShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}>
                    QR
                </span>

                {/* Anneau qui tourne */}
                <div style={{
                    position: 'absolute',
                    width: '160px',
                    height: '160px',
                    border: '3px solid transparent',
                    borderTop: '3px solid rgba(0, 245, 160, 0.6)',
                    borderRadius: '50%',
                    animation: 'spin 4s linear infinite'
                }} />
            </div>

            <h1 className="page-title" style={{
                fontSize: '3.2rem',
                marginBottom: '1rem',
                animation: 'slideUp 0.8s ease-out 0.2s both'
            }}>
                QR Studio
            </h1>

            <p className="page-subtitle" style={{
                fontSize: '1.3rem',
                maxWidth: '600px',
                lineHeight: 1.6,
                animation: 'slideUp 0.8s ease-out 0.4s both'
            }}>
                Créez, personnalisez et partagez vos QR codes avec style.
                Une expérience moderne et intuitive pour tous vos besoins.
            </p>

            {/* Features cards */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                marginTop: '4rem',
                width: '100%',
                maxWidth: '800px'
            }}>
                {[
                    { icon: '✨', title: 'Génération rapide', desc: 'Créez vos QR codes en quelques clics' },
                    { icon: '🎨', title: 'Personnalisation', desc: 'Couleurs et styles à votre goût' },
                    { icon: '📱', title: 'Responsive', desc: 'Parfait sur mobile et desktop' },
                ].map((feature, index) => (
                    <div key={index} style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '24px',
                        padding: '2rem 1.5rem',
                        textAlign: 'center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        animation: `slideUp 0.8s ease-out ${0.6 + index * 0.2}s both`,
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-8px) scale(1.02)';
                            e.target.style.boxShadow = '0 25px 60px rgba(0, 245, 160, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = 'none';
                        }}>
                        <div style={{
                            fontSize: '2.5rem',
                            marginBottom: '1rem',
                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                        }}>
                            {feature.icon}
                        </div>
                        <h3 style={{
                            fontSize: '1.2rem',
                            fontWeight: '600',
                            marginBottom: '0.5rem',
                            background: 'linear-gradient(135deg, #00f5a0 0%, #00d9ff 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {feature.title}
                        </h3>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.95rem',
                            opacity: 0.8
                        }}>
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <button
                className="modern-button"
                onClick={() => window.location.href = '/generate'}
                style={{
                    marginTop: '3rem',
                    padding: '1.2rem 3rem',
                    fontSize: '1.1rem',
                    animation: 'slideUp 0.8s ease-out 1.2s both'
                }}
            >
                Commencer maintenant
            </button>

            <style jsx>{`
                @keyframes logoFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(180deg); }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}

export default ModernHome;