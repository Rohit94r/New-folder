"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Phone, Link as LinkIcon, Briefcase, Trophy, Users, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { eventsAPI } from "@/lib/api"
import { formatDate } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Event {
  _id: string
  title: string
  description: string
  category: "Internship" | "Hackathon" | "Competition" | "College Event" | "Workshop"
  date: string
  location: string
  organizer: string
  contact: string
  signUpLink: string
  image: string
}

export default function EventsPage() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await eventsAPI.getAll()
        setEvents(data)
      } catch (err: any) {
        const errorMessage = err.message || "Failed to load events. Please try again later."
        setError(errorMessage)
        console.error("Error fetching events:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Internship": return <Briefcase className="w-4 h-4" />
      case "Hackathon": return <Trophy className="w-4 h-4" />
      case "Competition": return <Trophy className="w-4 h-4" />
      case "College Event": return <Users className="w-4 h-4" />
      case "Workshop": return <Briefcase className="w-4 h-4" />
      default: return <Calendar className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Internship": return "bg-blue-100 text-blue-900"
      case "Hackathon": return "bg-purple-100 text-purple-900"
      case "Competition": return "bg-yellow-100 text-yellow-900"
      case "College Event": return "bg-green-100 text-green-900"
      case "Workshop": return "bg-orange-100 text-orange-900"
      default: return "bg-gray-100 text-gray-900"
    }
  }

  // Handle Post Event button click
  const handlePostEvent = () => {
    // Navigate to add event page
    router.push("/service-provider/add/event")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-lg text-foreground">Loading events...</p>
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
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto">
              <strong className="font-bold">Error: </strong>
              {error}
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
            <h1 className="text-3xl font-bold text-foreground mb-4">Events & Opportunities</h1>
            <p className="text-muted-foreground max-w-2xl">
              Discover internships, hackathons, competitions, workshops and college events happening near Atharva.
            </p>
          </div>
          
          <Button 
            className="gap-2 bg-primary text-primary-foreground"
            onClick={handlePostEvent}
          >
            <Plus className="w-4 h-4" />
            Post Event
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="p-4 shadow-sm hover:shadow-md transition">
              
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-40 object-cover rounded-md" 
              />

              <h2 className="font-semibold text-lg mt-3">{event.title}</h2>

              <Badge className={`${getCategoryColor(event.category)} mt-2 flex items-center gap-1`}>
                {getCategoryIcon(event.category)}
                {event.category}
              </Badge>

              <p className="mt-3 text-sm text-muted-foreground">
                {event.description}
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(event.date)}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </p>

                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {event.contact}
                </p>
              </div>

              <a 
                href={event.signUpLink}
                target="_blank"
                className="mt-4 flex items-center gap-2 text-primary font-semibold underline"
              >
                Register Now <LinkIcon className="w-4 h-4" />
              </a>

            </Card>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  )
}