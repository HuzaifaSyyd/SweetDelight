import { Header } from "@/components/header"
import MenuClientPage from "./MenuClientPage"

export const metadata = {
  title: "Menu - Sweet Delights Bakery",
  description: "Explore our delicious selection of handcrafted treats, cakes, pastries, and beverages.",
}

export default function MenuPage() {
  return (
    <div className="flex min-h-screen flex-col">
      
      <MenuClientPage />
    </div>
  )
}
