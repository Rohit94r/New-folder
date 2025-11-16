"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  Users, 
  Home, 
  Settings, 
  LogOut, 
  Eye, 
  Plus, 
  Edit, 
  Upload, 
  Trash2, 
  Phone, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Calendar,
  Image as ImageIcon,
  Menu as MenuIcon,
  X
} from "lucide-react"
import { useState, useEffect } from "react"
import { ownerAPI } from "@/lib/api"
import { useAuth } from "@/context/auth-context"

interface Lead {
  id: number
  name: string
  phone: string
  email: string
  propertyInterest: string
  date: string
  status: "New" | "Contacted" | "Interested" | "Not Interested"
}

interface Property {
  _id: string
  name: string
  type: string
  rent: number
  occupancy: number
  totalSeats: number
  views: number
  inquiries: number
  status: "Active" | "Inactive"
  image: string
}

interface DashboardData {
  properties: number
  messPartners: number
  laundryServices: number
  printingServices: number
  events: number
  propertiesList: Property[]
  messPartnersList: any[]
  laundryServicesList: any[]
  printingServicesList: any[]
  eventsList: any[]
}

export default function OwnerDashboardPage() {
  const { isLoggedIn, logout } = useAuth()
  const [selectedTab, setSelectedTab] = useState("overview")
  const [showPhoneNumber, setShowPhoneNumber] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // In a real app, you would get this from authentication
  const authToken = "sample-auth-token"

  useEffect(() => {
    if (isLoggedIn) {
      const fetchDashboardData = async () => {
        try {
          setLoading(true)
          const data = await ownerAPI.getDashboard(authToken)
          setDashboardData(data)
        } catch (err) {
          setError("Failed to load dashboard data. Please try again later.")
          console.error("Error fetching dashboard data:", err)
        } finally {
          setLoading(false)
        }
      }

      fetchDashboardData()
    }
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 flex items-center justify-center">
          <div className="max-w-md w-full px-4">
            <Card className="p-8">
              <h1 className="text-3xl font-bold text-foreground mb-6 text-center">Service Provider Login</h1>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">OTP</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button variant="outline">Send OTP</Button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => {
                  // In a real app, you would call the login API
                  // For now, we'll just simulate a successful login
                  // The auth context will handle this
                }} 
                className="w-full bg-primary text-primary-foreground"
              >
                Login
              </Button>

              <p className="text-center text-sm text-muted-foreground mt-6">New provider? Contact support to register</p>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-foreground">Loading dashboard...</p>
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
        <main className="flex-1 flex items-center justify-center">
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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex">
        {/* Mobile sidebar toggle */}
        <button 
          className="md:hidden fixed top-20 left-4 z-30 bg-primary text-primary-foreground p-2 rounded-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>

        {/* Sidebar */}
        <div className={`fixed md:relative z-20 h-full bg-background border-r border-border w-64 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-bold text-foreground">Owner Dashboard</h2>
            <p className="text-sm text-muted-foreground">Manage your services</p>
          </div>
          
          <nav className="p-4 space-y-2">
            <button
              onClick={() => {
                setSelectedTab("overview")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "overview" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Overview</span>
            </button>
            
            <button
              onClick={() => {
                setSelectedTab("properties")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "properties" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>My Services</span>
            </button>
            
            <button
              onClick={() => {
                setSelectedTab("add-service")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "add-service" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>Add New</span>
            </button>
            
            <button
              onClick={() => {
                setSelectedTab("menu")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "menu" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Update Menu</span>
            </button>
            
            <button
              onClick={() => {
                setSelectedTab("pricing")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "pricing" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <IndianRupee className="w-5 h-5" />
              <span>Pricing</span>
            </button>
            
            <button
              onClick={() => {
                setSelectedTab("photos")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "photos" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              <span>Photos</span>
            </button>
            
            <button
              onClick={() => {
                setSelectedTab("leads")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "leads" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Student Leads</span>
            </button>
            
            <button
              onClick={() => {
                setSelectedTab("settings")
                setSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                selectedTab === "settings" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header with Owner Info */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Rajesh!</h1>
                <p className="text-muted-foreground">Manage your services and track student inquiries</p>
              </div>
              <Button variant="outline" onClick={() => logout()} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>

            {/* Tabs for larger screens */}
            <div className="hidden md:block mb-8">
              <div className="grid w-full grid-cols-8 bg-muted rounded-lg p-1">
                <button 
                  onClick={() => setSelectedTab("overview")}
                  className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === "overview" 
                      ? "bg-background text-foreground shadow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setSelectedTab("properties")}
                  className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === "properties" 
                      ? "bg-background text-foreground shadow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  My Services
                </button>
                <button 
                  onClick={() => setSelectedTab("add-service")}
                  className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === "add-service" 
                      ? "bg-background text-foreground shadow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Add New
                </button>
                <button 
                  onClick={() => setSelectedTab("menu")}
                  className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === "menu" 
                      ? "bg-background text-foreground shadow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Update Menu
                </button>
                <button 
                  onClick={() => setSelectedTab("pricing")}
                  className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === "pricing" 
                      ? "bg-background text-foreground shadow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Pricing
                </button>
                <button 
                  onClick={() => setSelectedTab("photos")}
                  className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === "photos" 
                      ? "bg-background text-foreground shadow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Photos
                </button>
                <button 
                  onClick={() => setSelectedTab("leads")}
                  className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === "leads" 
                      ? "bg-background text-foreground shadow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Student Leads
                </button>
                <button 
                  onClick={() => setSelectedTab("settings")}
                  className={`py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    selectedTab === "settings" 
                      ? "bg-background text-foreground shadow" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Settings
                </button>
              </div>
            </div>

            {/* Overview Tab */}
            {selectedTab === "overview" && dashboardData && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Total Services</p>
                    <p className="text-3xl font-bold text-primary">{dashboardData.properties + dashboardData.messPartners + dashboardData.laundryServices + dashboardData.printingServices + dashboardData.events}</p>
                    <p className="text-xs text-muted-foreground mt-2">All services active</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Total Inquiries</p>
                    <p className="text-3xl font-bold text-primary">46</p>
                    <p className="text-xs text-muted-foreground mt-2">This month: +12</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Profile Views</p>
                    <p className="text-3xl font-bold text-primary">4,279</p>
                    <p className="text-xs text-muted-foreground mt-2">This month</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-sm text-muted-foreground mb-2">Response Rate</p>
                    <p className="text-3xl font-bold text-primary">87%</p>
                    <p className="text-xs text-muted-foreground mt-2">Within 24 hours</p>
                  </Card>
                </div>

                {/* Recent Activity */}
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-foreground mb-4">Recent Inquiries</h2>
                  <div className="space-y-4">
                    {mockLeads.slice(0, 3).map((lead) => (
                      <div
                        key={lead.id}
                        className="flex items-center justify-between pb-4 border-b border-border last:border-b-0"
                      >
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.propertyInterest}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              lead.status === "New"
                                ? "bg-blue-100 text-blue-900"
                                : lead.status === "Contacted"
                                  ? "bg-yellow-100 text-yellow-900"
                                  : lead.status === "Interested"
                                    ? "bg-green-100 text-green-900"
                                    : "bg-gray-100 text-gray-900"
                            }
                          >
                            {lead.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{lead.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* My Services Tab */}
            {selectedTab === "properties" && dashboardData && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-foreground">My Services</h2>
                  <Button 
                    className="bg-primary text-primary-foreground gap-2"
                    onClick={() => setSelectedTab("add-service")}
                  >
                    <Plus className="w-4 h-4" />
                    Add Service
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {dashboardData.propertiesList.map((property) => (
                    <Card key={property._id} className="overflow-hidden">
                      <img 
                        src={property.image || "/placeholder.svg"} 
                        alt={property.name} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-foreground">{property.name}</h3>
                            <Badge className="bg-accent text-accent-foreground mt-1">{property.type}</Badge>
                          </div>
                          <Badge
                            className={
                              property.status === "Active" ? "bg-green-100 text-green-900" : "bg-gray-100 text-gray-900"
                            }
                          >
                            {property.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-muted-foreground">Rent</p>
                            <p className="font-semibold text-foreground">₹{property.rent}/month</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Occupancy</p>
                            <p className="font-semibold text-foreground">
                              {property.occupancy}/{property.totalSeats}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Views</p>
                            <p className="font-semibold text-foreground">{property.views}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Inquiries</p>
                            <p className="font-semibold text-foreground">{property.inquiries}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2 flex-1"
                            onClick={() => setSelectedTab("add-service")}
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 flex-1">
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Add New Service Tab */}
            {selectedTab === "add-service" && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Add New Service</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Service Type</label>
                      <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                        <option>Select service type</option>
                        <option>PG/Hostel</option>
                        <option>Mess/Canteen</option>
                        <option>Laundry</option>
                        <option>Printing/Xerox</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Service Name</label>
                      <input
                        type="text"
                        placeholder="Enter service name"
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Rent/Price</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Deposit (if applicable)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          placeholder="Enter phone number"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Enter address"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Timings</label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="e.g., 8:00 AM - 9:00 PM"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Description</label>
                    <textarea
                      placeholder="Describe your service..."
                      rows={4}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Upload Photos</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground mb-2">Drag and drop photos here</p>
                      <p className="text-xs text-muted-foreground mb-4">or</p>
                      <Button variant="outline">Choose Files</Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="bg-primary text-primary-foreground">Save Service</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Update Menu Tab */}
            {selectedTab === "menu" && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Update Weekly Menu</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Day</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Breakfast</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Lunch</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Dinner</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, index) => (
                        <tr key={index} className="hover:bg-muted/50">
                          <td className="px-4 py-3 font-medium text-foreground">{day}</td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              placeholder="Breakfast items"
                              className="w-full px-3 py-1 border border-border rounded bg-background text-foreground text-sm"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              placeholder="Lunch items"
                              className="w-full px-3 py-1 border border-border rounded bg-background text-foreground text-sm"
                            />
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="text"
                              placeholder="Dinner items"
                              className="w-full px-3 py-1 border border-border rounded bg-background text-foreground text-sm"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-end mt-6">
                  <Button className="bg-primary text-primary-foreground">Save Menu</Button>
                </div>
              </Card>
            )}

            {/* Pricing Tab */}
            {selectedTab === "pricing" && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Update Pricing</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Per Cloth Price (Laundry)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Ironing Price (Laundry)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Black & White Print (Printing)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Color Print (Printing)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Binding Charges (Printing)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-2">Lamination Charges (Printing)</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="number"
                          placeholder="0"
                          className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="bg-primary text-primary-foreground">Save Pricing</Button>
                    <Button variant="outline">Cancel</Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Photos Tab */}
            {selectedTab === "photos" && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">Manage Photos</h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="relative group">
                      <img 
                        src={`/placeholder.svg`} 
                        alt={`Photo ${item}`} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                        <Button size="sm" variant="outline" className="bg-white/90">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white/90">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-2">Upload new photos</p>
                  <p className="text-xs text-muted-foreground mb-4">or</p>
                  <Button variant="outline">Choose Files</Button>
                </div>
              </Card>
            )}

            {/* Student Leads Tab */}
            {selectedTab === "leads" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Student Leads</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Service</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {mockLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-muted/50">
                          <td className="px-4 py-3">
                            <div>
                              <p className="font-medium text-foreground">{lead.name}</p>
                              <p className="text-sm text-muted-foreground">{lead.email}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{lead.propertyInterest}</td>
                          <td className="px-4 py-3">
                            <Badge
                              className={
                                lead.status === "New"
                                  ? "bg-blue-100 text-blue-900"
                                  : lead.status === "Contacted"
                                    ? "bg-yellow-100 text-yellow-900"
                                    : lead.status === "Interested"
                                      ? "bg-green-100 text-green-900"
                                      : "bg-gray-100 text-gray-900"
                              }
                            >
                              {lead.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm text-muted-foreground">{lead.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setShowPhoneNumber(showPhoneNumber === lead.id ? null : lead.id)}
                                className="text-primary hover:underline text-sm"
                              >
                                {showPhoneNumber === lead.id ? "Hide" : "Show"}
                              </button>
                              {showPhoneNumber === lead.id && (
                                <span className="text-sm text-foreground">{lead.phone}</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {selectedTab === "settings" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Name</label>
                        <input
                          type="text"
                          defaultValue="Rajesh Kumar"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Phone</label>
                        <input
                          type="tel"
                          defaultValue="+91 9876543210"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue="rajesh@email.com"
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                        />
                      </div>
                      <Button className="w-full bg-primary text-primary-foreground">Save Changes</Button>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Notification Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm text-foreground">New inquiry alerts</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4" />
                        <span className="text-sm text-foreground">Lead update notifications</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm text-foreground">Marketing emails</span>
                      </label>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        Update Preferences
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

// Mock data for leads
const mockLeads: Lead[] = [
  {
    id: 1,
    name: "Priya Sharma",
    phone: "+91 9876543210",
    email: "priya@email.com",
    propertyInterest: "Asmita Jyoti Housing Society",
    date: "2 hours ago",
    status: "New",
  },
  {
    id: 2,
    name: "Rohit Desai",
    phone: "+91 9876543211",
    email: "rohit@email.com",
    propertyInterest: "Asmita Jyoti Housing Society",
    date: "1 day ago",
    status: "Contacted",
  },
  {
    id: 3,
    name: "Anjali Singh",
    phone: "+91 9876543212",
    email: "anjali@email.com",
    propertyInterest: "Sharaddha Apartment",
    date: "3 days ago",
    status: "Interested",
  },
]