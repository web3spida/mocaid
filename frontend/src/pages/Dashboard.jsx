import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAccount } from 'wagmi'
import {
  IdentificationIcon,
  DocumentCheckIcon,
  KeyIcon,
  ShieldCheckIcon,
  PlusIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline'
import { useIdentityRegistry, useCredentialIssuer } from '../hooks/useContracts'
import { useDID, useVerifiableCredentials } from '../hooks/useAirKit'
import { useAuth } from '../contexts/AuthContext'
import UserDashboardLayout from '../components/layout/UserDashboardLayout'
import VerifierDashboardLayout from '../components/layout/VerifierDashboardLayout'
import AdminDashboardLayout from '../components/layout/AdminDashboardLayout'

const Dashboard = () => {
  const { address } = useAccount()
  const { user, userRole, isAdmin, isVerifier } = useAuth()
  const { useGetIdentity, useIsRegistered } = useIdentityRegistry()
  const { useGetUserCredentials } = useCredentialIssuer()
  const { did } = useDID()
  const { credentials } = useVerifiableCredentials()

  // Contract data
  const { data: isRegistered, isLoading: isCheckingRegistration } = useIsRegistered(address)
  const { data: identity, isLoading: isLoadingIdentity } = useGetIdentity(address)
  const { data: userCredentials, isLoading: isLoadingCredentials } = useGetUserCredentials(address)

  // Enhanced stats calculation
  const stats = [
    {
      name: 'Identity Status',
      value: isRegistered ? 'Active' : 'Inactive',
      icon: IdentificationIcon,
      color: isRegistered ? 'text-emerald-600' : 'text-amber-600',
      bgColor: isRegistered ? 'bg-emerald-50' : 'bg-amber-50',
      borderColor: isRegistered ? 'border-emerald-200' : 'border-amber-200',
      change: isRegistered ? 'Verified' : 'Pending',
      changeType: isRegistered ? 'positive' : 'neutral',
    },
    {
      name: 'Credentials',
      value: credentials?.length || 0,
      icon: DocumentCheckIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      change: '+2 this month',
      changeType: 'positive',
    },
    {
      name: 'VYR Tokens',
      value: '1,250',
      icon: CurrencyDollarIcon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      change: '+15% this week',
      changeType: 'positive',
    },
    {
      name: 'Verifications',
      value: '47',
      icon: ShieldCheckIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      change: '+8 today',
      changeType: 'positive',
    },
  ]

  const quickActions = [
    {
      name: 'My Identity',
      description: 'Manage your decentralized identity',
      href: '/my-identity',
      icon: IdentificationIcon,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white',
      disabled: false,
    },
    {
      name: 'My Credentials',
      description: 'View and manage your credentials',
      href: '/my-credentials',
      icon: DocumentCheckIcon,
      color: 'bg-emerald-600 hover:bg-emerald-700',
      textColor: 'text-white',
    },
    {
      name: 'Verify & Earn',
      description: 'Verify credentials and earn VYR',
      href: '/verify-earn',
      icon: ShieldCheckIcon,
      color: 'bg-purple-600 hover:bg-purple-700',
      textColor: 'text-white',
    },
    {
      name: 'Rewards',
      description: 'Track your VYR rewards',
      href: '/rewards',
      icon: TrophyIcon,
      color: 'bg-amber-600 hover:bg-amber-700',
      textColor: 'text-white',
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'verification',
      action: 'Verified education credential',
      timestamp: '2 hours ago',
      status: 'completed',
      icon: ShieldCheckIcon,
      reward: '+50 VYR',
    },
    {
      id: 2,
      type: 'credential',
      action: 'New professional credential issued',
      timestamp: '1 day ago',
      status: 'completed',
      icon: DocumentCheckIcon,
      reward: null,
    },
    {
      id: 3,
      type: 'reward',
      action: 'Daily verification bonus earned',
      timestamp: '2 days ago',
      status: 'completed',
      icon: CurrencyDollarIcon,
      reward: '+25 VYR',
    },
    {
      id: 4,
      type: 'identity',
      action: 'Identity profile updated',
      timestamp: '3 days ago',
      status: 'completed',
      icon: IdentificationIcon,
      reward: null,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  // Prepare data for role-based layouts
  const dashboardData = {
    stats,
    quickActions,
    recentActivity,
    credentials,
    isRegistered,
    did,
    address,
    user,
    userRole
  }

  // Admin Dashboard
  if (isAdmin()) {
    const adminStats = [
      {
        name: 'Total Users',
        value: '12,847',
        icon: UserGroupIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        change: '+234 this week',
        changeType: 'positive'
      },
      {
        name: 'Active Verifiers',
        value: '89',
        icon: ShieldCheckIcon,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        change: '+5 this week',
        changeType: 'positive'
      },
      {
        name: 'Pending Applications',
        value: '23',
        icon: ClockIcon,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        change: '7 urgent',
        changeType: 'neutral'
      },
      {
        name: 'System Health',
        value: '99.8%',
        icon: CheckCircleIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        change: 'All systems operational',
        changeType: 'positive'
      }
    ]

    const adminActivity = [
      {
        title: 'New verifier approved',
        description: 'Sarah Johnson has been approved as a verifier',
        timestamp: '10 minutes ago',
        icon: ShieldCheckIcon,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50'
      },
      {
        title: 'System maintenance completed',
        description: 'Database optimization and security updates applied',
        timestamp: '2 hours ago',
        icon: CheckCircleIcon,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      }
    ]

    return (
      <AdminDashboardLayout 
        systemStats={adminStats}
        recentActivity={adminActivity}
        alerts={[]}
        systemHealth={{}}
      />
    )
  }

  // Verifier Dashboard
  if (isVerifier()) {
    const verifierStats = [
      {
        name: 'Verifications Today',
        value: '12',
        icon: ShieldCheckIcon,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        change: '+3 from yesterday',
        changeType: 'positive'
      },
      {
        name: 'Total Earnings',
        value: '2,450 VYR',
        icon: CurrencyDollarIcon,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        change: '+150 VYR today',
        changeType: 'positive'
      },
      {
        name: 'Success Rate',
        value: '98.5%',
        icon: TrophyIcon,
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        change: 'Above average',
        changeType: 'positive'
      },
      {
        name: 'Pending Queue',
        value: '5',
        icon: ClockIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        change: '2 urgent',
        changeType: 'neutral'
      }
    ]

    const verifierActivity = [
      {
        title: 'Education credential verified',
        description: 'University degree verification completed for John Doe',
        timestamp: '15 minutes ago',
        icon: DocumentCheckIcon,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        reward: '+50 VYR'
      },
      {
        title: 'Professional license verified',
        description: 'Medical license verification for Dr. Smith',
        timestamp: '1 hour ago',
        icon: ShieldCheckIcon,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        reward: '+75 VYR'
      }
    ]

    return (
      <VerifierDashboardLayout 
        verificationStats={verifierStats}
        recentVerifications={verifierActivity}
        earnings={{ today: 150, total: 2450, rate: 98.5 }}
        pendingQueue={5}
      />
    )
  }

  // Regular User Dashboard
  return (
    <UserDashboardLayout 
      userStats={stats}
      quickActions={quickActions}
      recentActivity={recentActivity}
      identityScore={85}
      credentials={credentials}
      isRegistered={isRegistered}
      did={did}
      address={address}
    />
  )
}

export default Dashboard