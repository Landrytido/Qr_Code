import React from 'react';
import { theme } from '../theme';

const menu = [
    { label: 'Accueil', path: '/' },
    { label: 'Générer QR Code', path: '/generate' },
    { label: 'Personnaliser', path: '/customize' },
    { label: 'Historique', path: '/history' },
];

function Sidebar({ onNavigate }) {
    return (
        <aside style={{
            width: 220,
            background: theme.primary,
            color: 'white',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '32px 0',
            boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: 32 }}>Menu</h2>
            <nav>
                {menu.map(item => (
                    <button
                        key={item.path}
                        onClick={() => onNavigate(item.path)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            fontSize: '1.1rem',
                            padding: '16px 0',
                            width: '100%',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'background 0.2s',
                        }}
                        onMouseOver={e => e.target.style.background = theme.secondary}
                        onMouseOut={e => e.target.style.background = 'none'}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
