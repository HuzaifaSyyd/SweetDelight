"use client"

import { useState } from "react"
import { Check, Edit, Plus, Star, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Mock data for testimonials
const mockTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    comment:
      "The birthday cake I ordered was absolutely stunning and delicious! Everyone at the party loved it. Will definitely order again!",
    rating: 5,
    approved: true,
    date: "2023-05-15",
  },
  {
    id: 2,
    name: "Michael Chen",
    comment:
      "Their coffee is the best in town, and those croissants are to die for! I stop by every morning on my way to work.",
    rating: 5,
    approved: true,
    date: "2023-05-10",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    comment:
      "We hired Sweet Delights for our wedding dessert table and they exceeded all expectations. Professional, creative, and so tasty!",
    rating: 5,
    approved: true,
    date: "2023-05-05",
  },
  {
    id: 4,
    name: "David Kim",
    comment: "Great pastries but the delivery was a bit late. Otherwise, everything was perfect!",
    rating: 4,
    approved: false,
    date: "2023-05-02",
  },
  {
    id: 5,
    name: "Jennifer Lee",
    comment: "The chocolate cake was amazing but a bit too sweet for my taste.",
    rating: 3,
    approved: false,
    date: "2023-04-28",
  },
]

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [testimonials, setTestimonials] = useState(mockTestimonials)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null)
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    comment: "",
    rating: 5,
    approved: false,
  })

  // Filter testimonials based on active tab
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (activeTab === "approved" && !testimonial.approved) return false
    if (activeTab === "pending" && testimonial.approved) return false
    return true
  })

  const handleAddTestimonial = () => {
    const newId = Math.max(...testimonials.map((item) => item.id)) + 1
    const today = new Date().toISOString().split("T")[0]

    const testimonialToAdd = {
      ...newTestimonial,
      id: newId,
      date: today,
    }

    setTestimonials([...testimonials, testimonialToAdd])
    setIsAddDialogOpen(false)
    setNewTestimonial({
      name: "",
      comment: "",
      rating: 5,
      approved: false,
    })
  }

  const handleEditTestimonial = () => {
    if (!selectedTestimonial) return

    const updatedTestimonials = testimonials.map((testimonial) =>
      testimonial.id === selectedTestimonial.id ? selectedTestimonial : testimonial,
    )

    setTestimonials(updatedTestimonials)
    setIsEditDialogOpen(false)
    setSelectedTestimonial(null)
  }

  const handleDeleteTestimonial = () => {
    if (!selectedTestimonial) return

    const updatedTestimonials = testimonials.filter((testimonial) => testimonial.id !== selectedTestimonial.id)
    setTestimonials(updatedTestimonials)
    setIsDeleteDialogOpen(false)
    setSelectedTestimonial(null)
  }

  const handleApproveTestimonial = (id: number, approved: boolean) => {
    const updatedTestimonials = testimonials.map((testimonial) =>
      testimonial.id === id ? { ...testimonial, approved } : testimonial,
    )
    setTestimonials(updatedTestimonials)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Testimonials Management</h1>
          <p className="text-muted-foreground">Manage customer testimonials and reviews</p>
        </div>
        <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Testimonials</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <TestimonialsList
            testimonials={filteredTestimonials}
            onApprove={handleApproveTestimonial}
            onEdit={(testimonial) => {
              setSelectedTestimonial(testimonial)
              setIsEditDialogOpen(true)
            }}
            onDelete={(testimonial) => {
              setSelectedTestimonial(testimonial)
              setIsDeleteDialogOpen(true)
            }}
          />
        </TabsContent>
        <TabsContent value="approved" className="space-y-4">
          <TestimonialsList
            testimonials={filteredTestimonials}
            onApprove={handleApproveTestimonial}
            onEdit={(testimonial) => {
              setSelectedTestimonial(testimonial)
              setIsEditDialogOpen(true)
            }}
            onDelete={(testimonial) => {
              setSelectedTestimonial(testimonial)
              setIsDeleteDialogOpen(true)
            }}
          />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <TestimonialsList
            testimonials={filteredTestimonials}
            onApprove={handleApproveTestimonial}
            onEdit={(testimonial) => {
              setSelectedTestimonial(testimonial)
              setIsEditDialogOpen(true)
            }}
            onDelete={(testimonial) => {
              setSelectedTestimonial(testimonial)
              setIsDeleteDialogOpen(true)
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Add Testimonial Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Testimonial</DialogTitle>
            <DialogDescription>Add a new customer testimonial</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                placeholder="e.g., John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                value={newTestimonial.comment}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                placeholder="Customer's feedback"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= newTestimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="approved"
                checked={newTestimonial.approved}
                onCheckedChange={(checked) => setNewTestimonial({ ...newTestimonial, approved: checked })}
              />
              <Label htmlFor="approved">Approve for display on website</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTestimonial}>Add Testimonial</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Testimonial Dialog */}
      {selectedTestimonial && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Testimonial</DialogTitle>
              <DialogDescription>Update this customer testimonial</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Customer Name</Label>
                <Input
                  id="edit-name"
                  value={selectedTestimonial.name}
                  onChange={(e) => setSelectedTestimonial({ ...selectedTestimonial, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-comment">Comment</Label>
                <Textarea
                  id="edit-comment"
                  value={selectedTestimonial.comment}
                  onChange={(e) => setSelectedTestimonial({ ...selectedTestimonial, comment: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-rating">Rating</Label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedTestimonial({ ...selectedTestimonial, rating: star })}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= selectedTestimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-approved"
                  checked={selectedTestimonial.approved}
                  onCheckedChange={(checked) => setSelectedTestimonial({ ...selectedTestimonial, approved: checked })}
                />
                <Label htmlFor="edit-approved">Approve for display on website</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditTestimonial}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Testimonial Dialog */}
      {selectedTestimonial && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Testimonial</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this testimonial from {selectedTestimonial.name}? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteTestimonial}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function TestimonialsList({
  testimonials,
  onApprove,
  onEdit,
  onDelete,
}: {
  testimonials: any[]
  onApprove: (id: number, approved: boolean) => void
  onEdit: (testimonial: any) => void
  onDelete: (testimonial: any) => void
}) {
  return (
    <div className="space-y-4">
      {testimonials.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">No testimonials found</div>
      ) : (
        testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={!testimonial.approved ? "border-dashed" : ""}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                  </div>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                  <p className="text-muted-foreground">"{testimonial.comment}"</p>
                </div>
                <div className="flex flex-row md:flex-col gap-2 self-end md:self-start">
                  {testimonial.approved ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 text-green-600"
                      onClick={() => onApprove(testimonial.id, false)}
                    >
                      <Check className="h-4 w-4" />
                      Approved
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      onClick={() => onApprove(testimonial.id, true)}
                    >
                      Approve
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => onEdit(testimonial)}>
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 text-red-600"
                    onClick={() => onDelete(testimonial)}
                  >
                    <Trash className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
