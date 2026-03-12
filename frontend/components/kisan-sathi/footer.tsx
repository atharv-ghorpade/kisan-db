import Link from "next/link"
import { Logo } from "./logo"

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/schemes", label: "Government Schemes" },
  { href: "/help", label: "Help Center" },
  { href: "/contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="w-full bg-[#1B5E20] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Logo variant="dark" />

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Kisan Sathi. All rights reserved.</p>
          <p className="mt-1">A Government of India Initiative</p>
        </div>
      </div>
    </footer>
  )
}
