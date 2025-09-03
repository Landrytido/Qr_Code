import React, { useState } from 'react';
import Sidebar from './Sidebar';

function Layout({ children }) {
    const [currentPage, setCurrentPage] = useState(window.location.pathname);

    React.useEffect(() => {
        window.history.pushState({}, '', currentPage);
    }, [currentPage]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar onNavigate={setCurrentPage} />
            <main style={{ flex: 1, padding: '40px 24px', background: '#eafaf1' }}>
                {children(currentPage)}
            </main>
        </div>
    );
}

export default Layout;
