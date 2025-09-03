import { AppProvider } from './contexts/AppContext'
import { useApp } from './hooks/useApp'
import Sidebar from './components/Layout/Sidebar'
import MainContent from './components/Layout/MainContent'
import './styles/globals.css'

// Composant avec la logique
const AppContent = () => {
  const { currentPage, setCurrentPage } = useApp()

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <MainContent currentPage={currentPage} />
    </div>
  )
}

// App principal avec provider
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App