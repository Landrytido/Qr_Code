import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function ModernCustomize() {
    const [text, setText] = useState('QR Studio - Design moderne');
    const [fgColor, setFgColor] = useState('#00f5a0');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [size, setSize] = useState(240);
    const [level, setLevel] = useState('M');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const presets = [
        { name: 'Moderne', fg: '#00f5a0', bg: '#ffffff' },
        { name: 'Ocean', fg: '#00d9ff', bg: '#f0f9ff' },
        { name: 'Sunset', fg: '#f5576c', bg: '#fff7ed' },
        { name: 'Purple', fg: '#667eea', bg: '#faf5ff' },
        { name: 'Dark', fg: '#ffffff', bg: '#1e293b' },
        { name: 'Monochrome', fg: '#000000', bg: '#ffffff' }
    ];

    return (
        <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            <h1 className="page-title">Personnaliser le QR Code</h1>
            <p className="page-subtitle">
                Ajustez les couleurs, la taille et le style selon vos préférences
            </p>

            {/* Input principal */}
            <div style={{ marginBottom: '3rem' }}>
                <input
                    type="text"
                    className="modern-input"
                    placeholder="✨ Entrez votre contenu à encoder..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                    style={{
                        fontSize: '1.1rem',
                        textAlign: 'center',
                        fontWeight: '500'
                    }}
                />
            </div>

            {/* Presets rapides */}
            <div style={{ marginBottom: '3rem' }}>
                <h3 style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    color: 'var(--text-primary)',
                    fontSize: '1.2rem',
                    fontWeight: '600'
                }}>
                    🎨 Thèmes prédéfinis
                </h3>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                    gap: '1rem',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    {presets.map((preset, index) => (
                        <button
                            key={preset.name}
                            onClick={() => {
                                setFgColor(preset.fg);
                                setBgColor(preset.bg);
                            }}
                            style={{
                                background: `linear-gradient(135deg, ${preset.bg}, ${preset.fg}20)`,
                                border: `2px solid ${preset.fg}40`,
                                borderRadius: '16px',
                                padding: '1rem 0.75rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                animation: `slideUp 0.5s ease-out ${index * 0.1}s both`,
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-4px) scale(1.05)';
                                e.target.style.boxShadow = `0 15px 40px ${preset.fg}30`;
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0) scale(1)';
                                e.target.style.boxShadow = 'none';
                            }}
                        >
                            <div style={{
                                width: '30px',
                                height: '30px',
                                background: preset.fg,
                                borderRadius: '8px',
                                margin: '0 auto 0.5rem',
                                border: `2px solid ${preset.bg}`,
                                boxShadow: `0 4px 12px ${preset.fg}40`
                            }} />
                            <div style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: 'var(--text-primary)'
                            }}>
                                {preset.name}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Contrôles personnalisés */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '3rem',
                alignItems: 'start'
            }}>
                {/* Panel de contrôles */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '24px',
                    padding: '2rem'
                }}>
                    <h3 style={{
                        marginBottom: '2rem',
                        color: 'var(--text-primary)',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                    }}>
                        🎛️ Réglages avancés
                    </h3>

                    {/* Color pickers */}
                    <div className="color-picker-group" style={{ marginBottom: '2rem' }}>
                        <div className="color-picker-item">
                            <label>Premier plan</label>
                            <input
                                type="color"
                                value={fgColor}
                                onChange={e => setFgColor(e.target.value)}
                            />
                        </div>
                        <div className="color-picker-item">
                            <label>Arrière-plan</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={e => setBgColor(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Size slider */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '1rem',
                            color: 'var(--text-primary)',
                            fontWeight: '500'
                        }}>
                            📏 Taille: {size}px
                        </label>
                        <input
                            type="range"
                            min="120"
                            max="400"
                            value={size}
                            onChange={e => setSize(e.target.value)}
                            style={{
                                width: '100%',
                                height: '6px',
                                borderRadius: '3px',
                                background: `linear-gradient(to right, var(--primary) 0%, var(--secondary) 100%)`,
                                outline: 'none',
                                appearance: 'none',
                                cursor: 'pointer'
                            }}
                        />
                    </div>

                    {/* Error correction level */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: '1rem',
                            color: 'var(--text-primary)',
                            fontWeight: '500'
                        }}>
                            🛡️ Correction d'erreur
                        </label>
                        <select
                            className="modern-input"
                            value={level}
                            onChange={e => setLevel(e.target.value)}
                            style={{ margin: 0 }}
                        >
                            <option value="L">Faible (~7%)</option>
                            <option value="M">Moyen (~15%)</option>
                            <option value="Q">Élevé (~25%)</option>
                            <option value="H">Maximum (~30%)</option>
                        </select>
                    </div>
                </div>

                {/* Preview QR Code */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div className="qr-container" style={{
                        minHeight: size + 100,
                        position: 'relative'
                    }}>
                        {text ? (
                            <div style={{
                                animation: 'qrUpdate 0.3s ease-out'
                            }}>
                                <QRCodeSVG
                                    value={text}
                                    size={size}
                                    fgColor={fgColor}
                                    bgColor={bgColor}
                                    level={level}
                                    style={{
                                        filter: `drop-shadow(0 10px 30px ${fgColor}40)`,
                                        borderRadius: '12px'
                                    }}
                                />
                            </div>
                        ) : (
                            <div style={{
                                color: 'var(--text-secondary)',
                                fontSize: '1.1rem',
                                textAlign: 'center',
                                opacity: 0.6
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>
                                    🎨
                                </div>
                                Aperçu de votre QR code
                            </div>
                        )}
                    </div>

                    {/* Action buttons */}
                    {text && (
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            marginTop: '2rem',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}>
                            <button className="modern-button">
                                💾 Sauvegarder
                            </button>
                            <button
                                className="modern-button"
                                style={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                }}
                            >
                                📤 Partager
                            </button>
                            <button
                                className="modern-button"
                                style={{
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                                }}
                            >
                                📥 Télécharger
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes qrUpdate {
                    from {
                        opacity: 0.5;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                input[type="range"]::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: white;
                    border: 3px solid var(--primary);
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0, 245, 160, 0.3);
                    transition: all 0.2s ease;
                }

                input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                    box-shadow: 0 6px 16px rgba(0, 245, 160, 0.4);
                }
            `}</style>
        </div>
    );
}

export default ModernCustomize;