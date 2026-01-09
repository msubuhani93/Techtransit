import React from 'react'
import { useData } from '../context/DataContext'
import Header from './Header'
import './DisplayTasks.css'

const DisplayTasks = () => {
  const { tasks, projects, templates } = useData()

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    return project ? project.name : 'N/A'
  }

  const getTemplateName = (templateId) => {
    const template = templates.find(t => t.id === templateId)
    return template ? template.name : 'N/A'
  }

  return (
    <div className="display-tasks-page">
      <Header showBack />
      <div className="content">
        <div className="page-header">
          <h1>Display Tasks</h1>
        </div>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Task ID</th>
                <th>Task Name</th>
                <th>Project</th>
                <th>Template</th>
                <th>Duration</th>
                <th>Unit</th>
                <th>Execution Type</th>
                <th>Dependent Task</th>
                <th>Team</th>
                <th>Status</th>
                <th>Notes/Comments</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td colSpan="11" className="no-data">No tasks found</td>
                </tr>
              ) : (
                tasks.map(task => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>{getProjectName(task.projectId)}</td>
                    <td>{getTemplateName(task.templateId)}</td>
                    <td>{task.duration}</td>
                    <td>{task.unit}</td>
                    <td>{task.executionType}</td>
                    <td>{task.dependentTask || '-'}</td>
                    <td>{task.team || '-'}</td>
                    <td>
                      <span className={`status-badge status-${(task.status || 'pending').toLowerCase().replace(' ', '-')}`}>
                        {task.status || 'Pending'}
                      </span>
                    </td>
                    <td>{task.notes || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DisplayTasks
