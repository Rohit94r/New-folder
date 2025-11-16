"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { 
  Home, 
  Building2, 
  Utensils, 
  Shirt, 
  Printer, 
  Users, 
  Calendar, 
  User, 
  LogIn,
  LogOut
} from "lucide-react"
import { useState, useEffect } from "react"
import { isAuthenticated, logout, getUser } from "@/lib/auth"

interface User {
  name: string;
  email: string;
  role: string;
}

export function Header() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const checkAuthStatus = () => {
      const authStatus = isAuthenticated()
      setIsLoggedIn(authStatus)
      
      if (authStatus) {
        const userData = getUser()
        setUser(userData)
      }
    }
    
    checkAuthStatus()
    
    // Listen for auth changes
    window.addEventListener('storage', checkAuthStatus)
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus)
    }
  }, [])

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    setUser(null)
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/properties", label: "PG / Flats", icon: Building2 },
    { href: "/mess-partners", label: "Mess & Canteen", icon: Utensils },
    { href: "/laundry", label: "Laundry", icon: Shirt },
    { href: "/printing", label: "Printing", icon: Printer },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/community", label: "Community", icon: Users },
  ]

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Home className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Roomeze</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/service-provider/add">
              <Button variant="default" size="sm" className="gap-2 bg-red-600 hover:bg-red-700">
                <span className="hidden md:inline">Service Provider</span>
              </Button>
            </Link>
            {isLoggedIn ? (
              <>
                <span className="hidden md:inline text-sm text-foreground">
                  Hi, {user?.name || "User"}
                </span>
                {user?.role === "owner" && (
                  <Link href="/owner-dashboard">
                    <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Logout</span>
                </Button>
              </>
            ) : (
              <Link href="/community">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="w-4 h-4" />
                  <span className="hidden md:inline">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}