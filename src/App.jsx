import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import CreateTask from './components/CreateTask'
import CreateTemplate from './components/CreateTemplate'
import CreateProject from './components/CreateProject'
import DisplayTasks from './components/DisplayTasks'
import DisplayTemplates from './components/DisplayTemplates'
import DisplayProjects from './components/DisplayProjects'
import EditProject from './components/EditProject'
import { DataProvider } from './context/DataContext'
import './App.css'

function App() {
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create/task" element={<CreateTask />} />
          <Route path="/create/template" element={<CreateTemplate />} />
          <Route path="/create/project" element={<CreateProject />} />
          <Route path="/display/tasks" element={<DisplayTasks />} />
          <Route path="/display/templates" element={<DisplayTemplates />} />
          <Route path="/display/projects" element={<DisplayProjects />} />
          <Route path="/edit/project/:id" element={<EditProject />} />
        </Routes>
      </Router>
    </DataProvider>
  )
}

export default App
