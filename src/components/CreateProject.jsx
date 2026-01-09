import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Header from './Header'
import './CreateProject.css'

const CreateProject = () => {
  const navigate = useNavigate()
  const { addProject, addTemplate, addTask } = useData()
  const [step, setStep] = useState(1)
  const [projectData, setProjectData] = useState({
    id: '',
    name: '',
    status: 'Planning',
    plannedStartDate: '',
    plannedEndDate: '',
    projectAdmin: ''
  })
  const [templates, setTemplates] = useState([])
  const [currentTemplate, setCurrentTemplate] = useState({
    id: '',
    name: '',
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

  const handleProjectChange = (e) => {
    setProjectData({
      ...projectData,
      [e.target.name]: e.target.value
    })
  }

  const handleNext = () => {
    if (step === 1) {
      if (!projectData.id || !projectData.name) {
        alert('Please fill in all required fields')
        return
      }
    }
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleAddTemplate = () => {
    if (!currentTemplate.id || !currentTemplate.name) {
      alert('Please fill in Template ID and Name')
      return
    }
    setTemplates([...templates, { ...currentTemplate }])
    setCurrentTemplate({
      id: '',
      name: '',
      tasks: []
    })
  }

  const handleAddTaskToTemplate = () => {
    if (!newTask.id || !newTask.name) {
      alert('Please fill in Task ID and Name')
      return
    }
    setCurrentTemplate({
      ...currentTemplate,
      tasks: [...currentTemplate.tasks, { ...newTask }]
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

  const handleSubmit = () => {
    if (templates.length === 0) {
      alert('Please add at least one template')
      return
    }

    const project = addProject({
      ...projectData,
      plannedStartDate: projectData.plannedStartDate || new Date().toISOString(),
      plannedEndDate: projectData.plannedEndDate || new Date().toISOString(),
      actualStartDate: null,
      actualEndDate: null,
      actualDuration: null,
      completionRate: 0,
      currentTask: 'Not Started'
    })

    templates.forEach(template => {
      const createdTemplate = addTemplate(
        {
          id: template.id,
          name: template.name,
          status: 'Intro',
          createdBy: 'USER',
          createdOn: new Date().toLocaleDateString('en-US')
        },
        project.id
      )

      template.tasks.forEach(task => {
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
          createdTemplate.id,
          project.id
        )
      })
    })

    alert('Project created successfully!')
    navigate('/')
  }

  return (
    <div className="create-project-page">
      <Header showBack />
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Main Project</h2>
          </div>

          <div className="progress-indicator">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <div className="step-label">Project Details</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <div className="step-label">Template Details</div>
            </div>
            <div className="progress-line"></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <div className="step-label">Tasks Details</div>
            </div>
          </div>

          <div className="modal-body">
            {step === 1 && (
              <div className="step-content">
                <h3>1. Project Details</h3>
                <div className="form-field">
                  <label>
                    <span className="required">*</span>Project ID:
                  </label>
                  <input
                    type="text"
                    name="id"
                    value={projectData.id}
                    onChange={handleProjectChange}
                    required
                    placeholder="e.g., PRJ001"
                  />
                </div>
                <div className="form-field">
                  <label>
                    <span className="required">*</span>Project Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={projectData.name}
                    onChange={handleProjectChange}
                    required
                    placeholder="Enter project name"
                  />
                </div>
                <div className="form-field">
                  <label>Status:</label>
                  <select
                    name="status"
                    value={projectData.status}
                    onChange={handleProjectChange}
                  >
                    <option value="Planning">Planning</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Planned Start Date:</label>
                  <input
                    type="datetime-local"
                    name="plannedStartDate"
                    value={projectData.plannedStartDate}
                    onChange={handleProjectChange}
                  />
                </div>
                <div className="form-field">
                  <label>Planned End Date:</label>
                  <input
                    type="datetime-local"
                    name="plannedEndDate"
                    value={projectData.plannedEndDate}
                    onChange={handleProjectChange}
                  />
                </div>
                <div className="form-field">
                  <label>Project Admin:</label>
                  <input
                    type="text"
                    name="projectAdmin"
                    value={projectData.projectAdmin}
                    onChange={handleProjectChange}
                    placeholder="Enter admin name"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="step-content">
                <h3>2. Template Details</h3>
                <div className="template-form">
                  <div className="form-field">
                    <label>
                      <span className="required">*</span>Template ID:
                    </label>
                    <input
                      type="text"
                      value={currentTemplate.id}
                      onChange={(e) => setCurrentTemplate({ ...currentTemplate, id: e.target.value })}
                      placeholder="e.g., TMPL001"
                    />
                  </div>
                  <div className="form-field">
                    <label>
                      <span className="required">*</span>Template Name:
                    </label>
                    <input
                      type="text"
                      value={currentTemplate.name}
                      onChange={(e) => setCurrentTemplate({ ...currentTemplate, name: e.target.value })}
                      placeholder="Enter template name"
                    />
                  </div>
                  <button type="button" className="btn-add" onClick={handleAddTemplate}>
                    Add Template
                  </button>
                </div>
                <div className="templates-list">
                  <h4>Added Templates:</h4>
                  {templates.length === 0 ? (
                    <p className="no-data-text">No templates added yet</p>
                  ) : (
                    <ul>
                      {templates.map((t, idx) => (
                        <li key={idx}>{t.id} - {t.name}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="step-content">
                <h3>3. Tasks Details</h3>
                <div className="template-selector">
                  <label>Select Template:</label>
                  <select
                    value={currentTemplate.id}
                    onChange={(e) => {
                      const selected = templates.find(t => t.id === e.target.value)
                      setCurrentTemplate(selected || { id: '', name: '', tasks: [] })
                    }}
                  >
                    <option value="">Select a template</option>
                    {templates.map((t, idx) => (
                      <option key={idx} value={t.id}>{t.id} - {t.name}</option>
                    ))}
                  </select>
                </div>
                {currentTemplate.id && (
                  <>
                    <div className="task-form">
                      <div className="form-row">
                        <input
                          type="text"
                          placeholder="Task ID"
                          value={newTask.id}
                          onChange={(e) => setNewTask({ ...newTask, id: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Task Name"
                          value={newTask.name}
                          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                        />
                        <input
                          type="number"
                          placeholder="Duration"
                          value={newTask.duration}
                          onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
                          step="0.5"
                        />
                        <select
                          value={newTask.unit}
                          onChange={(e) => setNewTask({ ...newTask, unit: e.target.value })}
                        >
                          <option value="Hours">Hours</option>
                          <option value="Days">Days</option>
                          <option value="Weeks">Weeks</option>
                        </select>
                        <select
                          value={newTask.executionType}
                          onChange={(e) => setNewTask({ ...newTask, executionType: e.target.value })}
                        >
                          <option value="Sequence">Sequence</option>
                          <option value="Parallel">Parallel</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Dependent Task"
                          value={newTask.dependentTask}
                          onChange={(e) => setNewTask({ ...newTask, dependentTask: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Team"
                          value={newTask.team}
                          onChange={(e) => setNewTask({ ...newTask, team: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="Notes"
                          value={newTask.notes}
                          onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                        />
                        <button type="button" className="btn-add-task" onClick={handleAddTaskToTemplate}>
                          Add Task
                        </button>
                      </div>
                    </div>
                    <div className="tasks-list">
                      <h4>Tasks for {currentTemplate.name}:</h4>
                      {currentTemplate.tasks.length === 0 ? (
                        <p className="no-data-text">No tasks added yet</p>
                      ) : (
                        <table className="tasks-preview-table">
                          <thead>
                            <tr>
                              <th>Task ID</th>
                              <th>Task Name</th>
                              <th>Duration</th>
                              <th>Unit</th>
                              <th>Team</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentTemplate.tasks.map((task, idx) => (
                              <tr key={idx}>
                                <td>{task.id}</td>
                                <td>{task.name}</td>
                                <td>{task.duration}</td>
                                <td>{task.unit}</td>
                                <td>{task.team}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
              Cancel
            </button>
            {step > 1 && (
              <button type="button" className="btn-secondary" onClick={() => setStep(step - 1)}>
                Previous
              </button>
            )}
            {step < 3 ? (
              <button type="button" className="btn-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="button" className="btn-create" onClick={handleSubmit}>
                Create
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateProject
