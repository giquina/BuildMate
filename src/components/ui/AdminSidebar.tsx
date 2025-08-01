// Admin Sidebar Component for BuildMate Dashboard
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, 
  Users, 
  Shield, 
  FileText, 
  Headphones, 
  Activity, 
  TestTube, 
  AlertTriangle,
  Settings,
  Database,
  CreditCard,
  Map,
  TrendingUp,
  UserCheck,
  MessageSquare,
  Zap,
  Lock,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface AdminSidebarProps {
  className?: string
}

interface NavItem {
  name: string
  href: string
  icon: any
  badge?: string
  children?: NavItem[]
}

export default function AdminSidebar({ className = '' }: AdminSidebarProps) {
  const pathname = usePathname()
  const [expandedSections, setExpandedSections] = useState<string[]>(['analytics'])

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    )
  }

  const navigation: NavItem[] = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: BarChart3,
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: TrendingUp,
      children: [
        { name: 'User Analytics', href: '/admin/analytics/users', icon: Users },
        { name: 'Revenue Analytics', href: '/admin/analytics/revenue', icon: CreditCard },
        { name: 'Geographic Data', href: '/admin/analytics/geographic', icon: Map },
        { name: 'Conversion Funnels', href: '/admin/analytics/funnels', icon: TrendingUp },
        { name: 'Custom Reports', href: '/admin/analytics/reports', icon: FileText },
      ]
    },
    {
      name: 'User Management',
      href: '/admin/users',
      icon: Users,
      children: [
        { name: 'All Users', href: '/admin/users', icon: Users },
        { name: 'Subscriptions', href: '/admin/users/subscriptions', icon: CreditCard },
        { name: 'User Activity', href: '/admin/users/activity', icon: Activity },
        { name: 'User Segments', href: '/admin/users/segments', icon: Users },
      ]
    },
    {
      name: 'Professionals',
      href: '/admin/professionals',
      icon: UserCheck,
      badge: '12',
      children: [
        { name: 'Verification Queue', href: '/admin/professionals/verification', icon: Shield, badge: '12' },
        { name: 'All Professionals', href: '/admin/professionals', icon: UserCheck },
        { name: 'Performance', href: '/admin/professionals/performance', icon: BarChart3 },
        { name: 'Certifications', href: '/admin/professionals/certifications', icon: Shield },
      ]
    },
    {
      name: 'Content Management',
      href: '/admin/content',
      icon: FileText,
      children: [
        { name: 'All Content', href: '/admin/content', icon: FileText },
        { name: 'Guides & Articles', href: '/admin/content/guides', icon: FileText },
        { name: 'Material Database', href: '/admin/content/materials', icon: Database },
        { name: 'Case Studies', href: '/admin/content/case-studies', icon: FileText },
        { name: 'SEO Management', href: '/admin/content/seo', icon: TrendingUp },
      ]
    },
    {
      name: 'Support',
      href: '/admin/support',
      icon: Headphones,
      badge: '5',
      children: [
        { name: 'Active Tickets', href: '/admin/support/tickets', icon: MessageSquare, badge: '5' },
        { name: 'Knowledge Base', href: '/admin/support/knowledge-base', icon: FileText },
        { name: 'Live Chat', href: '/admin/support/chat', icon: MessageSquare },
        { name: 'Satisfaction', href: '/admin/support/satisfaction', icon: BarChart3 },
      ]
    },
    {
      name: 'System Health',
      href: '/admin/system',
      icon: Activity,
      children: [
        { name: 'System Status', href: '/admin/system/status', icon: Activity },
        { name: 'Error Monitoring', href: '/admin/system/errors', icon: AlertTriangle },
        { name: 'Performance', href: '/admin/system/performance', icon: Zap },
        { name: 'API Usage', href: '/admin/system/api', icon: Database },
        { name: 'Audit Logs', href: '/admin/system/audit', icon: FileText },
      ]
    },
    {
      name: 'A/B Testing',
      href: '/admin/testing',
      icon: TestTube,
      children: [
        { name: 'Active Tests', href: '/admin/testing/active', icon: TestTube },
        { name: 'Test Results', href: '/admin/testing/results', icon: BarChart3 },
        { name: 'Feature Flags', href: '/admin/testing/flags', icon: Settings },
      ]
    },
    {
      name: 'Security',
      href: '/admin/security',
      icon: Lock,
      children: [
        { name: 'Security Events', href: '/admin/security/events', icon: AlertTriangle },
        { name: 'Fraud Detection', href: '/admin/security/fraud', icon: Shield },
        { name: 'Access Control', href: '/admin/security/access', icon: Lock },
        { name: 'IP Management', href: '/admin/security/ip', icon: Settings },
      ]
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      children: [
        { name: 'General Settings', href: '/admin/settings/general', icon: Settings },
        { name: 'API Configuration', href: '/admin/settings/api', icon: Database },
        { name: 'Email Templates', href: '/admin/settings/email', icon: MessageSquare },
        { name: 'Integrations', href: '/admin/settings/integrations', icon: Zap },
      ]
    }
  ]

  const isActiveLink = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname.startsWith(href)
  }

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const isExpanded = expandedSections.includes(item.name.toLowerCase().replace(' ', '-'))
    const hasChildren = item.children && item.children.length > 0
    const isActive = isActiveLink(item.href)
    const Icon = item.icon

    return (
      <div key={item.name}>
        <div
          className={`flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            isActive
              ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          } ${level > 0 ? 'ml-4' : ''}`}
        >
          <Link href={item.href} className="flex items-center flex-1">
            <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>{item.name}</span>
            {item.badge && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
          
          {hasChildren && (
            <button
              onClick={(e) => {
                e.preventDefault()
                toggleSection(item.name.toLowerCase().replace(' ', '-'))
              }}
              className="ml-2 p-1 hover:bg-slate-200 rounded"
            >
              {isExpanded ? 
                <ChevronDown className="w-4 h-4" /> : 
                <ChevronRight className="w-4 h-4" />
              }
            </button>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform lg:translate-x-0 lg:static lg:inset-0 ${className}`}>
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-16 px-4 border-b border-slate-200">
          <div className="text-center">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Admin Dashboard
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigation.map(item => renderNavItem(item))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900">System Healthy</p>
              <p className="text-xs text-slate-500">All systems operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}