"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Shirt, Printer, Building2, ArrowLeft, Calendar } from "lucide-react";

export default function AddServicePage() {
  const router = useRouter();

  const serviceTypes = [
    {
      id: "mess",
      title: "Mess / Canteen",
      description: "Add your mess or canteen service for students",
      icon: Utensils,
      route: "/service-provider/add/mess",
      color: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      id: "laundry",
      title: "Laundry / Ironing Service",
      description: "List your laundry and ironing services",
      icon: Shirt,
      route: "/service-provider/add/laundry",
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: "printing",
      title: "Printing / Xerox Shop",
      description: "Register your printing and photocopy services",
      icon: Printer,
      route: "/service-provider/add/printing",
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: "pg",
      title: "PG / Hostel / Flat Listing",
      description: "List your accommodation services",
      icon: Building2,
      route: "/service-provider/add/pg",
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: "event",
      title: "Event / Workshop",
      description: "Post events, workshops, competitions and more",
      icon: Calendar,
      route: "/service-provider/add/event",
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-white">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Add Your Service
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of service providers on Roomeze. Select your service type to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceTypes.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={service.id}
                  onClick={() => router.push(service.route)}
                  className="p-6 cursor-pointer transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-red-500 bg-white shadow-md hover:shadow-lg"
                >
                  <div className={`w-14 h-14 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-7 h-7 ${service.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}