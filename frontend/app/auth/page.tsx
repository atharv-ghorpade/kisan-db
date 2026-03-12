"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Phone, Lock, User, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { useAuth } from "@/lib/auth-context"

type Role = "farmer" | "admin"

export default function AuthPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState<"login" | "register">("login")
  const [role, setRole] = useState<Role>("farmer")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Login form state
  const [loginMobile, setLoginMobile] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  // Register form state
  const [registerName, setRegisterName] = useState("")
  const [registerMobile, setRegisterMobile] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: loginMobile, password: loginPassword }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Login failed")
      }

      const data = await response.json()
      let profileData = undefined
      if (data.user.role === "farmer") {
        try {
          const profileRes = await fetch(`http://127.0.0.1:8000/profile/${data.user.id}`)
          if (profileRes.ok) {
            const p = await profileRes.json()
            if (p.state) {
              profileData = {
                fullName: p.name,
                mobile: p.phone,
                state: p.state,
                district: p.district,
                landSize: p.land_size,
                primaryCrop: p.crop_types,
                casteCategory: p.farmer_category,
                irrigationType: p.irrigation_type,
                annualIncome: p.annual_income,
                isProfileComplete: true
              }
            }
          }
        } catch (e) {
          console.error("Failed to fetch profile", e)
        }
      }

      login({
        id: data.user.id.toString(),
        fullName: data.user.name,
        mobile: data.user.phone,
        role: data.user.role,
        profile: profileData
      })
      
      if (data.user.role === "admin") {
        router.push("/admin")
      } else {
        router.push(profileData ? "/dashboard" : "/profile")
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (registerPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    setIsLoading(true)

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: registerName,
          phone: registerMobile,
          password: registerPassword
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Registration failed")
      }

      const data = await response.json()
      
      // Auto login after registration
      const loginResponse = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: registerMobile, password: registerPassword }),
      })
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json()
        login({
          id: loginData.user.id.toString(),
          fullName: loginData.user.name,
          mobile: loginData.user.phone,
          role: loginData.user.role,
        })
        router.push("/profile")
      } else {
        setActiveTab("login")
        alert("Registration successful! Please login.")
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageLayout>
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F2933]">Welcome to Kisan Sathi</h1>
          <p className="mt-2 text-[#4B5563]">
            Login or create an account to discover government schemes for your farm.
          </p>
        </div>

        {/* Auth Card */}
        <Card className="w-full max-w-md bg-white shadow-lg border-[#E5E7EB]">
          <CardHeader className="pb-0">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
              <TabsList className="grid w-full grid-cols-2 bg-[#F5F7F6]">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Tab */}
              <TabsContent value="login" className="mt-6">
                <form onSubmit={handleLogin}>
                  {/* Role Selection */}
                  <div className="mb-6">
                    <Label className="text-[#1F2933] mb-3 block">Login as</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={role === "farmer" ? "default" : "outline"}
                        className={
                          role === "farmer"
                            ? "bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
                            : "border-[#E5E7EB] text-[#4B5563] hover:bg-[#F5F7F6]"
                        }
                        onClick={() => setRole("farmer")}
                      >
                        Login as Farmer
                      </Button>
                      <Button
                        type="button"
                        variant={role === "admin" ? "default" : "outline"}
                        className={
                          role === "admin"
                            ? "bg-[#2E5FA7] hover:bg-[#1E4A8A] text-white"
                            : "border-[#E5E7EB] text-[#4B5563] hover:bg-[#F5F7F6]"
                        }
                        onClick={() => setRole("admin")}
                      >
                        Login as Admin
                      </Button>
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="mb-4">
                    <Label htmlFor="login-mobile" className="text-[#1F2933]">
                      Mobile Number
                    </Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="login-mobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        className="pl-10 border-[#E5E7EB] focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                        value={loginMobile}
                        onChange={(e) => setLoginMobile(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-6">
                    <Label htmlFor="login-password" className="text-[#1F2933]">
                      Password
                    </Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10 border-[#E5E7EB] focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#1F2933]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>

                  <p className="mt-4 text-center text-sm text-[#4B5563]">
                    {"Don't have an account? "}
                    <button
                      type="button"
                      className="text-[#2E7D32] font-medium hover:underline"
                      onClick={() => setActiveTab("register")}
                    >
                      Register
                    </button>
                  </p>
                </form>
              </TabsContent>

              {/* Register Tab */}
              <TabsContent value="register" className="mt-6">
                <form onSubmit={handleRegister}>
                  {/* Full Name */}
                  <div className="mb-4">
                    <Label htmlFor="register-name" className="text-[#1F2933]">
                      Full Name
                    </Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="register-name"
                        type="text"
                        placeholder="Enter your full name"
                        className="pl-10 border-[#E5E7EB] focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                        value={registerName}
                        onChange={(e) => setRegisterName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="mb-4">
                    <Label htmlFor="register-mobile" className="text-[#1F2933]">
                      Mobile Number
                    </Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="register-mobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        className="pl-10 border-[#E5E7EB] focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                        value={registerMobile}
                        onChange={(e) => setRegisterMobile(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <Label htmlFor="register-password" className="text-[#1F2933]">
                      Password
                    </Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10 border-[#E5E7EB] focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#1F2933]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6">
                    <Label htmlFor="confirm-password" className="text-[#1F2933]">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10 border-[#E5E7EB] focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B5563] hover:text-[#1F2933]"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>

                  <p className="mt-4 text-center text-sm text-[#4B5563]">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-[#2E7D32] font-medium hover:underline"
                      onClick={() => setActiveTab("login")}
                    >
                      Login
                    </button>
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardHeader>
          <CardContent className="pt-0" />
        </Card>
      </div>
    </PageLayout>
  )
}
