import React from 'react'
import './TaskDetailModal.css'

const TaskDetailModal = ({ task, template, project, onClose }) => {
  if (!task) return null

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return '#34C759'
      case 'in progress': return '#FF9500'
      case 'pending': return '#8E8E93'
      default: return '#8E8E93'
    }
  }

  const getStatusBg = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return '#E8F5E9'
      case 'in progress': return '#FFF4E6'
      case 'pending': return '#F5F5F7'
      default: return '#F5F5F7'
    }
  }

  const hasIssues = task.notes && (
    task.notes.toLowerCase().includes('issue') ||
    task.notes.toLowerCase().includes('delay') ||
    task.notes.toLowerCase().includes('problem') ||
    task.notes.toLowerCase().includes('error')
  )

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="task-modal-header">
          <div>
            <h2>{task.name}</h2>
            <p className="task-id">{task.id}</p>
          </div>
          <button className="task-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="task-modal-body">
          <div className="task-info-grid">
            <div className="task-info-item">
              <label>Status</label>
              <span 
                className="task-status-badge"
                style={{
                  backgroundColor: getStatusBg(task.status),
                  color: getStatusColor(task.status)
                }}
              >
                {task.status || 'Pending'}
              </span>
            </div>

            <div className="task-info-item">
              <label>Project</label>
              <span>{project?.name || 'N/A'}</span>
            </div>

            <div className="task-info-item">
              <label>Template</label>
              <span>{template?.name || 'N/A'}</span>
            </div>

            <div className="task-info-item">
              <label>Team</label>
              <span>{task.team || 'Unassigned'}</span>
            </div>

            <div className="task-info-item">
              <label>Duration</label>
              <span>{task.duration} {task.unit || 'Hours'}</span>
            </div>

            <div className="task-info-item">
              <label>Execution Type</label>
              <span>{task.executionType || 'Sequence'}</span>
            </div>

            {task.dependentTask && (
              <div className="task-info-item">
                <label>Dependent Task</label>
                <span>{task.dependentTask}</span>
              </div>
            )}

            {task.actualDuration && (
              <div className="task-info-item">
                <label>Actual Duration</label>
                <span>{task.actualDuration} hours</span>
              </div>
            )}
          </div>

          {hasIssues && (
            <div className="task-alert-section">
              <div className="task-alert-header">
                <span className="task-alert-icon">⚠️</span>
                <h3>Issues & Comments</h3>
              </div>
              <div className="task-alert-content">
                <p>{task.notes}</p>
              </div>
            </div>
          )}

          {task.notes && !hasIssues && (
            <div className="task-notes-section">
              <h3>Notes & Comments</h3>
              <p>{task.notes}</p>
            </div>
          )}

          {!task.notes && (
            <div className="task-notes-section">
              <h3>Notes & Comments</h3>
            <p className="no-notes">No comments or notes from the team</p>
          </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskDetailModal
