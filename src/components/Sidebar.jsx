
import React from 'react';
import { icons } from '../assets/icons.jsx';

const menu = [
    { label: 'Accueil', path: '/', icon: icons.home },
    { label: 'Générer', path: '/generate', icon: icons.qr },
    { label: 'Personnaliser', path: '/customize', icon: icons.customize },
    { label: 'Historique', path: '/history', icon: icons.history },
];

function ModernSidebar({ onNavigate, currentPage }) {
    return (
        <aside className="modern-sidebar">
            <div className="modern-sidebar-header">
                <h2>QR Studio</h2>
                <span className="modern-sidebar-subtitle">Générateur moderne</span>
            </div>
            <nav>
                <ul className="modern-sidebar-list">
                    {menu.map((item) => (
                        <li
                            key={item.path}
                            className={`modern-sidebar-item${currentPage === item.path ? ' active' : ''}`}
                            onClick={() => onNavigate(item.path)}
                            style={{ cursor: 'pointer' }}
                        >
                            <span className="modern-sidebar-icon">{item.icon}</span>
                            <span>{item.label}</span>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="modern-sidebar-footer">
                <p>© 2024 QR Studio</p>
                <p>Design moderne</p>
            </div>
        </aside>
    );
}

export default ModernSidebar;