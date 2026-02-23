import { Route, Routes } from 'react-router-dom'
import './App.scss'
import ExercisePage from './pages/exercises/Exercises.page'
import SessionsPage from './pages/sessions/Sessions.page'
import DashboardPage from './pages/dashboard/Dashboard.page'
import NavBar from './components/navBar/NavBar.component'

function App() {

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/exercises" element={<ExercisePage />} />
      </Routes>
    </div>
  )
}

export default App
