"use client"

import { useState } from "react"
import { Check, Download, Eye, Filter, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for orders
const mockOrders = [
  {
    id: 1001,
    customer: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    date: "2023-05-22",
    time: "10:30 AM",
    items: [
      { name: "Chocolate Truffle Cake", quantity: 1, price: 32.99 },
      { name: "Butter Croissant", quantity: 2, price: 3.99 },
    ],
    total: 40.97,
    status: "pending",
    address: "123 Main St, Sweet City, SC 12345",
    paymentMethod: "Credit Card",
  },
  {
    id: 1002,
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    date: "2023-05-22",
    time: "11:15 AM",
    items: [{ name: "Red Velvet Cake", quantity: 1, price: 34.99 }],
    total: 34.99,
    status: "completed",
    address: "456 Oak Ave, Sweet City, SC 12345",
    paymentMethod: "PayPal",
  },
  {
    id: 1003,
    customer: "Michael Chen",
    email: "michael.c@example.com",
    phone: "(555) 345-6789",
    date: "2023-05-21",
    time: "3:45 PM",
    items: [
      { name: "Cappuccino", quantity: 2, price: 4.5 },
      { name: "Cinnamon Roll", quantity: 2, price: 4.5 },
    ],
    total: 18.0,
    status: "completed",
    address: "789 Pine St, Sweet City, SC 12345",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: 1004,
    customer: "Emily Rodriguez",
    email: "emily.r@example.com",
    phone: "(555) 456-7890",
    date: "2023-05-21",
    time: "2:00 PM",
    items: [
      { name: "Vanilla Bean Cake", quantity: 1, price: 28.99 },
      { name: "Chocolate Milkshake", quantity: 2, price: 6.5 },
      { name: "Chocolate Chip Cookie", quantity: 2, price: 2.99 },
    ],
    total: 47.97,
    status: "pending",
    address: "101 Maple Dr, Sweet City, SC 12345",
    paymentMethod: "Credit Card",
  },
  {
    id: 1005,
    customer: "David Kim",
    email: "david.k@example.com",
    phone: "(555) 567-8901",
    date: "2023-05-20",
    time: "4:30 PM",
    items: [{ name: "Strawberry Shortcake", quantity: 1, price: 30.99 }],
    total: 30.99,
    status: "completed",
    address: "202 Cedar Ln, Sweet City, SC 12345",
    paymentMethod: "PayPal",
  },
  {
    id: 1006,
    customer: "Jennifer Lee",
    email: "jennifer.l@example.com",
    phone: "(555) 678-9012",
    date: "2023-05-20",
    time: "1:15 PM",
    items: [
      { name: "Almond Danish", quantity: 3, price: 4.99 },
      { name: "Vanilla Latte", quantity: 2, price: 5.25 },
    ],
    total: 25.47,
    status: "pending",
    address: "303 Birch Ave, Sweet City, SC 12345",
    paymentMethod: "Credit Card",
  },
  {
    id: 1007,
    customer: "Robert Wilson",
    email: "robert.w@example.com",
    phone: "(555) 789-0123",
    date: "2023-05-19",
    time: "11:00 AM",
    items: [{ name: "Chocolate Éclair", quantity: 4, price: 5.5 }],
    total: 22.0,
    status: "completed",
    address: "404 Elm St, Sweet City, SC 12345",
    paymentMethod: "Cash on Delivery",
  },
  {
    id: 1008,
    customer: "Lisa Martinez",
    email: "lisa.m@example.com",
    phone: "(555) 890-1234",
    date: "2023-05-19",
    time: "9:45 AM",
    items: [
      { name: "Chocolate Truffle Cake", quantity: 1, price: 32.99 },
      { name: "Cappuccino", quantity: 2, price: 4.5 },
    ],
    total: 41.99,
    status: "pending",
    address: "505 Walnut Dr, Sweet City, SC 12345",
    paymentMethod: "Credit Card",
  },
]

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  // Filter orders based on active tab, search query, and filters
  const filteredOrders = mockOrders.filter((order) => {
    // Filter by tab
    if (activeTab === "pending" && order.status !== "pending") return false
    if (activeTab === "completed" && order.status !== "completed") return false

    // Filter by search query
    if (
      searchQuery &&
      !order.customer.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !order.id.toString().includes(searchQuery)
    )
      return false

    // Filter by date
    if (dateFilter === "today" && order.date !== "2023-05-22") return false
    if (dateFilter === "yesterday" && order.date !== "2023-05-21") return false
    if (dateFilter === "older" && (order.date === "2023-05-22" || order.date === "2023-05-21")) return false

    // Filter by payment method
    if (paymentFilter === "card" && order.paymentMethod !== "Credit Card") return false
    if (paymentFilter === "paypal" && order.paymentMethod !== "PayPal") return false
    if (paymentFilter === "cash" && order.paymentMethod !== "Cash on Delivery") return false

    return true
  })

  const handleStatusChange = (orderId: number, newStatus: string) => {
    // In a real app, you would update the status in your database
    console.log(`Changing order ${orderId} status to ${newStatus}`)
    // For demo purposes, we'll just close the dialog
    setSelectedOrder(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name or order ID..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2" onClick={() => setFilterDialogOpen(true)}>
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <OrdersTable orders={filteredOrders} onViewOrder={setSelectedOrder} />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <OrdersTable orders={filteredOrders} onViewOrder={setSelectedOrder} />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <OrdersTable orders={filteredOrders} onViewOrder={setSelectedOrder} />
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Order #{selectedOrder.id}</DialogTitle>
              <DialogDescription>Order details and management</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Customer Information</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Name:</span> {selectedOrder.customer}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Email:</span> {selectedOrder.email}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Phone:</span> {selectedOrder.phone}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Address:</span> {selectedOrder.address}
                  </p>
                </div>

                <h3 className="font-medium mt-6 mb-2">Order Information</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">Date:</span> {selectedOrder.date}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Time:</span> {selectedOrder.time}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Payment Method:</span> {selectedOrder.paymentMethod}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedOrder.status === "pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(selectedOrder.total + 5).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Update Order Status</h3>
                  <div className="flex gap-2">
                    {selectedOrder.status === "pending" ? (
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => handleStatusChange(selectedOrder.id, "completed")}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Mark as Completed
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleStatusChange(selectedOrder.id, "pending")}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Mark as Pending
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Orders</DialogTitle>
            <DialogDescription>Apply filters to narrow down your order list</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Date</Label>
              <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="date-all" />
                  <Label htmlFor="date-all">All dates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="today" id="date-today" />
                  <Label htmlFor="date-today">Today</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yesterday" id="date-yesterday" />
                  <Label htmlFor="date-yesterday">Yesterday</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="older" id="date-older" />
                  <Label htmlFor="date-older">Older</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentFilter} onValueChange={setPaymentFilter}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="payment-all" />
                  <Label htmlFor="payment-all">All methods</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="payment-card" />
                  <Label htmlFor="payment-card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="payment-paypal" />
                  <Label htmlFor="payment-paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="payment-cash" />
                  <Label htmlFor="payment-cash">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setDateFilter("all")
                  setPaymentFilter("all")
                }}
              >
                Reset
              </Button>
              <Button onClick={() => setFilterDialogOpen(false)}>Apply Filters</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function OrdersTable({ orders, onViewOrder }: { orders: any[]; onViewOrder: (order: any) => void }) {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="py-3 px-4 text-left font-medium">Order ID</th>
            <th className="py-3 px-4 text-left font-medium">Customer</th>
            <th className="py-3 px-4 text-left font-medium">Date</th>
            <th className="py-3 px-4 text-left font-medium">Total</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-6 text-center text-muted-foreground">
                No orders found
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="py-3 px-4">#{order.id}</td>
                <td className="py-3 px-4">{order.customer}</td>
                <td className="py-3 px-4">
                  {order.date} at {order.time}
                </td>
                <td className="py-3 px-4">${(order.total + 5).toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="icon" onClick={() => onViewOrder(order)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
