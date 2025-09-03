import React, { useState, useEffect } from 'react';
import ModernSidebar from './Sidebar';

function ModernLayout({ children }) {
    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    useEffect(() => {
        window.history.pushState({}, '', currentPage);
    }, [currentPage]);

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            position: 'relative'
        }}>
            <ModernSidebar
                onNavigate={setCurrentPage}
                currentPage={currentPage}
            />

            <main className="main-content">
                <div className="page-container">
                    {children(currentPage)}
                </div>
            </main>

            {/* Particules flottantes pour l'ambiance */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
                overflow: 'hidden'
            }}>
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: `${Math.random() * 100 + 50}px`,
                            height: `${Math.random() * 100 + 50}px`,
                            background: `linear-gradient(135deg, 
                                rgba(0, 245, 160, ${Math.random() * 0.1}), 
                                rgba(0, 217, 255, ${Math.random() * 0.1}))`,
                            borderRadius: '50%',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-20px) rotate(90deg); }
                    50% { transform: translateY(-40px) rotate(180deg); }
                    75% { transform: translateY(-20px) rotate(270deg); }
                }
            `}</style>
        </div>
    );
}

export default ModernLayout;