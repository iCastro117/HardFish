import type { ReactNode } from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"
import ProtectedRoute from "@/components/admin/protected-route"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
