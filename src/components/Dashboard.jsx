import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Header from './Header'
import TaskDetailModal from './TaskDetailModal'
import './Dashboard.css'
import { format, differenceInHours, differenceInDays } from 'date-fns'

const Dashboard = () => {
  const navigate = useNavigate()
  const { projects } = useData()
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const projectStats = useMemo(() => {
    const stats = {
      total: projects.length,
      inProgress: projects.filter(p => p.status === 'In Progress').length,
      planning: projects.filter(p => p.status === 'Planning').length,
      onHold: projects.filter(p => p.status === 'On Hold').length,
      totalTemplates: 0,
      totalTasks: 0,
      delayedTasks: 0,
      atRiskTasks: 0
    }

    projects.forEach(project => {
      stats.totalTemplates += project.templates?.length || 0
      project.templates?.forEach(template => {
        stats.totalTasks += template.tasks?.length || 0
        template.tasks?.forEach(task => {
          if (task.status === 'In Progress' && task.actualDuration && task.duration) {
            const expectedHours = task.unit === 'Days' ? task.duration * 24 : 
                                 task.unit === 'Weeks' ? task.duration * 168 : task.duration
            if (task.actualDuration > expectedHours) {
              stats.delayedTasks++
            } else if (task.actualDuration > expectedHours * 0.8) {
              stats.atRiskTasks++
            }
          }
        })
      })
    })

    return stats
  }, [projects])

  const getTaskStatus = (task) => {
    if (!task.actualDuration || !task.duration) return 'normal'
    const expectedHours = task.unit === 'Days' ? task.duration * 24 : 
                         task.unit === 'Weeks' ? task.duration * 168 : task.duration
    if (task.actualDuration > expectedHours) return 'delayed'
    if (task.actualDuration > expectedHours * 0.8) return 'at-risk'
    return 'normal'
  }

  const getAllTasks = useMemo(() => {
    const allTasks = []
    projects.forEach(project => {
      project.templates?.forEach(template => {
        template.tasks?.forEach(task => {
          allTasks.push({
            ...task,
            template,
            project,
            statusType: getTaskStatus(task)
          })
        })
      })
    })
    return allTasks.sort((a, b) => {
      const dateA = new Date(a.project?.plannedStartDate || 0)
      const dateB = new Date(b.project?.plannedStartDate || 0)
      return dateA - dateB
    })
  }, [projects])

  const handleTaskClick = (task, template, project) => {
    setSelectedTask({ task, template, project })
  }

  const calculateProjectProgress = (project) => {
    if (!project.templates) return 0
    let totalTasks = 0
    let completedTasks = 0
    project.templates.forEach(template => {
      template.tasks?.forEach(task => {
        totalTasks++
        if (task.status === 'Completed') completedTasks++
      })
    })
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  }

  const getTaskPosition = (task, project) => {
    if (!project.plannedStartDate || !task.duration) return { left: 0, width: 100 }
    
    const projectStart = new Date(project.plannedStartDate)
    const projectEnd = new Date(project.plannedEndDate)
    const projectDuration = projectEnd - projectStart
    
    // Calculate task start based on dependencies
    let taskStart = projectStart
    if (task.dependentTask) {
      const dependent = getAllTasks.find(t => t.task.id === task.dependentTask && t.project.id === project.id)
      if (dependent) {
        const depHours = dependent.task.unit === 'Days' ? dependent.task.duration * 24 :
                        dependent.task.unit === 'Weeks' ? dependent.task.duration * 168 : dependent.task.duration
        taskStart = new Date(projectStart.getTime() + (depHours * 60 * 60 * 1000))
      }
    }
    
    const taskDuration = task.unit === 'Days' ? task.duration * 24 :
                        task.unit === 'Weeks' ? task.duration * 168 : task.duration
    const taskDurationMs = taskDuration * 60 * 60 * 1000
    
    const left = ((taskStart - projectStart) / projectDuration) * 100
    const width = (taskDurationMs / projectDuration) * 100
    
    return { left: Math.max(0, left), width: Math.min(100 - left, width) }
  }

  return (
    <div className="dashboard-page">
      <Header showBack />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>Project Cutover Overview</h1>
            <p className="dashboard-subtitle">Track all projects, templates, and tasks in one place</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{projectStats.total}</div>
            <div className="stat-label">Total Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{projectStats.inProgress}</div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{projectStats.totalTemplates}</div>
            <div className="stat-label">Templates</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{projectStats.totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          {projectStats.delayedTasks > 0 && (
            <div className="stat-card warning">
              <div className="stat-value">{projectStats.delayedTasks}</div>
              <div className="stat-label">Delayed Tasks</div>
            </div>
          )}
          {projectStats.atRiskTasks > 0 && (
            <div className="stat-card at-risk">
              <div className="stat-value">{projectStats.atRiskTasks}</div>
              <div className="stat-label">At Risk Tasks</div>
            </div>
          )}
        </div>

        <div className="timeline-container">
          <h2 className="timeline-title">Project Timeline</h2>
          {projects.map(project => {
            const progress = calculateProjectProgress(project)
            return (
              <div key={project.id} className="timeline-project-card">
                <div className="project-header-timeline">
                  <div className="project-info">
                    <h3>{project.name}</h3>
                    <span className="project-meta">{project.id} • {project.projectAdmin}</span>
                  </div>
                  <div className="project-status-right">
                    <span className={`status-badge status-${project.status.toLowerCase().replace(' ', '-')}`}>
                      {project.status}
                    </span>
                    <div className="progress-indicator">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-axis">
                    <div className="timeline-start-label">
                      {format(new Date(project.plannedStartDate), 'MMM dd, yyyy')}
                    </div>
                    <div className="timeline-end-label">
                      {format(new Date(project.plannedEndDate), 'MMM dd, yyyy')}
                    </div>
                  </div>

                  <div className="templates-timeline">
                    {project.templates?.map(template => (
                      <div key={template.id} className="template-timeline-group">
                        <div className="template-label">{template.name}</div>
                        <div className="tasks-timeline-row">
                          {template.tasks?.map(task => {
                            const position = getTaskPosition(task, project)
                            const statusType = getTaskStatus(task)
                            const hasIssues = task.notes && (
                              task.notes.toLowerCase().includes('issue') ||
                              task.notes.toLowerCase().includes('delay') ||
                              task.notes.toLowerCase().includes('problem') ||
                              task.notes.toLowerCase().includes('error')
                            )
                            
                            return (
                              <div
                                key={task.id}
                                className={`task-timeline-item ${statusType} ${task.status?.toLowerCase() || 'pending'} ${hasIssues ? 'has-issues' : ''}`}
                                style={{
                                  left: `${position.left}%`,
                                  width: `${position.width}%`
                                }}
                                onClick={() => handleTaskClick(task, template, project)}
                                title={`${task.name} - Click to view details`}
                              >
                                <div className="task-timeline-content">
                                  <div className="task-timeline-name">{task.name}</div>
                                  <div className="task-timeline-meta">
                                    <span>{task.team || 'Unassigned'}</span>
                                    {hasIssues && <span className="task-alert-icon">⚠️</span>}
                                  </div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
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

export default Dashboard
