import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Header from './Header'
import './LandingPage.css'
import { format } from 'date-fns'

const LandingPage = () => {
  const navigate = useNavigate()
  const { projects } = useData()
  const [filters, setFilters] = useState({
    projectName: '',
    status: '',
    startDate: '2024-12-01',
    endDate: '2026-01-08'
  })
  const [displayTab, setDisplayTab] = useState('projects')

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesName = !filters.projectName || 
        project.name.toLowerCase().includes(filters.projectName.toLowerCase())
      const matchesStatus = !filters.status || project.status === filters.status
      const matchesStartDate = !filters.startDate || 
        new Date(project.plannedStartDate) >= new Date(filters.startDate)
      const matchesEndDate = !filters.endDate || 
        new Date(project.plannedEndDate) <= new Date(filters.endDate)
      
      return matchesName && matchesStatus && matchesStartDate && matchesEndDate
    })
  }, [projects, filters])

  const kpis = useMemo(() => {
    const totalProjects = projects.length
    const inProgress = projects.filter(p => p.status === 'In Progress').length
    const totalTasks = projects.reduce((sum, p) => 
      sum + (p.templates?.reduce((tSum, t) => tSum + (t.tasks?.length || 0), 0) || 0), 0
    )
    const completedTasks = projects.reduce((sum, p) => 
      sum + (p.templates?.reduce((tSum, t) => 
        tSum + (t.tasks?.filter(task => task.status === 'Completed').length || 0), 0) || 0), 0
    )
    const avgCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

    return {
      totalProjects,
      inProgress,
      totalTasks,
      avgCompletion
    }
  }, [projects])

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const handleClear = () => {
    setFilters({
      projectName: '',
      status: '',
      startDate: '2024-12-01',
      endDate: '2026-01-08'
    })
  }

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      return format(new Date(dateString), 'MM/dd/yyyy HH:mm')
    } catch {
      return dateString
    }
  }

  const statusOptions = ['All', 'In Progress', 'Planning', 'Completed', 'On Hold']

  return (
    <div className="landing-page">
      <Header />
      <div className="content">
        {/* Minimal KPI Section - Expanded */}
        <div className="kpi-section-minimal">
          <div className="kpi-item">
            <div className="kpi-number">{kpis.totalProjects}</div>
            <div className="kpi-label-minimal">Projects</div>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item">
            <div className="kpi-number">{kpis.inProgress}</div>
            <div className="kpi-label-minimal">Active</div>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item">
            <div className="kpi-number">{kpis.totalTasks}</div>
            <div className="kpi-label-minimal">Tasks</div>
          </div>
          <div className="kpi-divider"></div>
          <div className="kpi-item">
            <div className="kpi-number">{kpis.avgCompletion}%</div>
            <div className="kpi-label-minimal">Complete</div>
          </div>
        </div>

        <div className="filter-panel">
          <div className="filter-row">
            <div className="filter-field">
              <label>Project Name</label>
              <input
                type="text"
                value={filters.projectName}
                onChange={(e) => handleFilterChange('projectName', e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div className="filter-field">
              <label>Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="">All</option>
                {statusOptions.filter(s => s !== 'All').map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <div className="filter-field">
              <label>Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
              />
            </div>
            <div className="filter-field">
              <label>End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-actions">
            <button className="btn-primary">Go</button>
          </div>
        </div>

        <div className="project-list-section">
          <div className="section-header">
            <h2>Projects</h2>
            <div className="section-actions">
              <div className="action-button-wrapper">
                <button 
                  className="action-button"
                  onClick={() => {
                    const menu = document.getElementById('create-menu')
                    if (menu) {
                      menu.style.display = menu.style.display === 'block' ? 'none' : 'block'
                    }
                  }}
                >
                  Create
                  <span className="dropdown-icon">▼</span>
                </button>
                <div id="create-menu" className="actions-menu">
                  <button onClick={() => navigate('/create/task')}>Create Task</button>
                  <button onClick={() => navigate('/create/template')}>Create Template</button>
                  <button onClick={() => navigate('/create/project')}>Create Project</button>
                </div>
              </div>
              <div className="display-tabs">
                <button 
                  className={`display-tab ${displayTab === 'projects' ? 'active' : ''}`}
                  onClick={() => setDisplayTab('projects')}
                >
                  Projects
                </button>
                <button 
                  className={`display-tab ${displayTab === 'templates' ? 'active' : ''}`}
                  onClick={() => setDisplayTab('templates')}
                >
                  Templates
                </button>
                <button 
                  className={`display-tab ${displayTab === 'tasks' ? 'active' : ''}`}
                  onClick={() => setDisplayTab('tasks')}
                >
                  Tasks
                </button>
              </div>
            </div>
          </div>

          {displayTab === 'projects' && (
            <div className="table-container">
              <table className="project-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Status</th>
                    <th>Planned Start</th>
                    <th>Planned End</th>
                    <th>Actual Start</th>
                    <th>Actual End</th>
                    <th>Duration</th>
                    <th>Progress</th>
                    <th>Admin</th>
                    <th>Current Task</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="no-data">No data</td>
                    </tr>
                  ) : (
                    filteredProjects.map(project => (
                      <tr key={project.id} onClick={() => navigate(`/edit/project/${project.id}`)}>
                        <td className="project-name-cell">
                          <div className="project-name">{project.name}</div>
                          <div className="project-id-small">{project.id}</div>
                        </td>
                        <td>
                          <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                            {project.status}
                          </span>
                        </td>
                        <td>{formatDateTime(project.plannedStartDate)}</td>
                        <td>{formatDateTime(project.plannedEndDate)}</td>
                        <td>{formatDateTime(project.actualStartDate)}</td>
                        <td>{formatDateTime(project.actualEndDate)}</td>
                        <td>{project.actualDuration || 'N/A'}</td>
                        <td>
                          <div className="progress-cell">
                            <div className="completion-bar">
                              <div 
                                className="completion-fill" 
                                style={{ width: `${project.completionRate}%` }}
                              ></div>
                            </div>
                            <span className="completion-percent">{project.completionRate}%</span>
                          </div>
                        </td>
                        <td>{project.projectAdmin}</td>
                        <td>{project.currentTask}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {displayTab === 'templates' && (
            <div className="table-container">
              <table className="project-table">
                <thead>
                  <tr>
                    <th>Template ID</th>
                    <th>Template Name</th>
                    <th>Project</th>
                    <th>Status</th>
                    <th>Tasks</th>
                    <th>Created By</th>
                    <th>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.flatMap(p => p.templates?.map(t => ({ ...t, projectName: p.name })) || []).length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data">No templates found</td>
                    </tr>
                  ) : (
                    projects.flatMap(p => p.templates?.map(t => ({ ...t, projectName: p.name })) || []).map(template => (
                      <tr key={template.id} onClick={() => navigate('/display/templates')}>
                        <td>{template.id}</td>
                        <td>{template.name}</td>
                        <td>{template.projectName}</td>
                        <td>
                          <span className={`status-badge status-${(template.status || 'intro').toLowerCase()}`}>
                            {template.status || 'Intro'}
                          </span>
                        </td>
                        <td>{template.tasks?.length || 0}</td>
                        <td>{template.createdBy || 'N/A'}</td>
                        <td>{template.createdOn || 'N/A'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {displayTab === 'tasks' && (
            <div className="table-container">
              <table className="project-table">
                <thead>
                  <tr>
                    <th>Task ID</th>
                    <th>Task Name</th>
                    <th>Project</th>
                    <th>Template</th>
                    <th>Team</th>
                    <th>Status</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.flatMap(p => 
                    p.templates?.flatMap(t => 
                      t.tasks?.map(task => ({ ...task, projectName: p.name, templateName: t.name })) || []
                    ) || []
                  ).length === 0 ? (
                    <tr>
                      <td colSpan="7" className="no-data">No tasks found</td>
                    </tr>
                  ) : (
                    projects.flatMap(p => 
                      p.templates?.flatMap(t => 
                        t.tasks?.map(task => ({ ...task, projectName: p.name, templateName: t.name })) || []
                      ) || []
                    ).map(task => (
                      <tr key={task.id} onClick={() => navigate('/display/tasks')}>
                        <td>{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.projectName}</td>
                        <td>{task.templateName}</td>
                        <td>{task.team || 'Unassigned'}</td>
                        <td>
                          <span className={`status-badge status-${(task.status || 'pending').toLowerCase().replace(' ', '-')}`}>
                            {task.status || 'Pending'}
                          </span>
                        </td>
                        <td>{task.duration} {task.unit || 'Hours'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LandingPage
