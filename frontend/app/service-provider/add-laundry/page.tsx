"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shirt, ArrowLeft } from "lucide-react"
import { laundryAPI } from "@/lib/api"
import { getAuthToken } from "@/lib/auth"

export default function AddLaundryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    timings: "",
    washAndFoldRate: "",
    ironingRate: "",
    deliveryAvailable: false,
    deliveryCharges: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = getAuthToken()
      if (!token) {
        alert("Please login as a service provider to add services")
        router.push("/select-role")
        return
      }

      // Prepare data matching backend schema
      const laundryData = {
        name: formData.name,
        description: formData.description,
        address: formData.address,
        phone: formData.phone,
        timings: formData.timings,
        pricing: {
          washAndFold: parseFloat(formData.washAndFoldRate) || 0,
          ironing: parseFloat(formData.ironingRate) || 0
        },
        deliveryAvailable: formData.deliveryAvailable,
        deliveryCharges: parseFloat(formData.deliveryCharges) || 0,
        image: "https://via.placeholder.com/400x300?text=Laundry+Service"
      }

      await laundryAPI.create(laundryData, token)

      alert("Laundry service added successfully! ✅")
      router.push("/service-provider-dashboard")
    } catch (error: any) {
      console.error("Error adding laundry service:", error)
      alert(error.message || "Failed to add laundry service. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shirt className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add Laundry / Ironing Service</h1>
              <p className="text-gray-600">Fill in the details to list your laundry service</p>
            </div>
          </div>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Quick Wash Laundry" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of your service" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wash & Fold Rate (₹/kg) *</label>
                    <input type="number" name="washAndFoldRate" value={formData.washAndFoldRate} onChange={handleChange} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 50" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ironing Rate (₹/piece)</label>
                    <input type="number" name="ironingRate" value={formData.ironingRate} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 10" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timings</label>
                    <input type="text" name="timings" value={formData.timings} onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 8:00 AM - 8:00 PM" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" name="deliveryAvailable" checked={formData.deliveryAvailable} onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                      <span className="text-sm text-gray-700">Delivery Available</span>
                    </label>
                    {formData.deliveryAvailable && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Charges (₹)</label>
                        <input type="number" name="deliveryCharges" value={formData.deliveryCharges} onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="e.g., 50" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location & Contact</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} required rows={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Complete address with area and landmarks" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 9876543210" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">Cancel</Button>
                <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white hover:bg-blue-700">
                  {loading ? "Submitting..." : "Submit Laundry Service"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
