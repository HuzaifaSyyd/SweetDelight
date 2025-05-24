// "use client"

// import { useState } from "react"
// import { Download, Search, User } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Switch } from "@/components/ui/switch"

// // Mock data for users
// const mockUsers = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john.doe@example.com",
//     phone: "(555) 123-4567",
//     subscribed: true,
//     orders: 5,
//     lastOrder: "2023-05-20",
//     registeredDate: "2023-01-15",
//   },
//   {
//     id: 2,
//     name: "Sarah Johnson",
//     email: "sarah.j@example.com",
//     phone: "(555) 234-5678",
//     subscribed: true,
//     orders: 3,
//     lastOrder: "2023-05-18",
//     registeredDate: "2023-02-10",
//   },
//   {
//     id: 3,
//     name: "Michael Chen",
//     email: "michael.c@example.com",
//     phone: "(555) 345-6789",
//     subscribed: false,
//     orders: 2,
//     lastOrder: "2023-05-10",
//     registeredDate: "2023-03-05",
//   },
//   {
//     id: 4,
//     name: "Emily Rodriguez",
//     email: "emily.r@example.com",
//     phone: "(555) 456-7890",
//     subscribed: true,
//     orders: 7,
//     lastOrder: "2023-05-22",
//     registeredDate: "2023-01-20",
//   },
//   {
//     id: 5,
//     name: "David Kim",
//     email: "david.k@example.com",
//     phone: "(555) 567-8901",
//     subscribed: false,
//     orders: 1,
//     lastOrder: "2023-04-15",
//     registeredDate: "2023-04-01",
//   },
//   {
//     id: 6,
//     name: "Jennifer Lee",
//     email: "jennifer.l@example.com",
//     phone: "(555) 678-9012",
//     subscribed: true,
//     orders: 4,
//     lastOrder: "2023-05-19",
//     registeredDate: "2023-02-28",
//   },
//   {
//     id: 7,
//     name: "Robert Wilson",
//     email: "robert.w@example.com",
//     phone: "(555) 789-0123",
//     subscribed: false,
//     orders: 0,
//     lastOrder: null,
//     registeredDate: "2023-05-10",
//   },
//   {
//     id: 8,
//     name: "Lisa Martinez",
//     email: "lisa.m@example.com",
//     phone: "(555) 890-1234",
//     subscribed: true,
//     orders: 2,
//     lastOrder: "2023-05-05",
//     registeredDate: "2023-03-15",
//   },
// ]

// export default function UsersPage() {
//   const [activeTab, setActiveTab] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [users, setUsers] = useState(mockUsers)

//   // Filter users based on active tab and search query
//   const filteredUsers = users.filter((user) => {
//     // Filter by tab
//     if (activeTab === "subscribed" && !user.subscribed) return false
//     if (activeTab === "unsubscribed" && user.subscribed) return false
//     if (activeTab === "customers" && user.orders === 0) return false

//     // Filter by search query
//     if (
//       searchQuery &&
//       !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !user.email.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//       return false

//     return true
//   })

//   const handleSubscriptionToggle = (userId: number, subscribed: boolean) => {
//     const updatedUsers = users.map((user) => (user.id === userId ? { ...user, subscribed } : user))
//     setUsers(updatedUsers)
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold">Users Management</h1>
//           <p className="text-muted-foreground">Manage your users and subscribers</p>
//         </div>
//         <Button variant="outline" className="gap-2">
//           <Download className="h-4 w-4" />
//           Export Users
//         </Button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input
//             placeholder="Search by name or email..."
//             className="pl-10"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{users.length}</div>
//             <p className="text-xs text-muted-foreground">Registered users</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Subscribed Users</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{users.filter((user) => user.subscribed).length}</div>
//             <p className="text-xs text-muted-foreground">Receiving notifications</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{users.filter((user) => user.orders > 0).length}</div>
//             <p className="text-xs text-muted-foreground">Users with at least one order</p>
//           </CardContent>
//         </Card>
//       </div>

//       <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="all">All Users</TabsTrigger>
//           <TabsTrigger value="subscribed">Subscribed</TabsTrigger>
//           <TabsTrigger value="unsubscribed">Unsubscribed</TabsTrigger>
//           <TabsTrigger value="customers">Customers</TabsTrigger>
//         </TabsList>
//         <TabsContent value="all" className="space-y-4">
//           <UsersTable users={filteredUsers} onSubscriptionToggle={handleSubscriptionToggle} />
//         </TabsContent>
//         <TabsContent value="subscribed" className="space-y-4">
//           <UsersTable users={filteredUsers} onSubscriptionToggle={handleSubscriptionToggle} />
//         </TabsContent>
//         <TabsContent value="unsubscribed" className="space-y-4">
//           <UsersTable users={filteredUsers} onSubscriptionToggle={handleSubscriptionToggle} />
//         </TabsContent>
//         <TabsContent value="customers" className="space-y-4">
//           <UsersTable users={filteredUsers} onSubscriptionToggle={handleSubscriptionToggle} />
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

// function UsersTable({
//   users,
//   onSubscriptionToggle,
// }: {
//   users: any[]
//   onSubscriptionToggle: (userId: number, subscribed: boolean) => void
// }) {
//   return (
//     <div className="rounded-md border">
//       <table className="w-full">
//         <thead>
//           <tr className="border-b bg-muted/50">
//             <th className="py-3 px-4 text-left font-medium">User</th>
//             <th className="py-3 px-4 text-left font-medium">Contact</th>
//             <th className="py-3 px-4 text-left font-medium">Orders</th>
//             <th className="py-3 px-4 text-left font-medium">Subscribed</th>
//             <th className="py-3 px-4 text-left font-medium">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan={5} className="py-6 text-center text-muted-foreground">
//                 No users found
//               </td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user.id} className="border-b">
//                 <td className="py-3 px-4">
//                   <div className="flex items-center gap-3">
//                     <div className="h-8 w-8 rounded-full bg-pink-100 flex items-center justify-center">
//                       <User className="h-4 w-4 text-pink-500" />
//                     </div>
//                     <div>
//                       <div className="font-medium">{user.name}</div>
//                       <div className="text-xs text-muted-foreground">Joined {user.registeredDate}</div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="text-sm">{user.email}</div>
//                   <div className="text-xs text-muted-foreground">{user.phone}</div>
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="text-sm">{user.orders} orders</div>
//                   {user.lastOrder && (
//                     <div className="text-xs text-muted-foreground">Last order: {user.lastOrder}</div>
//                   )}
//                 </td>
//                 <td className="py-3 px-4">
//                   <div className="flex items-center space-x-2">
//                     <Switch
//                       checked={user.subscribed}
//                       onCheckedChange={(checke\
