import React from 'react'

const Logo = ({ className = 'w-8 h-8' }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shield background */}
    <path
      d="M16 2L28 6v10c0 8.837-7.163 16-16 16S4 24.837 4 16V6L16 2z"
      fill="url(#logo-gradient)"
    />
    {/* Identity card */}
    <rect x="9" y="10" width="14" height="9" rx="1.5" fill="#fff" fillOpacity="0.9" />
    {/* Photo placeholder */}
    <circle cx="12.5" cy="14.5" r="1.5" fill="#0EA5E9" />
    {/* Lines */}
    <line x1="15" y1="13" x2="21" y2="13" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
    <line x1="15" y1="15" x2="19" y2="15" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
    <line x1="15" y1="17" x2="20" y2="17" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" />
    <defs>
      <linearGradient id="logo-gradient" x1="6" y1="2" x2="26" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0EA5E9" />
        <stop offset="1" stopColor="#0891B2" />
      </linearGradient>
    </defs>
  </svg>
)

export default Logo