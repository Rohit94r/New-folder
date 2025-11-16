"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Utensils, Shirt, Printer, Building2, Plus, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function ServiceProviderDashboard() {
  const router = useRouter()
  const { login, isLoggedIn } = useAuth()

  useEffect(() => {
    // Auto-login as service provider (owner) if not logged in
    if (!isLoggedIn) {
      login({
        _id: "owner123",
        name: "Service Provider",
        email: "provider@roomeze.com",
        role: "owner"
      })
    }
  }, [isLoggedIn, login])

  const services = [
    {
      id: "mess",
      title: "Add Mess Service",
      description: "Add price/month, meals, location, menu, photos",
      icon: Utensils,
      route: "/service-provider/add/mess",
      color: "bg-orange-100",
      iconColor: "text-orange-600",
      borderColor: "hover:border-orange-500"
    },
    {
      id: "laundry",
      title: "Add Laundry / Ironing Service",
      description: "Add rates, timings, pickup-drop options",
      icon: Shirt,
      route: "/service-provider/add/laundry",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
      borderColor: "hover:border-blue-500"
    },
    {
      id: "printing",
      title: "Add Printing / Xerox Service",
      description: "Add rates per page, color/BW, file upload",
      icon: Printer,
      route: "/service-provider/add/printing",
      color: "bg-purple-100",
      iconColor: "text-purple-600",
      borderColor: "hover:border-purple-500"
    },
    {
      id: "pg",
      title: "Add PG / Hostel Listing",
      description: "Add rooms, photos, distance, rent, amenities",
      icon: Building2,
      route: "/service-provider/add/pg",
      color: "bg-green-100",
      iconColor: "text-green-600",
      borderColor: "hover:border-green-500"
    }
  ]

  const handleServiceClick = (route: string) => {
    router.push(route)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Service Provider Dashboard
            </h1>
          </div>
          <p className="text-lg text-gray-600 ml-15">
            Manage your services and reach thousands of students near Atharva College
          </p>
          
          {/* Add Your Service Button */}
          <div className="mt-6">
            <Button 
              onClick={() => router.push('/service-provider/add')}
              className="bg-red-600 text-white hover:bg-red-700 gap-2 px-6 py-3 text-lg"
            >
              <Plus className="w-5 h-5" />
              Add Your Service
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card 
                key={service.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl ${service.borderColor} border-2 border-gray-200 bg-white animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleServiceClick(service.route)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 ${service.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${service.iconColor}`} />
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    
                    <Button 
                      className="w-full bg-red-600 text-white hover:bg-red-700 gap-2"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleServiceClick(service.route)
                      }}
                    >
                      <Plus className="w-4 h-4" />
                      Add Service
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 max-w-6xl">
          <Card className="p-6 bg-red-50 border-red-200">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              📢 Why List Your Service on Roomeze?
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✓</span>
                <span>Reach thousands of students near Atharva College</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✓</span>
                <span>Get verified leads and genuine inquiries</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✓</span>
                <span>Free listing with premium visibility options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">✓</span>
                <span>Easy-to-use dashboard to manage all your services</span>
              </li>
            </ul>
          </Card>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  )
}
