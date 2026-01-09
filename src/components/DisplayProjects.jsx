import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Header from './Header'
import './DisplayProjects.css'
import { format } from 'date-fns'

const DisplayProjects = () => {
  const navigate = useNavigate()
  const { projects } = useData()

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      return format(new Date(dateString), 'MM/dd/yyyy HH:mm')
    } catch {
      return dateString
    }
  }

  return (
    <div className="display-projects-page">
      <Header showBack />
      <div className="content">
        <div className="page-header">
          <h1>Display Projects</h1>
        </div>
        <div className="projects-grid">
          {projects.length === 0 ? (
            <div className="no-data">No projects found</div>
          ) : (
            projects.map(project => (
              <div key={project.id} className="project-card" onClick={() => navigate(`/edit/project/${project.id}`)}>
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
                <div className="project-info">
                  <p><strong>Project ID:</strong> {project.id}</p>
                  <p><strong>Admin:</strong> {project.projectAdmin}</p>
                  <p><strong>Planned Start:</strong> {formatDateTime(project.plannedStartDate)}</p>
                  <p><strong>Planned End:</strong> {formatDateTime(project.plannedEndDate)}</p>
                  <p><strong>Current Task:</strong> {project.currentTask}</p>
                  <div className="completion-section">
                    <strong>Completion:</strong>
                    <div className="completion-bar">
                      <div 
                        className="completion-fill" 
                        style={{ width: `${project.completionRate}%` }}
                      ></div>
                      <span className="completion-text">{project.completionRate}%</span>
                    </div>
                  </div>
                  <p><strong>Templates:</strong> {project.templates?.length || 0}</p>
                  <p><strong>Total Tasks:</strong> {
                    project.templates?.reduce((sum, t) => sum + (t.tasks?.length || 0), 0) || 0
                  }</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DisplayProjects
