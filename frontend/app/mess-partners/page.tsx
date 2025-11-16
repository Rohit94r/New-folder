"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Utensils, Star, Phone, MapPin, Clock, CheckCircle, Menu, IndianRupee } from "lucide-react"
import { useEffect, useState } from "react"
import { messAPI } from "@/lib/api"

interface Meal {
  name: string
  items: string
  price: number
}

interface Mess {
  _id: string
  name: string
  description: string
  cuisine: string
  address: string
  phone: string
  timings: string
  isOfficial: boolean
  rating: number
  reviews: number
  image: string
  menu: Meal[]
  priceRange?: string
  distance?: number
}

// Atharva Canteen fixed data
const ATHARVA_CANTEEN_DATA = {
  name: "Atharva Canteen",
  isOfficial: true,
  logo: "/atharva-logo.png",
  timings: {
    breakfast: "7:00 AM – 9:30 AM",
    lunch: "12:00 PM – 2:00 PM",
    snacks: "4:00 PM – 5:30 PM",
    dinner: "6:30 PM – 8:30 PM"
  },
  prices: {
    breakfast: "₹30–50",
    lunch: "₹60–80",
    snacks: "₹20–40",
    dinner: "₹50–70"
  },
  phone: "+91 22 1234 5678",
  location: "Near Main Gate",
  weeklyMenu: [
    { day: "Monday", breakfast: "Poha, Jalebi", lunch: "Rice, Dal", dinner: "Paneer Masala" },
    { day: "Tuesday", breakfast: "Upma", lunch: "Sambar, Rice", dinner: "Pav Bhaji" },
    { day: "Wednesday", breakfast: "Idli", lunch: "Dal, Chapati", dinner: "Pasta" },
    { day: "Thursday", breakfast: "Paratha", lunch: "Chana Dal", dinner: "Pulao" },
    { day: "Friday", breakfast: "Poori", lunch: "Paneer", dinner: "Biryani" },
    { day: "Saturday", breakfast: "Dosa", lunch: "Rajma", dinner: "Noodles" },
    { day: "Sunday", breakfast: "Eggs", lunch: "Keema", dinner: "Pizza" }
  ]
}

export default function MessPartnersPage() {
  const [messPartners, setMessPartners] = useState<Mess[]>([])
  const [officialMess, setOfficialMess] = useState<any>(ATHARVA_CANTEEN_DATA)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("menu")

  useEffect(() => {
    const fetchMessPartners = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch all mess partners
        try {
          const allMessResponse = await messAPI.getAll()
          const allMessData = allMessResponse.data || allMessResponse
          
          // Filter out official mess from the list
          const partners = Array.isArray(allMessData) 
            ? allMessData.filter((mess: Mess) => !mess.isOfficial)
            : []
            
          setMessPartners(partners)
        } catch (allMessError: any) {
          console.error("Error fetching all mess partners:", allMessError)
          setMessPartners([])
        }
      } catch (err: any) {
        setError("Failed to load mess partners. Please try again later.")
        console.error("Error fetching mess partners:", err.response?.data || err.message || err)
      } finally {
        setLoading(false)
      }
    }

    fetchMessPartners()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-foreground">Loading mess partners...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-2xl mx-auto" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mess & Canteen Partners</h1>
        <p className="text-muted-foreground mb-8">
          Official canteen and nearby mess options for students
        </p>

        {/* Atharva Canteen Card - Always shown first */}
        <Card className="mb-12 overflow-hidden border-2 border-red-500 bg-red-50">
          <div className="md:flex">
            <div className="md:w-1/3 bg-red-500 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="bg-white rounded-full p-4 inline-block mb-4">
                  <Utensils className="w-16 h-16 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Atharva Canteen</h2>
                <Badge className="bg-white text-red-500 flex items-center gap-1 mx-auto">
                  <CheckCircle className="w-4 h-4" />
                  Official Canteen
                </Badge>
              </div>
            </div>
            
            <div className="md:w-2/3 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-foreground">Atharva Canteen</h2>
                    <Badge className="bg-red-500 text-white flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Official Partner
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">The official canteen of Atharva College of Engineering</p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 mb-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-foreground">4.5</span>
                    <span className="text-muted-foreground">(128 reviews)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Multi-Cuisine</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{ATHARVA_CANTEEN_DATA.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{ATHARVA_CANTEEN_DATA.location}</span>
                </div>
              </div>
              
              <div className="border-t border-border pt-6">
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => setActiveTab("menu")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeTab === "menu"
                        ? "bg-red-500 text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Menu className="w-4 h-4 inline mr-2" />
                    Weekly Menu
                  </button>
                  <button
                    onClick={() => setActiveTab("pricing")}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      activeTab === "pricing"
                        ? "bg-red-500 text-white"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <IndianRupee className="w-4 h-4 inline mr-2" />
                    Pricing
                  </button>
                </div>
                
                {activeTab === "menu" && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Day</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Breakfast</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Lunch</th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-foreground">Dinner</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {ATHARVA_CANTEEN_DATA.weeklyMenu.map((dayMenu, index) => (
                          <tr key={index} className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-medium text-foreground">{dayMenu.day}</td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-sm">{dayMenu.breakfast}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-sm">{dayMenu.lunch}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-sm">{dayMenu.dinner}</p>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {activeTab === "pricing" && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="p-4 text-center bg-white">
                      <h3 className="font-semibold text-foreground mb-2">Breakfast</h3>
                      <p className="text-2xl font-bold text-red-500">{ATHARVA_CANTEEN_DATA.prices.breakfast}</p>
                      <p className="text-sm text-muted-foreground mt-1">7:00 AM – 9:30 AM</p>
                    </Card>
                    <Card className="p-4 text-center bg-white">
                      <h3 className="font-semibold text-foreground mb-2">Lunch</h3>
                      <p className="text-2xl font-bold text-red-500">{ATHARVA_CANTEEN_DATA.prices.lunch}</p>
                      <p className="text-sm text-muted-foreground mt-1">12:00 PM – 2:00 PM</p>
                    </Card>
                    <Card className="p-4 text-center bg-white">
                      <h3 className="font-semibold text-foreground mb-2">Snacks</h3>
                      <p className="text-2xl font-bold text-red-500">{ATHARVA_CANTEEN_DATA.prices.snacks}</p>
                      <p className="text-sm text-muted-foreground mt-1">4:00 PM – 5:30 PM</p>
                    </Card>
                    <Card className="p-4 text-center bg-white">
                      <h3 className="font-semibold text-foreground mb-2">Dinner</h3>
                      <p className="text-2xl font-bold text-red-500">{ATHARVA_CANTEEN_DATA.prices.dinner}</p>
                      <p className="text-sm text-muted-foreground mt-1">6:30 PM – 8:30 PM</p>
                    </Card>
                  </div>
                )}
                
                <div className="flex gap-3 mt-6">
                  <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
  </Button>
                  <Button className="flex-1 bg-red-500 hover:bg-red-600 text-white gap-2">
                    <Utensils className="w-4 h-4" />
                    Order Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <h2 className="text-2xl font-bold text-foreground mb-6">Nearby Student Mess Options</h2>
        
        {messPartners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground">No mess partners found.</p>
            <p className="text-muted-foreground mt-2">Please check back later for new listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messPartners.map((mess) => (
              <Card key={mess._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {mess.image ? (
                  <img 
                    src={mess.image} 
                    alt={mess.name} 
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <Utensils className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-foreground">{mess.name}</h3>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm text-foreground">{mess.rating || "N/A"}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">({mess.reviews || 0} reviews)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{mess.priceRange || "₹50-150"}</span>
                    </div>
                    {mess.distance && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{mess.distance} km away</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{mess.cuisine || "Multi-Cuisine"}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-primary text-primary-foreground gap-2">
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}