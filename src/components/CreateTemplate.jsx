import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Header from './Header'
import './CreateTemplate.css'

const CreateTemplate = () => {
  const navigate = useNavigate()
  const { addTemplate, addTask, projects } = useData()
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    projectId: '',
    tasks: []
  })
  const [newTask, setNewTask] = useState({
    id: '',
    name: '',
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

  const handleTaskChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value
    })
  }

  const handleAddTask = () => {
    if (!newTask.id || !newTask.name) {
      alert('Please fill in Task ID and Task Name')
      return
    }
    setFormData({
      ...formData,
      tasks: [...formData.tasks, { ...newTask }]
    })
    setNewTask({
      id: '',
      name: '',
      duration: '',
      unit: 'Hours',
      executionType: 'Sequence',
      dependentTask: '',
      team: '',
      notes: ''
    })
  }

  const handleRemoveTask = (index) => {
    setFormData({
      ...formData,
      tasks: formData.tasks.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.id || !formData.name || !formData.projectId) {
      alert('Please fill in all required fields')
      return
    }

    const template = addTemplate(
      {
        id: formData.id,
        name: formData.name,
        status: 'Intro',
        createdBy: 'USER',
        createdOn: new Date().toLocaleDateString('en-US')
      },
      formData.projectId
    )

    // Add all tasks
    formData.tasks.forEach(task => {
      addTask(
        {
          id: task.id,
          name: task.name,
          description: task.name,
          duration: parseFloat(task.duration) || 0,
          unit: task.unit,
          executionType: task.executionType,
          dependentTask: task.dependentTask || null,
          team: task.team,
          notes: task.notes
        },
        template.id,
        formData.projectId
      )
    })

    alert('Template created successfully!')
    navigate('/')
  }

  return (
    <div className="create-template-page">
      <Header showBack />
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Create Template</h2>
          </div>
          <form onSubmit={handleSubmit} className="modal-body">
            <div className="form-field">
              <label>
                <span className="required">*</span>Template ID:
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                placeholder="e.g., TMPL001"
              />
            </div>
            <div className="form-field">
              <label>
                <span className="required">*</span>Template Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter template name"
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

            <div className="tasks-section">
              <div className="tasks-header">
                <h3>Tasks</h3>
                <div className="task-actions">
                  <button type="button" className="icon-btn" onClick={handleAddTask}>+</button>
                  <button 
                    type="button" 
                    className="icon-btn"
                    onClick={() => {
                      const selected = formData.tasks.filter((_, i) => {
                        const checkbox = document.getElementById(`task-check-${i}`)
                        return checkbox && checkbox.checked
                      })
                      if (selected.length === 0) {
                        alert('Please select tasks to delete')
                        return
                      }
                      setFormData({
                        ...formData,
                        tasks: formData.tasks.filter((_, i) => {
                          const checkbox = document.getElementById(`task-check-${i}`)
                          return !checkbox || !checkbox.checked
                        })
                      })
                    }}
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="new-task-form">
                <div className="task-form-row">
                  <input
                    type="text"
                    name="id"
                    value={newTask.id}
                    onChange={handleTaskChange}
                    placeholder="Task ID"
                    className="task-input"
                  />
                  <input
                    type="text"
                    name="name"
                    value={newTask.name}
                    onChange={handleTaskChange}
                    placeholder="Task Name"
                    className="task-input"
                  />
                  <input
                    type="number"
                    name="duration"
                    value={newTask.duration}
                    onChange={handleTaskChange}
                    placeholder="Duration"
                    step="0.5"
                    className="task-input"
                  />
                  <select
                    name="unit"
                    value={newTask.unit}
                    onChange={handleTaskChange}
                    className="task-input"
                  >
                    <option value="Hours">Hours</option>
                    <option value="Days">Days</option>
                    <option value="Weeks">Weeks</option>
                  </select>
                  <select
                    name="executionType"
                    value={newTask.executionType}
                    onChange={handleTaskChange}
                    className="task-input"
                  >
                    <option value="Sequence">Sequence</option>
                    <option value="Parallel">Parallel</option>
                  </select>
                  <input
                    type="text"
                    name="dependentTask"
                    value={newTask.dependentTask}
                    onChange={handleTaskChange}
                    placeholder="Dependent Task"
                    className="task-input"
                  />
                  <input
                    type="text"
                    name="team"
                    value={newTask.team}
                    onChange={handleTaskChange}
                    placeholder="Team"
                    className="task-input"
                  />
                  <input
                    type="text"
                    name="notes"
                    value={newTask.notes}
                    onChange={handleTaskChange}
                    placeholder="Notes/Comments"
                    className="task-input"
                  />
                </div>
              </div>

              <div className="tasks-table-container">
                <table className="tasks-table">
                  <thead>
                    <tr>
                      <th></th>
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
                    {formData.tasks.length === 0 ? (
                      <tr>
                        <td colSpan="9" className="no-data">No data</td>
                      </tr>
                    ) : (
                      formData.tasks.map((task, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="checkbox"
                              id={`task-check-${index}`}
                            />
                          </td>
                          <td>{task.id}</td>
                          <td>{task.name}</td>
                          <td>{task.duration}</td>
                          <td>{task.unit}</td>
                          <td>{task.executionType}</td>
                          <td>{task.dependentTask || '-'}</td>
                          <td>{task.team}</td>
                          <td>{task.notes}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
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

export default CreateTemplate
