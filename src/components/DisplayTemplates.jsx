import React, { useState } from 'react'
import { useData } from '../context/DataContext'
import Header from './Header'
import './DisplayTemplates.css'

const DisplayTemplates = () => {
  const { templates, projects } = useData()
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0] || null)
  const [activeTab, setActiveTab] = useState('general')

  const getProjectName = (projectId) => {
    const project = projects.find(p => p.id === projectId)
    return project ? project.name : 'N/A'
  }

  return (
    <div className="display-templates-page">
      <Header showBack />
      <div className="content-layout">
        <div className="sidebar">
          <h3>Template</h3>
          <div className="template-list">
            {templates.length === 0 ? (
              <p className="no-data-text">No templates found</p>
            ) : (
              templates.map(template => (
                <div
                  key={template.id}
                  className={`template-item ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className="template-id">{template.id}</div>
                  <div className="template-desc">{template.name}</div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="main-content">
          <h3>Detail</h3>
          {selectedTemplate ? (
            <>
              <div className="template-header">
                <div className="template-title">{selectedTemplate.name}</div>
                <div className="template-meta">
                  <span className="template-id-badge">{selectedTemplate.id}</span>
                  <span className="status-badge">Status: {selectedTemplate.status || 'Intro'}</span>
                </div>
              </div>
              <div className="tabs">
                <button
                  className={`tab ${activeTab === 'general' ? 'active' : ''}`}
                  onClick={() => setActiveTab('general')}
                >
                  🎯 General
                </button>
                <button
                  className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tasks')}
                >
                  ☰ Tasks
                </button>
              </div>
              <div className="tab-content">
                {activeTab === 'general' && (
                  <div className="general-info">
                    <p><strong>Created By:</strong> {selectedTemplate.createdBy || 'N/A'}</p>
                    <p><strong>Created On:</strong> {selectedTemplate.createdOn || 'N/A'}</p>
                    <p><strong>Project:</strong> {getProjectName(selectedTemplate.projectId)}</p>
                    <p><strong>Status:</strong> {selectedTemplate.status || 'Intro'}</p>
                  </div>
                )}
                {activeTab === 'tasks' && (
                  <div className="tasks-content">
                    <table className="tasks-table">
                      <thead>
                        <tr>
                          <th>Task ID</th>
                          <th>Task Name</th>
                          <th>Duration</th>
                          <th>Unit of Duration</th>
                          <th>Execution Type</th>
                          <th>Dependent Task</th>
                          <th>Team</th>
                          <th>Notes/Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(!selectedTemplate.tasks || selectedTemplate.tasks.length === 0) ? (
                          <tr>
                            <td colSpan="8" className="no-data">No data</td>
                          </tr>
                        ) : (
                          selectedTemplate.tasks.map(task => (
                            <tr key={task.id}>
                              <td>{task.id}</td>
                              <td>{task.name}</td>
                              <td>{task.duration}</td>
                              <td>{task.unit}</td>
                              <td>{task.executionType}</td>
                              <td>{task.dependentTask || '-'}</td>
                              <td>{task.team || '-'}</td>
                              <td>{task.notes || '-'}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <p>Select a template from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DisplayTemplates
