"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  CakeSlice,
  Home,
  LogOut,
  MessageSquare,
  Package,
  PieChart,
  Settings,
  Users,
  Utensils,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is logged in
  useEffect(() => {
    setIsClient(true)
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    if (!isLoggedIn) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    router.push("/admin/login")
  }

  if (!isClient) {
    return null // Prevent SSR issues with localStorage
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Utensils className="h-6 w-6 text-pink-500" />
              <span className="text-xl font-bold">Sweet Delights</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard"}>
                  <Link href="/admin/dashboard">
                    <PieChart className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard/orders"}>
                  <Link href="/admin/dashboard/orders">
                    <Package className="h-5 w-5" />
                    <span>Orders</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard/menu"}>
                  <Link href="/admin/dashboard/menu">
                    <CakeSlice className="h-5 w-5" />
                    <span>Menu Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard/users"}>
                  <Link href="/admin/dashboard/users">
                    <Users className="h-5 w-5" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard/testimonials"}>
                  <Link href="/admin/dashboard/testimonials">
                    <MessageSquare className="h-5 w-5" />
                    <span>Testimonials</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard/notifications"}>
                  <Link href="/admin/dashboard/notifications">
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/admin/dashboard/settings"}>
                  <Link href="/admin/dashboard/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/" target="_blank">
                    <Home className="h-5 w-5" />
                    <span>View Website</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="border-b bg-white">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-xl font-bold hidden md:block">Admin Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-pink-500 text-[10px] text-white flex items-center justify-center">
                    3
                  </span>
                </Button>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-pink-500">A</span>
                  </div>
                  <span className="text-sm font-medium hidden md:block">Admin</span>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-gray-50 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
