import { HelmetProvider } from 'react-helmet-async'
import { AppProvider } from './contexts/AppContext'
import { ToastProvider } from './contexts/ToastContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { useApp } from './hooks/useApp'
import Sidebar from './components/Layout/Sidebar'
import MainContent from './components/Layout/MainContent'
import './styles/globals.css'

const AppContent = () => {
  const { currentPage, setCurrentPage } = useApp()

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <MainContent currentPage={currentPage} />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </AppProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App