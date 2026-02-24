import { Route, Routes } from 'react-router-dom'
import './App.scss'
import ExercisePage from './pages/exercises/Exercises.page'
import SessionsPage from './pages/sessions/Sessions.page'
import DashboardPage from './pages/dashboard/Dashboard.page'
import NavBar from './components/navBar/NavBar.component'
import LoginForm from './components/loginForm/LoginForm.component'
import { useState } from 'react'
import SessionPage from './pages/session/Session.page'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false)

  const handleLogin = () => setIsLoggedIn(true)

  // when not logged in, the only thing rendered will be the form
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="/sessions/:sessionId" element={<SessionPage />} />
        <Route path="/exercises" element={<ExercisePage />} />
      </Routes>
    </div>
  )
}

export default App
