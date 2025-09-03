
import React, { useState } from 'react';
import { icons } from '../assets/icons';

const menu = [
    { label: 'Accueil', path: '/', icon: icons.home },
    { label: 'Générer', path: '/generate', icon: icons.qr },
    { label: 'Personnaliser', path: '/customize', icon: icons.customize },
    { label: 'Historique', path: '/history', icon: icons.history },
];

function ModernSidebar({ onNavigate, currentPage }) {
    const [hoveredItem, setHoveredItem] = useState(null);

    return (
        <aside className="modern-sidebar">
            <div className="sidebar-content">
                <div className="sidebar-logo">
                    <h1>QR Studio</h1>
                    <p>Générateur moderne</p>
                </div>

                <nav>
                    {menu.map((item, index) => (
                        <button
                            key={item.path}
                            onClick={() => onNavigate(item.path)}
                            className={`nav-item ${currentPage === item.path ? 'active' : ''}`}
                            onMouseEnter={() => setHoveredItem(index)}
                            onMouseLeave={() => setHoveredItem(null)}
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            <span style={{
                                marginRight: '12px',
                                display: 'inline-flex',
                                verticalAlign: 'middle',
                                transform: hoveredItem === index ? 'scale(1.2)' : 'scale(1)',
                                transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}>
                                {item.icon}
                            </span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '1.5rem',
                    right: '1.5rem',
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '0.8rem'
                }}>
                    <p>© 2024 QR Studio</p>
                    <p>Design moderne</p>
                </div>
            </div>
        </aside>
    );
}

export default ModernSidebar;