"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Utensils, 
  Shirt, 
  Printer, 
  Building2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  MapPin, 
  Phone 
} from "lucide-react";
import { messAPI, laundryAPI, printingAPI, propertiesAPI } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

interface Service {
  _id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  distance?: number;
  rent?: number;
  pricing?: any;
  image?: string;
  createdAt: string;
  ownerName?: string;
  googleMapLink?: string;
  sharingType?: string;
}

export default function AdminApprovalPage() {
  const [activeTab, setActiveTab] = useState("mess");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [activeTab]);

  const fetchServices = async () => {
    setLoading(true);
    try {
      let data: any[] = [];
      switch (activeTab) {
        case "mess":
          const messResponse = await messAPI.getAll();
          data = messResponse.data || messResponse;
          break;
        case "laundry":
          const laundryResponse = await laundryAPI.getAll();
          data = laundryResponse.data || laundryResponse;
          break;
        case "printing":
          const printingResponse = await printingAPI.getAll();
          data = printingResponse.data || printingResponse;
          break;
        case "pg":
          const pgResponse = await propertiesAPI.getAll();
          data = pgResponse.data || pgResponse;
          break;
        default:
          data = [];
      }
      
      // Ensure data is an array
      if (!Array.isArray(data)) {
        data = [];
      }
      
      setServices(data);
    } catch (error: any) {
      console.error(`Error fetching ${activeTab}:`, error.response?.data || error.message || error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    // In a real app, you would call an API to approve the service
    console.log(`Approved service ${id}`);
    fetchServices();
  };

  const handleReject = async (id: string) => {
    // In a real app, you would call an API to reject the service
    console.log(`Rejected service ${id}`);
    fetchServices();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Service Approval Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Review and approve new service submissions
            </p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white">
              <TabsTrigger value="mess" className="flex items-center gap-2">
                <Utensils className="w-4 h-4" />
                Mess
              </TabsTrigger>
              <TabsTrigger value="laundry" className="flex items-center gap-2">
                <Shirt className="w-4 h-4" />
                Laundry
              </TabsTrigger>
              <TabsTrigger value="printing" className="flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Printing
              </TabsTrigger>
              <TabsTrigger value="pg" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                PG/Hostel
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mess" className="mt-6">
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <p>Loading mess services...</p>
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-8">
                    <p>No mess services pending approval.</p>
                  </div>
                ) : (
                  services.map((service) => (
                    <Card key={service._id} className="p-6 bg-white shadow-md">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img 
                            src={service.image || "https://via.placeholder.com/150x150?text=Mess"} 
                            alt={service.name}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                              <p className="text-gray-600 mt-1">{service.description || "No description provided"}</p>
                              
                              <div className="flex flex-wrap gap-4 mt-3">
                                {service.address && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{service.address}</span>
                                  </div>
                                )}
                                {service.phone && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm">{service.phone}</span>
                                  </div>
                                )}
                                {service.distance && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <span className="text-sm">{service.distance} km from college</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Button 
                                onClick={() => handleApprove(service._id)}
                                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                              </Button>
                              <Button 
                                onClick={() => handleReject(service._id)}
                                variant="outline"
                                className="border-red-600 text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-500">
                            Submitted on {formatDate(service.createdAt)}
                            {service.ownerName && ` by ${service.ownerName}`}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="laundry" className="mt-6">
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <p>Loading laundry services...</p>
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-8">
                    <p>No laundry services pending approval.</p>
                  </div>
                ) : (
                  services.map((service) => (
                    <Card key={service._id} className="p-6 bg-white shadow-md">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img 
                            src={service.image || "https://via.placeholder.com/150x150?text=Laundry"} 
                            alt={service.name}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                              <p className="text-gray-600 mt-1">{service.description || "No description provided"}</p>
                              
                              <div className="flex flex-wrap gap-4 mt-3">
                                {service.address && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{service.address}</span>
                                  </div>
                                )}
                                {service.phone && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm">{service.phone}</span>
                                  </div>
                                )}
                                {service.distance && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <span className="text-sm">{service.distance} km from college</span>
                                  </div>
                                )}
                              </div>
                              
                              {service.pricing && (
                                <div className="mt-3">
                                  <p className="text-sm">
                                    <span className="font-medium">Pricing:</span> 
                                    {service.pricing.washAndFold && ` Wash & Fold: ₹${service.pricing.washAndFold}/kg`}
                                    {service.pricing.ironing && ` | Ironing: ₹${service.pricing.ironing}/piece`}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Button 
                                onClick={() => handleApprove(service._id)}
                                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                              </Button>
                              <Button 
                                onClick={() => handleReject(service._id)}
                                variant="outline"
                                className="border-red-600 text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-500">
                            Submitted on {formatDate(service.createdAt)}
                            {service.ownerName && ` by ${service.ownerName}`}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="printing" className="mt-6">
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <p>Loading printing services...</p>
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-8">
                    <p>No printing services pending approval.</p>
                  </div>
                ) : (
                  services.map((service) => (
                    <Card key={service._id} className="p-6 bg-white shadow-md">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img 
                            src={service.image || "https://via.placeholder.com/150x150?text=Printing"} 
                            alt={service.name}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                              <p className="text-gray-600 mt-1">{service.description || "No description provided"}</p>
                              
                              <div className="flex flex-wrap gap-4 mt-3">
                                {service.address && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{service.address}</span>
                                  </div>
                                )}
                                {service.phone && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm">{service.phone}</span>
                                  </div>
                                )}
                              </div>
                              
                              {service.pricing && (
                                <div className="mt-3">
                                  <p className="text-sm">
                                    <span className="font-medium">Pricing:</span> 
                                    {service.pricing.blackAndWhite && ` B&W: ₹${service.pricing.blackAndWhite}/page`}
                                    {service.pricing.color && ` | Color: ₹${service.pricing.color}/page`}
                                    {service.pricing.binding && ` | Binding: ₹${service.pricing.binding}/copy`}
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Button 
                                onClick={() => handleApprove(service._id)}
                                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                              </Button>
                              <Button 
                                onClick={() => handleReject(service._id)}
                                variant="outline"
                                className="border-red-600 text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-500">
                            Submitted on {formatDate(service.createdAt)}
                            {service.ownerName && ` by ${service.ownerName}`}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="pg" className="mt-6">
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <p>Loading PG/Hostel listings...</p>
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-8">
                    <p>No PG/Hostel listings pending approval.</p>
                  </div>
                ) : (
                  services.map((service) => (
                    <Card key={service._id} className="p-6 bg-white shadow-md">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img 
                            src={service.image || "https://via.placeholder.com/150x150?text=PG"} 
                            alt={service.name}
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                              <p className="text-gray-600 mt-1">{service.description || "No description provided"}</p>
                              
                              <div className="flex flex-wrap gap-4 mt-3">
                                {service.address && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{service.address}</span>
                                  </div>
                                )}
                                {service.phone && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <Phone className="w-4 h-4" />
                                    <span className="text-sm">{service.phone}</span>
                                  </div>
                                )}
                                {service.distance && (
                                  <div className="flex items-center gap-1 text-gray-600">
                                    <span className="text-sm">{service.distance} km from college</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="mt-3">
                                <p className="text-sm">
                                  <span className="font-medium">Rent:</span> ₹{service.rent || "N/A"}/month
                                  {service.sharingType && ` | ${service.sharingType} sharing`}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col gap-2">
                              <Button 
                                onClick={() => handleApprove(service._id)}
                                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Approve
                              </Button>
                              <Button 
                                onClick={() => handleReject(service._id)}
                                variant="outline"
                                className="border-red-600 text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-500">
                            Submitted on {formatDate(service.createdAt)}
                            {service.ownerName && ` by ${service.ownerName}`}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}