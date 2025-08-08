// Admin Dashboard Layout for BuildMate AI Platform
import { Metadata } from 'next'
import AdminNavigation from '../../components/ui/AdminNavigation'
import AdminSidebar from '../../components/ui/AdminSidebar'

export const metadata: Metadata = {
  title: 'BuildMate AI Admin Dashboard',
  description: 'Administrative dashboard for BuildMate AI platform management',
  robots: 'noindex, nofollow'
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Navigation */}
      <AdminNavigation />
      
      {/* Main Admin Content */}
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Content Area */}
        <main className="flex-1 lg:ml-64">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}