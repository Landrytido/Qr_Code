

import './modern.css';
import React from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Generate from './pages/Generate';
import Customize from './pages/Customize';
import History from './pages/History';

function App() {
  const renderPage = (path) => {
    switch (path) {
      case '/':
        return <Home />;
      case '/generate':
        return <Generate />;
      case '/customize':
        return <Customize />;
      case '/history':
        return <History />;
      default:
        return <Home />;
    }
  };

  return <Layout>{renderPage}</Layout>;
}

export default App;
