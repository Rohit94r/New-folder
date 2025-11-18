"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, Wifi, Car, Utensils, Snowflake, Search, Filter } from "lucide-react"
import { useEffect, useState } from "react"
import { propertiesAPI } from "@/lib/api"

interface Property {
  _id: string
  name: string
  type: string
  description: string
  address: string
  distanceFromCollege: number
  roomSize: string
  rent: number
  deposit: number
  sharingType: string
  amenities: string[]
  availability: string
  occupancy: number
  totalSeats: number
  images: string[]
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        // Fetch properties within 2km of Atharva College
        const data = await propertiesAPI.getNearby()
        setProperties(data)
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load properties. Please try again later."
        setError(errorMessage)
        console.error("Error fetching properties:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi": return <Wifi className="w-4 h-4" />
      case "parking": return <Car className="w-4 h-4" />
      case "food": return <Utensils className="w-4 h-4" />
      case "ac": return <Snowflake className="w-4 h-4" />
      default: return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-foreground">Loading properties...</p>
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">PG & Flats</h1>
            <p className="text-muted-foreground mt-2">
              Verified properties within 2 km of Atharva College
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search properties..."
                className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-foreground">No properties found.</p>
            <p className="text-muted-foreground mt-2">Please check back later for new listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={property.images[0] || "/placeholder.svg"} 
                    alt={property.name} 
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <Building2 className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{property.name}</h3>
                      <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{property.distanceFromCollege} km from college</span>
                      </div>
                    </div>
                    <Badge 
                      className={
                        property.availability === "Available" 
                          ? "bg-green-100 text-green-900" 
                          : property.availability === "Almost Full" 
                            ? "bg-yellow-100 text-yellow-900" 
                            : "bg-red-100 text-red-900"
                      }
                    >
                      {property.availability}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Room Size</p>
                      <p className="font-semibold text-foreground">{property.roomSize || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Sharing</p>
                      <p className="font-semibold text-foreground">{property.sharingType || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rent</p>
                      <p className="font-semibold text-foreground">₹{property.rent}/month</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deposit</p>
                      <p className="font-semibold text-foreground">₹{property.deposit || "N/A"}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {property.amenities && property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary" className="gap-1 flex items-center">
                        {getAmenityIcon(amenity)}
                        <span>{amenity}</span>
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full bg-primary text-primary-foreground">
                    View Details
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