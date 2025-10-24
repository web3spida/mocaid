import React from 'react'

const Logo = ({ className = 'w-8 h-8' }) => (
  <svg
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main circular background */}
    <circle cx="20" cy="20" r="18" fill="url(#veyra-main-gradient)" stroke="url(#veyra-border-gradient)" strokeWidth="2"/>
    
    {/* Inner geometric pattern - representing blockchain/network */}
    <g opacity="0.9">
      {/* Central hexagon - core identity */}
      <path d="M20 8l6 3.5v7L20 22l-6-3.5v-7L20 8z" fill="rgba(255,255,255,0.95)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
      
      {/* Verification checkmark in center */}
      <circle cx="20" cy="15.5" r="3" fill="#10B981"/>
      <path d="M18.5 15.5l1.2 1.2 2.3-2.3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* Network nodes around the hexagon */}
      <circle cx="12" cy="25" r="2.5" fill="rgba(139, 92, 246, 0.8)"/>
      <circle cx="28" cy="25" r="2.5" fill="rgba(14, 165, 233, 0.8)"/>
      <circle cx="20" cy="32" r="2.5" fill="rgba(16, 185, 129, 0.8)"/>
      
      {/* Connection lines */}
      <line x1="20" y1="22" x2="12" y2="25" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="22" x2="28" y2="25" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="22" x2="20" y2="32" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
      
      {/* Small verification badges on nodes */}
      <circle cx="12" cy="25" r="1" fill="#fff"/>
      <circle cx="28" cy="25" r="1" fill="#fff"/>
      <circle cx="20" cy="32" r="1" fill="#fff"/>
    </g>
    
    {/* Outer glow effect */}
    <circle cx="20" cy="20" r="19" fill="none" stroke="url(#veyra-glow)" strokeWidth="0.5" opacity="0.6"/>
    
    <defs>
      {/* Main gradient for the logo background */}
      <linearGradient id="veyra-main-gradient" x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#8B5CF6"/>
        <stop offset="35%" stopColor="#6366F1"/>
        <stop offset="65%" stopColor="#0EA5E9"/>
        <stop offset="100%" stopColor="#10B981"/>
      </linearGradient>
      
      {/* Border gradient */}
      <linearGradient id="veyra-border-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)"/>
        <stop offset="50%" stopColor="rgba(255,255,255,0.1)"/>
        <stop offset="100%" stopColor="rgba(255,255,255,0.3)"/>
      </linearGradient>
      
      {/* Glow effect */}
      <linearGradient id="veyra-glow" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="rgba(139, 92, 246, 0.8)"/>
        <stop offset="50%" stopColor="rgba(14, 165, 233, 0.6)"/>
        <stop offset="100%" stopColor="rgba(16, 185, 129, 0.8)"/>
      </linearGradient>
    </defs>
  </svg>
)

export default Logo