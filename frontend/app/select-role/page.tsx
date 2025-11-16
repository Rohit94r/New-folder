"use client"

import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { GraduationCap, Briefcase, Utensils, Shirt, Printer, Building2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function SelectRolePage() {
  const router = useRouter()

  const handleStudentClick = () => {
    router.push("/community")
  }

  const handleProviderClick = () => {
    router.push("/service-provider-dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-white">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h1>
            <p className="text-xl text-gray-600">
              Select how you want to use Roomeze.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Student Card */}
            <Card 
              onClick={handleStudentClick}
              className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-red-500 hover:shadow-red-100 bg-white border-2 border-gray-200 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-14 h-14 text-red-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  I am a Student
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Join your college community, see opportunities, events & updates.
                </p>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Community
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Events
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      Opportunities
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Service Provider Card */}
            <Card 
              onClick={handleProviderClick}
              className="p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-red-500 hover:shadow-red-100 bg-white border-2 border-gray-200 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-14 h-14 text-red-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  I am a Service Provider
                </h2>
                
                <p className="text-gray-600 mb-6">
                  Add and manage your services on Roomeze (Mess, Laundry, Printing, PG/Hostel, Canteen).
                </p>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge className="bg-red-600 text-white hover:bg-red-700 gap-1">
                      <Utensils className="w-3 h-3" />
                      Add Mess
                    </Badge>
                    <Badge className="bg-red-600 text-white hover:bg-red-700 gap-1">
                      <Shirt className="w-3 h-3" />
                      Add Laundry
                    </Badge>
                    <Badge className="bg-red-600 text-white hover:bg-red-700 gap-1">
                      <Printer className="w-3 h-3" />
                      Add Printing
                    </Badge>
                    <Badge className="bg-red-600 text-white hover:bg-red-700 gap-1">
                      <Building2 className="w-3 h-3" />
                      Add PG / Hostel
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
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
