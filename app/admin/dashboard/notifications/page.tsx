"use client"

import { useState } from "react"
import { Bell, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for sent notifications
const mockNotifications = [
  {
    id: 1,
    title: "Weekend Special Offer",
    message: "Get 20% off on all cakes this weekend! Use code WEEKEND20 at checkout.",
    type: "promotion",
    sentTo: "all",
    sentDate: "2023-05-20",
    sentTime: "10:30 AM",
  },
  {
    id: 2,
    title: "New Summer Menu Items",
    message: "Check out our refreshing new summer drinks and desserts, now available in store and online!",
    type: "announcement",
    sentTo: "subscribers",
    sentDate: "2023-05-15",
    sentTime: "2:45 PM",
  },
  {
    id: 3,
    title: "Holiday Hours Update",
    message: "We will be closed on May 29th for Memorial Day. Regular hours resume on May 30th.",
    type: "announcement",
    sentTo: "all",
    sentDate: "2023-05-10",
    sentTime: "9:15 AM",
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("send")
  const [notifications, setNotifications] = useState(mockNotifications)
  const [notificationType, setNotificationType] = useState("promotion")
  const [recipientType, setRecipientType] = useState("all")
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [sendViaWhatsApp, setSendViaWhatsApp] = useState(true)
  const [sendViaEmail, setSendViaEmail] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationMessage) {
      alert("Please fill in all required fields")
      return
    }

    setIsSending(true)

    // Simulate sending notification
    setTimeout(() => {
      const newNotification = {
        id: Math.max(...notifications.map((n) => n.id)) + 1,
        title: notificationTitle,
        message: notificationMessage,
        type: notificationType,
        sentTo: recipientType,
        sentDate: new Date().toISOString().split("T")[0],
        sentTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }

      setNotifications([newNotification, ...notifications])
      setNotificationTitle("")
      setNotificationMessage("")
      setIsSending(false)
      setSuccessMessage("Notification sent successfully!")

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Send notifications to your customers</p>
      </div>

      <Tabs defaultValue="send" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="history">Notification History</TabsTrigger>
        </TabsList>
        <TabsContent value="send" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Send a New Notification</CardTitle>
              <CardDescription>
                Notify your customers about promotions, new menu items, or important announcements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {successMessage && (
                <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-center gap-2 mb-4">
                  <Bell className="h-5 w-5" />
                  {successMessage}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="notification-type">Notification Type</Label>
                <RadioGroup
                  value={notificationType}
                  onValueChange={setNotificationType}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="promotion" id="promotion" />
                    <Label htmlFor="promotion">Promotion/Offer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="announcement" id="announcement" />
                    <Label htmlFor="announcement">Announcement</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="menu-update" id="menu-update" />
                    <Label htmlFor="menu-update">New Menu Item</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-type">Send To</Label>
                <Select value={recipientType} onValueChange={setRecipientType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="subscribers">Subscribed Users Only</SelectItem>
                    <SelectItem value="customers">Previous Customers Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {recipientType === "all"
                    ? "This will send to all users in your database."
                    : recipientType === "subscribers"
                      ? "This will only send to users who have subscribed to notifications."
                      : "This will only send to users who have previously placed an order."}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="notification-title">Notification Title</Label>
                <Input
                  id="notification-title"
                  value={notificationTitle}
                  onChange={(e) => setNotificationTitle(e.target.value)}
                  placeholder="e.g., Weekend Special Offer"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-message">Message</Label>
                <Textarea
                  id="notification-message"
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  placeholder="Enter your notification message here..."
                  rows={4}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-medium">Delivery Methods</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="whatsapp" checked={sendViaWhatsApp} onCheckedChange={setSendViaWhatsApp} />
                    <Label htmlFor="whatsapp">Send via WhatsApp</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="email" checked={sendViaEmail} onCheckedChange={setSendViaEmail} />
                    <Label htmlFor="email">Send via Email</Label>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-pink-500 hover:bg-pink-600"
                onClick={handleSendNotification}
                disabled={isSending || !notificationTitle || !notificationMessage}
              >
                {isSending ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Notification
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>View all previously sent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <div className="py-12 text-center text-muted-foreground">No notifications sent yet</div>
                ) : (
                  notifications.map((notification) => (
                    <div key={notification.id} className="border rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold">{notification.title}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${
                                notification.type === "promotion"
                                  ? "bg-green-100 text-green-700"
                                  : notification.type === "announcement"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-purple-100 text-purple-700"
                              }`}
                            >
                              {notification.type === "promotion"
                                ? "Promotion"
                                : notification.type === "announcement"
                                  ? "Announcement"
                                  : "Menu Update"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <div>
                            Sent to:{" "}
                            <span className="font-medium">
                              {notification.sentTo === "all"
                                ? "All Users"
                                : notification.sentTo === "subscribers"
                                  ? "Subscribers"
                                  : "Customers"}
                            </span>
                          </div>
                          <div>
                            {notification.sentDate} at {notification.sentTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
