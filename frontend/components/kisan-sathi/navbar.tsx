"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, User, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Logo } from "./logo"
import { useAuth } from "@/lib/auth-context"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { href: "/", label: "Home", requiresAuth: false },
  { href: "/schemes", label: "Schemes", requiresAuth: true },
  { href: "/community", label: "Community", requiresAuth: true },
  { href: "/applied-schemes", label: "Applied Schemes", requiresAuth: true },
  { href: "/dashboard", label: "Dashboard", requiresAuth: true },
  { href: "/profile", label: "Profile", requiresAuth: true },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  const handleNavClick = (href: string, requiresAuth: boolean) => {
    if (requiresAuth && !isAuthenticated) {
      router.push("/auth")
      return
    }
    router.push(href)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Logo />
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.href}
              onClick={() => handleNavClick(link.href, link.requiresAuth)}
              className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "text-[#2E7D32]"
                  : "text-[#4B5563] hover:text-[#2E7D32]"
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2E7D32] rounded-full"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Auth Section */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 text-[#1F2933] hover:bg-[#2E7D32]/10 rounded-xl px-4 py-6"
                  >
                    <motion.div
                      className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white font-semibold text-sm shadow-md"
                      whileHover={{ rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {user?.fullName?.charAt(0).toUpperCase() || "U"}
                    </motion.div>
                    <span className="font-medium">Hello, {user?.fullName?.split(" ")[0] || "User"}</span>
                    <ChevronDown className="h-4 w-4 text-[#4B5563]" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl shadow-xl border-[#E5E7EB] p-2">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard")}
                    className="rounded-lg py-3 cursor-pointer"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/profile")}
                    className="rounded-lg py-3 cursor-pointer"
                  >
                    <User className="h-4 w-4 mr-3" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 rounded-lg py-3 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </DropdownMenuItem>
                </motion.div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl px-6 py-5 shadow-md hover:shadow-lg transition-all duration-300">
                  Login / Register
                </Button>
              </motion.div>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="rounded-xl">
                <Menu className="h-6 w-6" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <SheetHeader className="p-6 border-b border-[#E5E7EB]">
              <SheetTitle>
                <Logo size="sm" />
              </SheetTitle>
            </SheetHeader>
            <motion.div
              className="flex flex-col gap-2 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href, link.requiresAuth)}
                  className={`px-4 py-4 rounded-xl text-left font-medium transition-all duration-300 ${
                    pathname === link.href
                      ? "text-[#2E7D32] bg-[#2E7D32]/10"
                      : "text-[#4B5563] hover:text-[#2E7D32] hover:bg-[#2E7D32]/5"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <hr className="my-4 border-[#E5E7EB]" />
              {isAuthenticated ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="px-4 py-3 flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white font-semibold shadow-md">
                      {user?.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1F2933]">{user?.fullName}</p>
                      <p className="text-sm text-[#4B5563]">{user?.mobile}</p>
                    </div>
                  </div>
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl py-4"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </Button>
                  </motion.div>
                </motion.div>
              ) : (
                <Link href="/auth">
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl py-5 shadow-md">
                      Login / Register
                    </Button>
                  </motion.div>
                </Link>
              )}
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.nav>
  )
}
