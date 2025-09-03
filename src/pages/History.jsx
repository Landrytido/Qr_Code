import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

function ModernHistory() {
    const [isVisible, setIsVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data pour l'historique
    const [historyItems] = useState([
        {
            id: 1,
            content: 'https://qrstudio.app',
            type: 'URL',
            createdAt: '2024-01-15',
            color: '#00f5a0',
            bgColor: '#ffffff',
            scans: 142
        },
        {
            id: 2,
            content: 'WIFI:T:WPA;S:MonWiFi;P:motdepasse123;;',
            type: 'WiFi',
            createdAt: '2024-01-14',
            color: '#00d9ff',
            bgColor: '#f0f9ff',
            scans: 89
        },
        {
            id: 3,
            content: 'Contact: Jean Dupont\n+33123456789\njean@email.com',
            type: 'Contact',
            createdAt: '2024-01-12',
            color: '#667eea',
            bgColor: '#faf5ff',
            scans: 23
        },
        {
            id: 4,
            content: 'Hello World! QR Studio est fantastique!',
            type: 'Texte',
            createdAt: '2024-01-10',
            color: '#f5576c',
            bgColor: '#fff7ed',
            scans: 67
        }
    ]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const filteredItems = historyItems.filter(item =>
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTypeIcon = (type) => {
        switch (type) {
            case 'URL': return '🔗';
            case 'WiFi': return '📶';
            case 'Contact': return '👤';
            case 'Texte': return '📝';
            default: return '📱';
        }
    };

    const formatContent = (content, type) => {
        if (type === 'WiFi') {
            const match = content.match(/S:([^;]*);P:([^;]*);/);
            return match ? `WiFi: ${match[1]}` : 'Configuration WiFi';
        }
        return content.length > 50 ? content.substring(0, 50) + '...' : content;
    };

    return (
        <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
            <h1 className="page-title">Historique des QR Codes</h1>
            <p className="page-subtitle">
                Retrouvez tous vos QR codes créés et gérez votre collection
            </p>

            {/* Barre de recherche */}
            <div style={{
                marginBottom: '3rem',
                position: 'relative',
                maxWidth: '500px',
                margin: '0 auto 3rem'
            }}>
                <input
                    type="text"
                    className="modern-input"
                    placeholder="🔍 Rechercher dans votre historique..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    style={{
                        paddingLeft: '3rem',
                        fontSize: '1rem'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.2rem',
                    opacity: 0.5
                }}>
                    🔍
                </div>
            </div>

            {/* Stats rapides */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem'
            }}>
                {[
                    { label: 'Total créés', value: historyItems.length, icon: '📱', color: '#00f5a0' },
                    { label: 'Scans totaux', value: historyItems.reduce((sum, item) => sum + item.scans, 0), icon: '👁️', color: '#00d9ff' },
                    { label: 'Ce mois', value: historyItems.filter(item => new Date(item.createdAt).getMonth() === new Date().getMonth()).length, icon: '📅', color: '#667eea' },
                ].map((stat, index) => (
                    <div key={index} style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        textAlign: 'center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        animation: `slideUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                        onMouseEnter={e => {
                            e.target.style.transform = 'translateY(-4px)';
                            e.target.style.boxShadow = `0 15px 40px ${stat.color}30`;
                        }}
                        onMouseLeave={e => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                        }}>
                        <div style={{
                            fontSize: '2rem',
                            marginBottom: '0.5rem',
                            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                        }}>
                            {stat.icon}
                        </div>
                        <div style={{
                            fontSize: '2rem',
                            fontWeight: '700',
                            color: stat.color,
                            marginBottom: '0.25rem'
                        }}>
                            {stat.value}
                        </div>
                        <div style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem'
                        }}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Liste des QR codes */}
            {filteredItems.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredItems.map((item, index) => (
                        <div key={item.id} style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            borderRadius: '24px',
                            padding: '2rem',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                            animation: `slideUp 0.6s ease-out ${index * 0.1}s both`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                            onMouseEnter={e => {
                                e.target.style.transform = 'translateY(-8px) scale(1.02)';
                                e.target.style.boxShadow = '0 25px 60px rgba(0, 245, 160, 0.15)';
                            }}
                            onMouseLeave={e => {
                                e.target.style.transform = 'translateY(0) scale(1)';
                                e.target.style.boxShadow = 'none';
                            }}>
                            {/* Type badge */}
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                background: `linear-gradient(135deg, ${item.color}20, ${item.color}10)`,
                                border: `1px solid ${item.color}40`,
                                borderRadius: '12px',
                                padding: '0.5rem 1rem',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                color: item.color,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                {getTypeIcon(item.type)}
                                {item.type}
                            </div>

                            {/* QR Code preview */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '1.5rem'
                            }}>
                                <div style={{
                                    background: item.bgColor,
                                    padding: '1rem',
                                    borderRadius: '16px',
                                    boxShadow: `0 8px 25px ${item.color}20`
                                }}>
                                    <QRCodeSVG
                                        value={item.content}
                                        size={120}
                                        fgColor={item.color}
                                        bgColor={item.bgColor}
                                        level="M"
                                    />
                                </div>
                            </div>

                            {/* Contenu */}
                            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: 'var(--text-primary)',
                                    marginBottom: '0.5rem',
                                    wordBreak: 'break-word'
                                }}>
                                    {formatContent(item.content, item.type)}
                                </h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem'
                                }}>
                                    Créé le {new Date(item.createdAt).toLocaleDateString('fr-FR')}
                                </p>
                            </div>

                            {/* Stats et actions */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingTop: '1rem',
                                borderTop: '1px solid rgba(0,0,0,0.1)'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--text-secondary)',
                                    fontSize: '0.9rem'
                                }}>
                                    <span style={{ fontSize: '1rem' }}>👁️</span>
                                    {item.scans} scans
                                </div>

                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button style={{
                                        background: 'none',
                                        border: `1px solid ${item.color}40`,
                                        borderRadius: '12px',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s ease',
                                        color: item.color
                                    }}
                                        onMouseEnter={e => {
                                            e.target.style.background = `${item.color}20`;
                                            e.target.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.background = 'none';
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                        title="Télécharger">
                                        📥
                                    </button>

                                    <button style={{
                                        background: 'none',
                                        border: `1px solid ${item.color}40`,
                                        borderRadius: '12px',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s ease',
                                        color: item.color
                                    }}
                                        onMouseEnter={e => {
                                            e.target.style.background = `${item.color}20`;
                                            e.target.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.background = 'none';
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                        title="Partager">
                                        📤
                                    </button>

                                    <button style={{
                                        background: 'none',
                                        border: '1px solid #f5576c40',
                                        borderRadius: '12px',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        transition: 'all 0.2s ease',
                                        color: '#f5576c'
                                    }}
                                        onMouseEnter={e => {
                                            e.target.style.background = '#f5576c20';
                                            e.target.style.transform = 'scale(1.1)';
                                        }}
                                        onMouseLeave={e => {
                                            e.target.style.background = 'none';
                                            e.target.style.transform = 'scale(1)';
                                        }}
                                        title="Supprimer">
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{
                    textAlign: 'center',
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    marginTop: '4rem'
                }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.3 }}>
                        {searchTerm ? '🔍' : '📚'}
                    </div>
                    {searchTerm ? 'Aucun résultat trouvé' : 'Aucun QR code dans votre historique'}
                    <div style={{ marginTop: '2rem' }}>
                        <button
                            className="modern-button"
                            onClick={() => window.location.href = '/generate'}
                        >
                            ✨ Créer votre premier QR code
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
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

export default ModernHistory;