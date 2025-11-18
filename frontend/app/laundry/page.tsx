"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Clock, MapPin, Shirt, Truck } from "lucide-react"
import { useEffect, useState } from "react"
import { laundryAPI } from "@/lib/api"
import { formatCurrency } from "@/lib/utils"

interface LaundryService {
  _id: string
  name: string
  description: string
  address: string
  phone: string
  timings: string
  pricing: {
    washAndFold: number
    ironing: number
  }
  deliveryAvailable: boolean
  deliveryCharges: number
  rating: number
  reviews: number
  image: string
}

export default function LaundryPage() {
  const [laundryServices, setLaundryServices] = useState<LaundryService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLaundryServices = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await laundryAPI.getAll()
        setLaundryServices(data)
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load laundry services. Please try again later."
        setError(errorMessage)
        console.error("Error fetching laundry services:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLaundryServices()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-foreground">Loading laundry services...</p>
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
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Laundry & Ironing Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find reliable laundry and ironing services near Atharva College. Most providers offer pickup and delivery services.
          </p>
        </div>

        {laundryServices.length === 0 ? (
          <div className="text-center py-12">
            <Shirt className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No laundry services found</h3>
            <p className="text-muted-foreground mb-4">Please check back later for new listings.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laundryServices.map((service) => (
              <Card key={service._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {service.image ? (
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <Shirt className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-foreground">{service.rating || "N/A"}</span>
                      <span className="text-xs text-muted-foreground">({service.reviews || 0})</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{service.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{service.timings}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{service.phone}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Wash & Fold</p>
                      <p className="font-semibold text-foreground">{formatCurrency(service.pricing.washAndFold)}/cloth</p>
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground">Ironing</p>
                      <p className="font-semibold text-foreground">{formatCurrency(service.pricing.ironing)}/cloth</p>
                    </div>
                  </div>
                  
                  {service.deliveryAvailable && (
                    <div className="flex items-center gap-2 mb-4">
                      <Truck className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">
                        Delivery available ({formatCurrency(service.deliveryCharges)} delivery charges)
                      </span>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full bg-primary text-primary-foreground gap-2"
                    onClick={() => window.location.href = `tel:${service.phone}`}
                  >
                    <Phone className="w-4 h-4" />
                    Book Pickup
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