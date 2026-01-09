import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Header from './Header'
import './CreateTask.css'

const CreateTask = () => {
  const navigate = useNavigate()
  const { addTask, projects, templates } = useData()
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    projectId: '',
    templateId: '',
    duration: '',
    unit: 'Hours',
    executionType: 'Sequence',
    dependentTask: '',
    team: '',
    notes: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.id || !formData.description || !formData.projectId || !formData.templateId) {
      alert('Please fill in all required fields')
      return
    }

    addTask(
      {
        id: formData.id,
        name: formData.description,
        description: formData.description,
        duration: parseFloat(formData.duration) || 0,
        unit: formData.unit,
        executionType: formData.executionType,
        dependentTask: formData.dependentTask || null,
        team: formData.team,
        notes: formData.notes
      },
      formData.templateId,
      formData.projectId
    )

    alert('Task created successfully!')
    navigate('/')
  }

  const selectedProjectTemplates = formData.projectId
    ? templates.filter(t => t.projectId === formData.projectId)
    : []

  return (
    <div className="create-task-page">
      <Header showBack />
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Tasks</h2>
          </div>
          <form onSubmit={handleSubmit} className="modal-body">
            <div className="form-field">
              <label>
                <span className="required">*</span>ID:
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                placeholder="e.g., TASK001"
              />
            </div>
            <div className="form-field">
              <label>
                <span className="required">*</span>Description:
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                placeholder="Enter task description"
              />
            </div>
            <div className="form-field">
              <label>
                <span className="required">*</span>Project:
              </label>
              <select
                name="projectId"
                value={formData.projectId}
                onChange={handleChange}
                required
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>
                <span className="required">*</span>Template:
              </label>
              <select
                name="templateId"
                value={formData.templateId}
                onChange={handleChange}
                required
                disabled={!formData.projectId}
              >
                <option value="">Select Template</option>
                {selectedProjectTemplates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Duration:</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                step="0.5"
                min="0"
                placeholder="e.g., 4"
              />
            </div>
            <div className="form-field">
              <label>Unit of Duration:</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="Hours">Hours</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
              </select>
            </div>
            <div className="form-field">
              <label>Execution Type:</label>
              <select
                name="executionType"
                value={formData.executionType}
                onChange={handleChange}
              >
                <option value="Sequence">Sequence</option>
                <option value="Parallel">Parallel</option>
              </select>
            </div>
            <div className="form-field">
              <label>Dependent Task:</label>
              <input
                type="text"
                name="dependentTask"
                value={formData.dependentTask}
                onChange={handleChange}
                placeholder="Task ID"
              />
            </div>
            <div className="form-field">
              <label>Team:</label>
              <input
                type="text"
                name="team"
                value={formData.team}
                onChange={handleChange}
                placeholder="e.g., Infrastructure Team"
              />
            </div>
            <div className="form-field">
              <label>Notes/Comments:</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Additional notes..."
              />
            </div>
          </form>
          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="btn-create" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTask
