import React from 'react'

const Logo = ({ className = 'w-8 h-8' }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shield background with reward elements */}
    <path
      d="M16 2L28 6v10c0 8.837-7.163 16-16 16S4 24.837 4 16V6L16 2z"
      fill="url(# Verya-gradient)"
    />
    {/* Credential badge */}
    <rect x="8" y="9" width="16" height="10" rx="2" fill="#fff" fillOpacity="0.95" />
    {/* Verification checkmark */}
    <circle cx="12" cy="14" r="2" fill="#10B981" />
    <path d="M10.5 14l1 1 2-2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Reward star */}
    <path d="M20 11l1.5 3 3 .5-2.5 2 .5 3-2.5-1.5L17 19l.5-3-2.5-2 3-.5L20 11z" fill="#F59E0B" />
    {/* Data lines */}
    <line x1="15" y1="16" x2="21" y2="16" stroke="#6B7280" strokeWidth="1" strokeLinecap="round" />
    <line x1="15" y1="18" x2="19" y2="18" stroke="#6B7280" strokeWidth="1" strokeLinecap="round" />
    <defs>
      <linearGradient id=" Verya-gradient" x1="6" y1="2" x2="26" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#8B5CF6" />
        <stop offset="0.5" stopColor="#0EA5E9" />
        <stop offset="1" stopColor="#10B981" />
      </linearGradient>
    </defs>
  </svg>
)

export default Logo