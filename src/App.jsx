import './modern.css';
import React from 'react';
import ModernLayout from './components/Layout';
import ModernHome from './pages/Home';
import ModernGenerate from './pages/Generate';
import ModernCustomize from './pages/Customize';
import ModernHistory from './pages/History';

function App() {
  const renderPage = (path) => {
    switch (path) {
      case '/':
        return <ModernHome />;
      case '/generate':
        return <ModernGenerate />;
      case '/customize':
        return <ModernCustomize />;
      case '/history':
        return <ModernHistory />;
      default:
        return <ModernHome />;
    }
  };

  return <ModernLayout>{renderPage}</ModernLayout>;
}

export default App;