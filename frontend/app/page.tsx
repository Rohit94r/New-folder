"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Building2, Utensils, Shirt, Printer, Users, Calendar } from 'lucide-react'

export default function HomePage() {
  const actionButtons = [
    {
      href: "/properties",
      label: "Find PG / Flats",
      icon: Building2,
      description: "Verified properties within 2 km of Atharva College"
    },
    {
      href: "/mess-partners",
      label: "Mess & Canteen",
      icon: Utensils,
      description: "Official canteen and nearby mess options"
    },
    {
      href: "/laundry",
      label: "Laundry & Ironing",
      icon: Shirt,
      description: "Local laundry services with pickup & delivery"
    },
    {
      href: "/printing",
      label: "Printing & Xerox",
      icon: Printer,
      description: "Nearby printing shops for all your needs"
    },
    {
      href: "/community",
      label: "Student Community",
      icon: Users,
      description: "Connect with fellow students (Login required)"
    },
    {
      href: "/events",
      label: "Events & Opportunities",
      icon: Calendar,
      description: "Internships, hackathons, and college events"
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Welcome to Roomeze — Everything a student needs near college.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find verified PGs, mess options, laundry services, printing shops, and connect with fellow students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {actionButtons.map((button, index) => {
              const Icon = button.icon
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow group">
                  <Link href={button.href} className="block h-full">
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {button.label}
                      </h2>
                      <p className="text-muted-foreground mb-4 flex-1">
                        {button.description}
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        Explore
                      </Button>
                    </div>
                  </Link>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}