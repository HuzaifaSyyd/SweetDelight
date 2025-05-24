"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowUpRight, CakeSlice, DollarSign, Package, ShoppingBag, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for dashboard
const mockData = {
  totalOrders: 156,
  pendingOrders: 12,
  completedOrders: 144,
  totalRevenue: 4850.75,
  totalUsers: 87,
  subscribedUsers: 42,
  totalMenuItems: 32,
  recentOrders: [
    { id: 1, customer: "John Doe", items: 3, total: 42.99, status: "Pending", date: "2023-05-22" },
    { id: 2, customer: "Sarah Johnson", items: 1, total: 32.99, status: "Completed", date: "2023-05-22" },
    { id: 3, customer: "Michael Chen", items: 2, total: 18.48, status: "Completed", date: "2023-05-21" },
    { id: 4, customer: "Emily Rodriguez", items: 4, total: 67.96, status: "Pending", date: "2023-05-21" },
    { id: 5, customer: "David Kim", items: 2, total: 24.5, status: "Completed", date: "2023-05-20" },
  ],
  popularItems: [
    { id: 1, name: "Chocolate Truffle Cake", category: "Cakes", orders: 28 },
    { id: 2, name: "Butter Croissant", category: "Pastries", orders: 24 },
    { id: 3, name: "Cappuccino", category: "Drinks", orders: 22 },
    { id: 4, name: "Red Velvet Cake", category: "Cakes", orders: 18 },
    { id: 5, name: "Cinnamon Roll", category: "Pastries", orders: 16 },
  ],
}

export default function AdminDashboardPage() {
  const [timeframe, setTimeframe] = useState("week")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back, Admin! Here's what's happening with your bakery.</p>
        </div>
        <Tabs defaultValue="week" value={timeframe} onValueChange={setTimeframe} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="day">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockData.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+18.2% from last {timeframe}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalOrders}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center text-green-500">
                <span className="font-medium">{mockData.completedOrders}</span> completed
              </span>
              <span>•</span>
              <span className="flex items-center text-orange-500">
                <span className="font-medium">{mockData.pendingOrders}</span> pending
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalUsers}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center">
                <span className="font-medium">{mockData.subscribedUsers}</span> subscribed
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Items</CardTitle>
            <CakeSlice className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.totalMenuItems}</div>
            <p className="text-xs text-muted-foreground">Across all categories</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{order.customer}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{order.items} items</span>
                      <span>•</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Pending" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/admin/dashboard/orders">
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/dashboard/orders">View All Orders</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Popular Items</CardTitle>
            <CardDescription>Most ordered items this {timeframe}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.popularItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.orders} orders</span>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href="/admin/dashboard/menu">
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/dashboard/menu">Manage Menu</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full bg-pink-500 hover:bg-pink-600" asChild>
                <Link href="/admin/dashboard/orders">
                  <Package className="mr-2 h-4 w-4" />
                  View Pending Orders
                </Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/admin/dashboard/menu">
                  <CakeSlice className="mr-2 h-4 w-4" />
                  Add New Menu Item
                </Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/admin/dashboard/notifications">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Send Promotion
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div className="absolute top-2 bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gray-200"></div>
                </div>
                <div>
                  <p className="font-medium">New order received</p>
                  <p className="text-sm text-muted-foreground">Order #1234 from John Doe</p>
                  <p className="text-xs text-muted-foreground">10 minutes ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <div className="absolute top-2 bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gray-200"></div>
                </div>
                <div>
                  <p className="font-medium">New user registered</p>
                  <p className="text-sm text-muted-foreground">Sarah Johnson created an account</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                  <div className="absolute top-2 bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gray-200"></div>
                </div>
                <div>
                  <p className="font-medium">New menu item added</p>
                  <p className="text-sm text-muted-foreground">Strawberry Cheesecake added to Desserts</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                  <div className="absolute top-2 bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gray-200"></div>
                </div>
                <div>
                  <p className="font-medium">Order status updated</p>
                  <p className="text-sm text-muted-foreground">Order #1230 marked as completed</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative mt-1">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                </div>
                <div>
                  <p className="font-medium">Promotion notification sent</p>
                  <p className="text-sm text-muted-foreground">Weekend special offer sent to 42 subscribers</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
