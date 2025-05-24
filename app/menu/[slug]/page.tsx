import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Clock, Users, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"

// This would typically come from a database or API
const menuItems = [
  {
    id: "chocolate-truffle-cake",
    name: "Chocolate Truffle Cake",
    price: 32.99,
    image: "https://i.pinimg.com/736x/4a/2f/b6/4a2fb6f1bd7b8f05e93828ca836f55b4.jpg",
    description: "Rich chocolate layers with truffle filling",
    category: "cakes",
    tags: ["Bestseller"],
    fullDescription:
      "Indulge in our decadent Chocolate Truffle Cake, featuring multiple layers of moist chocolate sponge cake filled with rich chocolate truffle ganache. Each layer is carefully crafted with premium Belgian chocolate and finished with a silky smooth chocolate glaze. This cake is perfect for special occasions or when you simply want to treat yourself to something extraordinary.",
    ingredients: [
      "Premium Belgian chocolate",
      "Fresh eggs",
      "Butter",
      "Heavy cream",
      "Vanilla extract",
      "Cocoa powder",
      "Sugar",
      "Flour",
    ],
    allergens: ["Eggs", "Dairy", "Gluten"],
    nutritionalInfo: {
      calories: 450,
      protein: "6g",
      carbs: "52g",
      fat: "26g",
      sugar: "38g",
    },
    prepTime: "45 minutes",
    servings: "8-10 people",
    difficulty: "Medium",
  },
  {
    id: "vanilla-bean-cake",
    name: "Vanilla Bean Cake",
    price: 28.99,
    image: "https://i.pinimg.com/736x/61/ef/e3/61efe31a917a1d70b23bb8e94ed09901.jpg",
    description: "Light vanilla sponge with buttercream",
    category: "cakes",
    tags: [],
    fullDescription:
      "Our classic Vanilla Bean Cake features light and airy vanilla sponge layers made with real Madagascar vanilla beans. Each layer is filled with smooth vanilla buttercream and finished with a delicate vanilla glaze. This timeless favorite is perfect for any celebration.",
    ingredients: [
      "Madagascar vanilla beans",
      "Fresh eggs",
      "Butter",
      "Heavy cream",
      "Sugar",
      "Flour",
      "Baking powder",
      "Milk",
    ],
    allergens: ["Eggs", "Dairy", "Gluten"],
    nutritionalInfo: {
      calories: 380,
      protein: "5g",
      carbs: "48g",
      fat: "18g",
      sugar: "32g",
    },
    prepTime: "40 minutes",
    servings: "8-10 people",
    difficulty: "Easy",
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    price: 34.99,
    image: "https://i.pinimg.com/736x/25/c6/20/25c620e93456b923a6ad4e6de1ddfafb.jpg",
    description: "Classic red velvet with cream cheese frosting",
    category: "cakes",
    tags: ["Popular"],
    fullDescription:
      "Our signature Red Velvet Cake combines the perfect balance of chocolate and vanilla flavors with a hint of cocoa. The vibrant red layers are complemented by our house-made cream cheese frosting, creating a dessert that's as beautiful as it is delicious.",
    ingredients: [
      "Cocoa powder",
      "Red food coloring",
      "Buttermilk",
      "Fresh eggs",
      "Butter",
      "Cream cheese",
      "Sugar",
      "Flour",
    ],
    allergens: ["Eggs", "Dairy", "Gluten"],
    nutritionalInfo: {
      calories: 420,
      protein: "6g",
      carbs: "55g",
      fat: "20g",
      sugar: "40g",
    },
    prepTime: "50 minutes",
    servings: "8-10 people",
    difficulty: "Medium",
  },
  {
    id: "strawberry-shortcake",
    name: "Strawberry Shortcake",
    price: 30.99,
    image: "https://i.pinimg.com/736x/da/5a/67/da5a67076f9f0f3c8878e102ee9e882c.jpg",
    description: "Fresh strawberries with whipped cream",
    category: "cakes",
    tags: ["Seasonal"],
    fullDescription:
      "Fresh and light Strawberry Shortcake made with fluffy vanilla sponge, fresh seasonal strawberries, and house-made whipped cream. This delightful dessert captures the essence of summer in every bite.",
    ingredients: [
      "Fresh strawberries",
      "Heavy cream",
      "Vanilla extract",
      "Fresh eggs",
      "Butter",
      "Sugar",
      "Flour",
      "Baking powder",
    ],
    allergens: ["Eggs", "Dairy", "Gluten"],
    nutritionalInfo: {
      calories: 350,
      protein: "4g",
      carbs: "45g",
      fat: "16g",
      sugar: "28g",
    },
    prepTime: "35 minutes",
    servings: "6-8 people",
    difficulty: "Easy",
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    price: 3.99,
    image: "https://i.pinimg.com/736x/48/bf/ae/48bfae6b4ef476f4f2e6698d5cb51844.jpg",
    description: "Flaky, buttery French classic",
    category: "pastries",
    tags: ["Bestseller"],
    fullDescription:
      "Our authentic French butter croissants are made with traditional laminated dough technique, creating 81 delicate layers of buttery pastry. Each croissant is hand-rolled and baked fresh every morning to achieve the perfect golden color and flaky texture.",
    ingredients: ["French butter", "Organic flour", "Fresh yeast", "Sea salt", "Organic milk", "Sugar", "Eggs"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 280,
      protein: "5g",
      carbs: "28g",
      fat: "16g",
      sugar: "4g",
    },
    prepTime: "3 days",
    servings: "1 person",
    difficulty: "Hard",
  },
  {
    id: "cinnamon-roll",
    name: "Cinnamon Roll",
    price: 4.5,
    image: "https://i.pinimg.com/736x/36/8f/1c/368f1cc5121ef68890736f05a1f3e20d.jpg",
    description: "Swirled with cinnamon and topped with glaze",
    category: "pastries",
    tags: ["Popular"],
    fullDescription:
      "Soft and fluffy cinnamon rolls made with enriched dough, rolled with cinnamon sugar filling, and topped with our signature cream cheese glaze. Baked fresh daily and served warm.",
    ingredients: ["Cinnamon", "Brown sugar", "Butter", "Flour", "Yeast", "Milk", "Eggs", "Cream cheese"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 320,
      protein: "6g",
      carbs: "42g",
      fat: "14g",
      sugar: "18g",
    },
    prepTime: "2 hours",
    servings: "1 person",
    difficulty: "Medium",
  },
  {
    id: "almond-danish",
    name: "Almond Danish",
    price: 4.99,
    image: "https://i.pinimg.com/736x/9f/73/fa/9f73fab68477662a1ff6f3c47cedbc42.jpg",
    description: "Flaky pastry with almond filling",
    category: "pastries",
    tags: [],
    fullDescription:
      "Traditional Danish pastry made with laminated dough and filled with sweet almond paste. Topped with sliced almonds and a light sugar glaze for the perfect balance of texture and flavor.",
    ingredients: ["Almond paste", "Sliced almonds", "Butter", "Flour", "Yeast", "Milk", "Eggs", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs", "Nuts"],
    nutritionalInfo: {
      calories: 290,
      protein: "7g",
      carbs: "32g",
      fat: "15g",
      sugar: "12g",
    },
    prepTime: "3 hours",
    servings: "1 person",
    difficulty: "Medium",
  },
  {
    id: "chocolate-eclair",
    name: "Chocolate Éclair",
    price: 5.5,
    image: "https://i.pinimg.com/736x/0b/aa/c3/0baac321a49b8ed2fc170691fdbf6201.jpg",
    description: "Filled with custard and topped with chocolate",
    category: "pastries",
    tags: [],
    fullDescription:
      "Classic French éclair made with choux pastry, filled with rich vanilla custard, and topped with glossy chocolate ganache. A sophisticated pastry that melts in your mouth.",
    ingredients: ["Choux pastry", "Vanilla custard", "Chocolate ganache", "Eggs", "Butter", "Flour", "Milk", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 310,
      protein: "6g",
      carbs: "28g",
      fat: "19g",
      sugar: "16g",
    },
    prepTime: "2 hours",
    servings: "1 person",
    difficulty: "Hard",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 4.5,
    image: "https://i.pinimg.com/736x/6a/86/c3/6a86c387495a30851e5843a582c7b6f2.jpg",
    description: "Espresso with steamed milk and foam",
    category: "drinks",
    tags: ["Bestseller"],
    fullDescription:
      "Perfect cappuccino made with our signature espresso blend, steamed milk, and topped with velvety microfoam. Served at the ideal temperature for the perfect coffee experience.",
    ingredients: ["Espresso beans", "Whole milk", "Optional: sugar", "Optional: cinnamon"],
    allergens: ["Dairy"],
    nutritionalInfo: {
      calories: 120,
      protein: "6g",
      carbs: "9g",
      fat: "6g",
      sugar: "9g",
    },
    prepTime: "3 minutes",
    servings: "1 person",
    difficulty: "Easy",
  },
  {
    id: "vanilla-latte",
    name: "Vanilla Latte",
    price: 5.25,
    image: "https://i.pinimg.com/736x/03/47/6e/03476e1a455fbad5eda2bc5679872a80.jpg",
    description: "Espresso with vanilla and steamed milk",
    category: "drinks",
    tags: [],
    fullDescription:
      "Smooth and creamy vanilla latte made with our premium espresso, steamed milk, and house-made vanilla syrup. A comforting drink that's perfect any time of day.",
    ingredients: ["Espresso beans", "Whole milk", "Vanilla syrup", "Optional: whipped cream"],
    allergens: ["Dairy"],
    nutritionalInfo: {
      calories: 190,
      protein: "8g",
      carbs: "22g",
      fat: "7g",
      sugar: "20g",
    },
    prepTime: "4 minutes",
    servings: "1 person",
    difficulty: "Easy",
  },
  {
    id: "chocolate-milkshake",
    name: "Chocolate Milkshake",
    price: 6.5,
    image: "https://i.pinimg.com/736x/ca/57/a0/ca57a06fff117a65d682652338581c26.jpg",
    description: "Rich chocolate ice cream blended to perfection",
    category: "drinks",
    tags: ["Popular"],
    fullDescription:
      "Thick and creamy chocolate milkshake made with premium chocolate ice cream, whole milk, and chocolate syrup. Topped with whipped cream and a cherry for the ultimate indulgence.",
    ingredients: ["Chocolate ice cream", "Whole milk", "Chocolate syrup", "Whipped cream", "Cherry"],
    allergens: ["Dairy"],
    nutritionalInfo: {
      calories: 450,
      protein: "8g",
      carbs: "58g",
      fat: "22g",
      sugar: "52g",
    },
    prepTime: "2 minutes",
    servings: "1 person",
    difficulty: "Easy",
  },
  {
    id: "strawberry-smoothie",
    name: "Strawberry Smoothie",
    price: 5.99,
    image: "https://i.pinimg.com/736x/ae/97/97/ae9797277171f0a9a3ccafc7d96e234b.jpg",
    description: "Fresh strawberries blended with yogurt",
    category: "drinks",
    tags: ["Seasonal"],
    fullDescription:
      "Refreshing strawberry smoothie made with fresh seasonal strawberries, Greek yogurt, and a touch of honey. A healthy and delicious option packed with vitamins and probiotics.",
    ingredients: ["Fresh strawberries", "Greek yogurt", "Honey", "Ice", "Optional: mint"],
    allergens: ["Dairy"],
    nutritionalInfo: {
      calories: 180,
      protein: "12g",
      carbs: "28g",
      fat: "3g",
      sugar: "24g",
    },
    prepTime: "2 minutes",
    servings: "1 person",
    difficulty: "Easy",
  },
  {
    id: "chocolate-tart",
    name: "Chocolate Tart",
    price: 6.99,
    image: "https://i.pinimg.com/736x/e8/a3/4d/e8a34dcb92985334dc9fceb9b7f9140b.jpg",
    description: "Rich chocolate ganache in buttery crust",
    category: "desserts",
    tags: ["Bestseller"],
    fullDescription:
      "Decadent chocolate tart featuring a crisp buttery pastry shell filled with rich dark chocolate ganache. Finished with a dusting of cocoa powder and served with fresh berries.",
    ingredients: ["Dark chocolate", "Heavy cream", "Butter", "Flour", "Sugar", "Eggs", "Cocoa powder"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 380,
      protein: "5g",
      carbs: "32g",
      fat: "26g",
      sugar: "24g",
    },
    prepTime: "3 hours",
    servings: "1 person",
    difficulty: "Medium",
  },
  {
    id: "vanilla-pudding",
    name: "Vanilla Pudding",
    price: 5.5,
    image: "https://i.pinimg.com/736x/08/db/ee/08dbee07064dd7570943aee23cf6cac0.jpg",
    description: "Creamy vanilla pudding with caramel",
    category: "desserts",
    tags: [],
    fullDescription:
      "Silky smooth vanilla pudding made with real vanilla beans and topped with house-made caramel sauce. A classic comfort dessert that brings back childhood memories.",
    ingredients: ["Vanilla beans", "Whole milk", "Heavy cream", "Sugar", "Eggs", "Cornstarch", "Caramel sauce"],
    allergens: ["Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 250,
      protein: "6g",
      carbs: "32g",
      fat: "11g",
      sugar: "28g",
    },
    prepTime: "30 minutes",
    servings: "1 person",
    difficulty: "Easy",
  },
  {
    id: "chocolate-chip-cookie",
    name: "Chocolate Chip Cookie",
    price: 2.99,
    image: "https://i.pinimg.com/736x/26/fa/2f/26fa2fda58995d96010d696a0bd0aac2.jpg",
    description: "Classic cookie with chocolate chunks",
    category: "desserts",
    tags: ["Popular"],
    fullDescription:
      "The perfect chocolate chip cookie with crispy edges and a chewy center. Made with premium chocolate chunks and a hint of sea salt for the ultimate cookie experience.",
    ingredients: [
      "Chocolate chunks",
      "Butter",
      "Brown sugar",
      "White sugar",
      "Eggs",
      "Flour",
      "Baking soda",
      "Sea salt",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 180,
      protein: "3g",
      carbs: "24g",
      fat: "8g",
      sugar: "16g",
    },
    prepTime: "20 minutes",
    servings: "1 person",
    difficulty: "Easy",
  },
  {
    id: "lemon-tart",
    name: "Lemon Tart",
    price: 6.99,
    image: "https://i.pinimg.com/736x/c9/a7/c2/c9a7c2db18d525701d7bd2ca8f52f80d.jpg",
    description: "Tangy lemon filling in sweet crust",
    category: "desserts",
    tags: [],
    fullDescription:
      "Bright and zesty lemon tart with a smooth lemon curd filling in a crisp sweet pastry shell. Topped with a light meringue and torched to perfection for a beautiful finish.",
    ingredients: ["Fresh lemons", "Lemon zest", "Eggs", "Butter", "Sugar", "Flour", "Meringue"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    nutritionalInfo: {
      calories: 320,
      protein: "4g",
      carbs: "42g",
      fat: "15g",
      sugar: "35g",
    },
    prepTime: "2 hours",
    servings: "1 person",
    difficulty: "Medium",
  },
]

export async function generateStaticParams() {
  return menuItems.map((item) => ({
    slug: item.id,
  }))
}

export default function MenuItemPage({ params }: { params: { slug: string } }) {
  const item = menuItems.find((item) => item.id === params.slug)

  if (!item) {
    notFound()
  }

  const relatedItems = menuItems
    .filter((relatedItem) => relatedItem.category === item.category && relatedItem.id !== item.id)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1">
        <div className="container py-8">
          {/* Back Button */}
          <Link href="/menu" className="inline-flex items-center gap-2 text-pink-500 hover:text-pink-600 mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" priority />
                {item.tags.length > 0 && <Badge className="absolute top-4 right-4 bg-pink-500">{item.tags[0]}</Badge>}
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-pink-600 border-pink-200">
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
                <p className="text-2xl font-bold text-pink-600 mb-4">${item.price.toFixed(2)}</p>
                <p className="text-muted-foreground leading-relaxed">{item.fullDescription}</p>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-pink-500" />
                  <div className="text-sm font-medium">{item.prepTime}</div>
                  <div className="text-xs text-muted-foreground">Prep Time</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 mx-auto mb-2 text-pink-500" />
                  <div className="text-sm font-medium">{item.servings}</div>
                  <div className="text-xs text-muted-foreground">Servings</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <ChefHat className="h-6 w-6 mx-auto mb-2 text-pink-500" />
                  <div className="text-sm font-medium">{item.difficulty}</div>
                  <div className="text-xs text-muted-foreground">Difficulty</div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button className="w-full bg-pink-500 hover:bg-pink-600" size="lg">
                  Add to Cart - ${item.price.toFixed(2)}
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  Add to Favorites
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Ingredients */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {item.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Nutritional Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Nutritional Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Calories</span>
                    <span className="text-sm font-medium">{item.nutritionalInfo.calories}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Protein</span>
                    <span className="text-sm font-medium">{item.nutritionalInfo.protein}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Carbs</span>
                    <span className="text-sm font-medium">{item.nutritionalInfo.carbs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Fat</span>
                    <span className="text-sm font-medium">{item.nutritionalInfo.fat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sugar</span>
                    <span className="text-sm font-medium">{item.nutritionalInfo.sugar}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Allergens */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Allergen Information</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">Contains:</p>
                  {item.allergens.map((allergen, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {allergen}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Please inform our staff of any allergies before ordering.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedItems.map((relatedItem) => (
                  <Link key={relatedItem.id} href={`/menu/${relatedItem.id}`}>
                    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-105">
                      <div className="relative h-48">
                        <Image
                          src={relatedItem.image || "/placeholder.svg"}
                          alt={relatedItem.name}
                          fill
                          className="object-cover"
                        />
                        {relatedItem.tags.length > 0 && (
                          <Badge className="absolute top-2 right-2 bg-pink-500">{relatedItem.tags[0]}</Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-lg mb-1">{relatedItem.name}</h3>
                        <p className="text-muted-foreground text-sm mb-2">{relatedItem.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-lg text-pink-600">${relatedItem.price.toFixed(2)}</span>
                          <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
