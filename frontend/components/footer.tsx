import Link from "next/link"
import { Mail, Phone, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-primary mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                RL
              </div>
              Roomly
            </div>
            <p className="text-sm text-muted-foreground">Affordable living, made simple and safe for students.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-muted-foreground hover:text-primary transition">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/mess-partners" className="text-muted-foreground hover:text-primary transition">
                  Mess Partners
                </Link>
              </li>
              <li>
                <Link href="/laundry" className="text-muted-foreground hover:text-primary transition">
                  Laundry
                </Link>
              </li>
              <li>
                <Link href="/printing" className="text-muted-foreground hover:text-primary transition">
                  Printing
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-primary transition">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-primary transition">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/service-provider/add" className="text-muted-foreground hover:text-primary transition">
                  Service Provider
                </Link>
              </li>
              <li>
                <a href="mailto:support@roomeze.com" className="text-muted-foreground hover:text-primary transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:support@roomly.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
              >
                <Mail className="w-4 h-4" />
                support@roomly.com
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
              >
                <Phone className="w-4 h-4" />
                +91 9876543210
              </a>
              <a
                href="https://wa.me/919876543210"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 Roomeze. All rights reserved. Trusted student housing in India.</p>
        </div>
      </div>
    </footer>
  )
}
