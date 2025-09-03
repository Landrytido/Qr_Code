import { useState } from 'react'
import Sidebar from './components/Layout/Sidebar'
import MainContent from './components/Layout/MainContent'
import './styles/globals.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <MainContent currentPage={currentPage} />
    </div>
  )
}

export default App