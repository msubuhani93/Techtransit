import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Header.css'

const Header = ({ showBack = false }) => {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-left">
        {showBack && (
          <button className="back-button" onClick={() => navigate(-1)}>
            ←
          </button>
        )}
        <div className="logo-section">
          <span className="logo">Deloitte.</span>
          <span className="portal-title">
            Tech Transit Portal
            <span className="dropdown-arrow">▼</span>
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
