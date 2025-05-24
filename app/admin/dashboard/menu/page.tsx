"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, Plus, Search, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

// Mock data for menu items
const mockMenuItems = [
  {
    id: 1,
    name: "Chocolate Truffle Cake",
    description: "Rich chocolate layers with truffle filling",
    price: 32.99,
    category: "Cakes",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
    available: true,
  },
  {
    id: 2,
    name: "Vanilla Bean Cake",
    description: "Light vanilla sponge with buttercream",
    price: 28.99,
    category: "Cakes",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
    available: true,
  },
  {
    id: 3,
    name: "Red Velvet Cake",
    description: "Classic red velvet with cream cheese frosting",
    price: 34.99,
    category: "Cakes",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
    available: true,
  },
  {
    id: 4,
    name: "Butter Croissant",
    description: "Flaky, buttery French classic",
    price: 3.99,
    category: "Pastries",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
    available: true,
  },
  {
    id: 5,
    name: "Cinnamon Roll",
    description: "Swirled with cinnamon and topped with glaze",
    price: 4.5,
    category: "Pastries",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
    available: true,
  },
  {
    id: 6,
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    price: 4.5,
    category: "Drinks",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
    available: true,
  },
  {
    id: 7,
    name: "Vanilla Latte",
    description: "Espresso with vanilla and steamed milk",
    price: 5.25,
    category: "Drinks",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
    available: true,
  },
  {
    id: 8,
    name: "Chocolate Tart",
    description: "Rich chocolate ganache in buttery crust",
    price: 6.99,
    category: "Desserts",
    image: "/placeholder.svg?height=300&width=300",
    featured: true,
    available: true,
  },
]

export default function MenuManagementPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [menuItems, setMenuItems] = useState(mockMenuItems)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "Cakes",
    image: "/placeholder.svg?height=300&width=300",
    featured: false,
    available: true,
  })

  // Filter menu items based on active tab and search query
  const filteredItems = menuItems.filter((item) => {
    // Filter by tab
    if (activeTab !== "all" && item.category.toLowerCase() !== activeTab.toLowerCase()) return false

    // Filter by search query
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false

    return true
  })

  const handleAddItem = () => {
    const price = Number.parseFloat(newItem.price)
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price")
      return
    }

    const newId = Math.max(...menuItems.map((item) => item.id)) + 1
    const itemToAdd = {
      ...newItem,
      id: newId,
      price: price,
    }

    setMenuItems([...menuItems, itemToAdd])
    setIsAddDialogOpen(false)
    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "Cakes",
      image: "/placeholder.svg?height=300&width=300",
      featured: false,
      available: true,
    })

    // In a real app, you would send a notification to subscribed users
    console.log("Sending notification about new menu item:", itemToAdd.name)
  }

  const handleEditItem = () => {
    if (!selectedItem) return

    const price = Number.parseFloat(selectedItem.price.toString())
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price")
      return
    }

    const updatedItems = menuItems.map((item) =>
      item.id === selectedItem.id ? { ...selectedItem, price: price } : item,
    )

    setMenuItems(updatedItems)
    setIsEditDialogOpen(false)
    setSelectedItem(null)
  }

  const handleDeleteItem = () => {
    if (!selectedItem) return

    const updatedItems = menuItems.filter((item) => item.id !== selectedItem.id)
    setMenuItems(updatedItems)
    setIsDeleteDialogOpen(false)
    setSelectedItem(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <p className="text-muted-foreground">Add, edit, and manage your menu items</p>
        </div>
        <Button className="bg-pink-500 hover:bg-pink-600" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Item
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="cakes">Cakes</TabsTrigger>
          <TabsTrigger value="pastries">Pastries</TabsTrigger>
          <TabsTrigger value="drinks">Drinks</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <MenuItemsGrid
            items={filteredItems}
            onEdit={(item) => {
              setSelectedItem(item)
              setIsEditDialogOpen(true)
            }}
            onDelete={(item) => {
              setSelectedItem(item)
              setIsDeleteDialogOpen(true)
            }}
          />
        </TabsContent>
        <TabsContent value="cakes" className="space-y-4">
          <MenuItemsGrid
            items={filteredItems}
            onEdit={(item) => {
              setSelectedItem(item)
              setIsEditDialogOpen(true)
            }}
            onDelete={(item) => {
              setSelectedItem(item)
              setIsDeleteDialogOpen(true)
            }}
          />
        </TabsContent>
        <TabsContent value="pastries" className="space-y-4">
          <MenuItemsGrid
            items={filteredItems}
            onEdit={(item) => {
              setSelectedItem(item)
              setIsEditDialogOpen(true)
            }}
            onDelete={(item) => {
              setSelectedItem(item)
              setIsDeleteDialogOpen(true)
            }}
          />
        </TabsContent>
        <TabsContent value="drinks" className="space-y-4">
          <MenuItemsGrid
            items={filteredItems}
            onEdit={(item) => {
              setSelectedItem(item)
              setIsEditDialogOpen(true)
            }}
            onDelete={(item) => {
              setSelectedItem(item)
              setIsDeleteDialogOpen(true)
            }}
          />
        </TabsContent>
        <TabsContent value="desserts" className="space-y-4">
          <MenuItemsGrid
            items={filteredItems}
            onEdit={(item) => {
              setSelectedItem(item)
              setIsEditDialogOpen(true)
            }}
            onDelete={(item) => {
              setSelectedItem(item)
              setIsDeleteDialogOpen(true)
            }}
          />
        </TabsContent>
      </Tabs>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Menu Item</DialogTitle>
            <DialogDescription>Add a new item to your menu</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="e.g., Chocolate Cake"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Brief description of the item"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  placeholder="e.g., 12.99"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cakes">Cakes</SelectItem>
                    <SelectItem value="Pastries">Pastries</SelectItem>
                    <SelectItem value="Drinks">Drinks</SelectItem>
                    <SelectItem value="Desserts">Desserts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={newItem.image}
                onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                placeholder="URL to item image"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={newItem.featured}
                  onCheckedChange={(checked) => setNewItem({ ...newItem, featured: checked })}
                />
                <Label htmlFor="featured">Featured Item</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={newItem.available}
                  onCheckedChange={(checked) => setNewItem({ ...newItem, available: checked })}
                />
                <Label htmlFor="available">Available</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem}>Add Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      {selectedItem && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
              <DialogDescription>Update the details of this menu item</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Item Name</Label>
                <Input
                  id="edit-name"
                  value={selectedItem.name}
                  onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedItem.description}
                  onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price ($)</Label>
                  <Input
                    id="edit-price"
                    value={selectedItem.price}
                    onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                    type="number"
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={selectedItem.category}
                    onValueChange={(value) => setSelectedItem({ ...selectedItem, category: value })}
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cakes">Cakes</SelectItem>
                      <SelectItem value="Pastries">Pastries</SelectItem>
                      <SelectItem value="Drinks">Drinks</SelectItem>
                      <SelectItem value="Desserts">Desserts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={selectedItem.image}
                  onChange={(e) => setSelectedItem({ ...selectedItem, image: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-featured"
                    checked={selectedItem.featured}
                    onCheckedChange={(checked) => setSelectedItem({ ...selectedItem, featured: checked })}
                  />
                  <Label htmlFor="edit-featured">Featured Item</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-available"
                    checked={selectedItem.available}
                    onCheckedChange={(checked) => setSelectedItem({ ...selectedItem, available: checked })}
                  />
                  <Label htmlFor="edit-available">Available</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditItem}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Item Dialog */}
      {selectedItem && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Delete Menu Item</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{selectedItem.name}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteItem}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function MenuItemsGrid({
  items,
  onEdit,
  onDelete,
}: { items: any[]; onEdit: (item: any) => void; onDelete: (item: any) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.length === 0 ? (
        <div className="col-span-full py-12 text-center text-muted-foreground">No menu items found</div>
      ) : (
        items.map((item) => (
          <Card key={item.id} className={!item.available ? "opacity-60" : ""}>
            <div className="relative h-48">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover rounded-t-lg"
              />
              {item.featured && (
                <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Featured
                </div>
              )}
              {!item.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold">Not Available</span>
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </div>
                <span className="font-bold">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => onDelete(item)}>
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
