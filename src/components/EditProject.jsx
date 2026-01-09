import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Header from './Header'
import TaskDetailModal from './TaskDetailModal'
import './EditProject.css'
import { format } from 'date-fns'

const EditProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { projects, updateProject } = useData()
  const [project, setProject] = useState(null)
  const [formData, setFormData] = useState({})
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    const found = projects.find(p => p.id === id)
    if (found) {
      setProject(found)
      setFormData({
        name: found.name,
        status: found.status,
        plannedStartDate: found.plannedStartDate ? format(new Date(found.plannedStartDate), "yyyy-MM-dd'T'HH:mm") : '',
        plannedEndDate: found.plannedEndDate ? format(new Date(found.plannedEndDate), "yyyy-MM-dd'T'HH:mm") : '',
        actualStartDate: found.actualStartDate ? format(new Date(found.actualStartDate), "yyyy-MM-dd'T'HH:mm") : '',
        actualEndDate: found.actualEndDate ? format(new Date(found.actualEndDate), "yyyy-MM-dd'T'HH:mm") : '',
        projectAdmin: found.projectAdmin,
        currentTask: found.currentTask,
        completionRate: found.completionRate
      })
    }
  }, [id, projects])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    updateProject(id, {
      ...formData,
      plannedStartDate: formData.plannedStartDate ? new Date(formData.plannedStartDate).toISOString() : null,
      plannedEndDate: formData.plannedEndDate ? new Date(formData.plannedEndDate).toISOString() : null,
      actualStartDate: formData.actualStartDate ? new Date(formData.actualStartDate).toISOString() : null,
      actualEndDate: formData.actualEndDate ? new Date(formData.actualEndDate).toISOString() : null,
      completionRate: parseInt(formData.completionRate) || 0
    })
    alert('Project updated successfully!')
    navigate('/')
  }

  const calculateTemplateProgress = (template) => {
    if (!template.tasks || template.tasks.length === 0) return { completed: 0, total: 0, percentage: 0 }
    const total = template.tasks.length
    const completed = template.tasks.filter(task => task.status === 'Completed').length
    const inProgress = template.tasks.filter(task => task.status === 'In Progress').length
    const percentage = total > 0 ? Math.round(((completed + inProgress) / total) * 100) : 0
    return { completed, inProgress, total, percentage }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return '#34C759'
      case 'in progress': return '#007AFF'
      case 'pending': return '#86868B'
      default: return '#86868B'
    }
  }

  const getStatusBg = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return '#E8F5E9'
      case 'in progress': return '#E3F2FD'
      case 'pending': return '#F5F5F7'
      default: return '#F5F5F7'
    }
  }

  if (!project) {
    return (
      <div className="edit-project-page">
        <Header showBack />
        <div className="content">
          <p>Project not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-project-page">
      <Header showBack />
      <div className="content">
        <div className="page-header">
          <div>
            <h1>{project.name}</h1>
            <p className="project-subtitle">Project ID: {project.id}</p>
          </div>
        </div>

        <div className="edit-form-container">
          <div className="form-section">
            <h3>Project Information</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Project ID</label>
                <input type="text" value={project.id} disabled />
              </div>
              <div className="form-field">
                <label>Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="form-field">
                <label>Project Admin</label>
                <input
                  type="text"
                  name="projectAdmin"
                  value={formData.projectAdmin}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Current Task</label>
                <input
                  type="text"
                  name="currentTask"
                  value={formData.currentTask}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Completion Rate (%)</label>
                <input
                  type="number"
                  name="completionRate"
                  value={formData.completionRate}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Dates</h3>
            <div className="form-grid">
              <div className="form-field">
                <label>Planned Start Date/Time</label>
                <input
                  type="datetime-local"
                  name="plannedStartDate"
                  value={formData.plannedStartDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Planned End Date/Time</label>
                <input
                  type="datetime-local"
                  name="plannedEndDate"
                  value={formData.plannedEndDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Actual Start Date/Time</label>
                <input
                  type="datetime-local"
                  name="actualStartDate"
                  value={formData.actualStartDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Actual End Date/Time</label>
                <input
                  type="datetime-local"
                  name="actualEndDate"
                  value={formData.actualEndDate}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="form-section tasks-list-section">
            <h3>Template Progress & Tasks</h3>
            <div className="templates-container">
              {!project.templates || project.templates.length === 0 ? (
                <div className="no-tasks">No templates found</div>
              ) : (
                project.templates.map((template, templateIndex) => {
                  const templateProgress = calculateTemplateProgress(template)
                  
                  return (
                    <div key={template.id} className="template-group">
                      <div className="template-header">
                        <div className="template-header-left">
                          <h4 className="template-name">{template.name}</h4>
                          <span className="template-id-badge">{template.id}</span>
                        </div>
                        <div className="template-progress-section">
                          <div className="template-progress-bar-container">
                            <div className="template-progress-bar">
                              <div 
                                className="template-progress-fill" 
                                style={{ width: `${templateProgress.percentage}%` }}
                              ></div>
                            </div>
                            <span className="template-progress-text">
                              {templateProgress.completed + templateProgress.inProgress}/{templateProgress.total} Tasks
                            </span>
                          </div>
                          <span className={`template-status-badge status-${(template.status || 'intro').toLowerCase()}`}>
                            {template.status || 'Intro'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="template-tasks-container">
                        {!template.tasks || template.tasks.length === 0 ? (
                          <div className="no-tasks-in-template">No tasks in this template</div>
                        ) : (
                          template.tasks.map((task, taskIndex) => {
                            const hasIssues = task.notes && (
                              task.notes.toLowerCase().includes('issue') ||
                              task.notes.toLowerCase().includes('delay') ||
                              task.notes.toLowerCase().includes('problem') ||
                              task.notes.toLowerCase().includes('error')
                            )
                            
                            return (
                              <div
                                key={task.id}
                                className={`task-list-item ${task.status?.toLowerCase() || 'pending'} ${hasIssues ? 'has-issues' : ''}`}
                                onClick={() => setSelectedTask({ task, template, project })}
                              >
                                <div className="task-list-number">{taskIndex + 1}</div>
                                <div className="task-list-content">
                                  <div className="task-list-header">
                                    <div className="task-list-name">{task.name}</div>
                                    <div 
                                      className="task-list-status"
                                      style={{
                                        backgroundColor: getStatusBg(task.status),
                                        color: getStatusColor(task.status)
                                      }}
                                    >
                                      {task.status || 'Pending'}
                                    </div>
                                  </div>
                                  <div className="task-list-details">
                                    <span className="task-detail-item">
                                      <strong>ID:</strong> {task.id}
                                    </span>
                                    <span className="task-detail-item">
                                      <strong>Team:</strong> {task.team || 'Unassigned'}
                                    </span>
                                    <span className="task-detail-item">
                                      <strong>Duration:</strong> {task.duration} {task.unit || 'Hours'}
                                    </span>
                                    {hasIssues && (
                                      <span className="task-detail-item issue-badge">
                                        ⚠️ Issues
                                      </span>
                                    )}
                                  </div>
                                  {task.notes && (
                                    <div className="task-list-notes">
                                      {task.notes}
                                    </div>
                                  )}
                                </div>
                                <div className="task-list-arrow">→</div>
                              </div>
                            )
                          })
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div className="form-actions">
            <button className="btn-cancel" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button className="btn-save" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {selectedTask && (
        <TaskDetailModal
          task={selectedTask.task}
          template={selectedTask.template}
          project={selectedTask.project}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  )
}

export default EditProject
