"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  User,
  Phone,
  MapPin,
  Sprout,
  Droplets,
  IndianRupee,
  Tag,
  CheckCircle,
  Shield,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { useAuth } from "@/lib/auth-context"

const states = [
  "Andhra Pradesh",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
  "West Bengal",
]

const districts: Record<string, string[]> = {
  Maharashtra: ["Pune", "Mumbai", "Nagpur", "Nashik", "Aurangabad"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Prayagraj"],
  Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
}

const crops = [
  "Wheat",
  "Rice",
  "Cotton",
  "Sugarcane",
  "Maize",
  "Pulses",
  "Vegetables",
  "Fruits",
  "Oilseeds",
  "Spices",
]

const irrigationTypes = ["Rainfed", "Canal", "Borewell", "Drip Irrigation"]

const casteCategories = ["General", "OBC", "SC", "ST"]

const steps = [
  { number: 1, title: "Profile Details", active: true },
  { number: 2, title: "Scheme Matching", active: false },
  { number: 3, title: "Apply for Schemes", active: false },
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, updateProfile } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [fullName, setFullName] = useState(user?.fullName || "")
  const [mobile, setMobile] = useState(user?.mobile || "")
  const [state, setState] = useState(user?.profile?.state || "")
  const [district, setDistrict] = useState(user?.profile?.district || "")
  const [landSize, setLandSize] = useState(user?.profile?.landSize?.toString() || "")
  const [primaryCrop, setPrimaryCrop] = useState(user?.profile?.primaryCrop || "")
  const [irrigationType, setIrrigationType] = useState(user?.profile?.irrigationType || "")
  const [annualIncome, setAnnualIncome] = useState(user?.profile?.annualIncome?.toString() || "")
  const [casteCategory, setCasteCategory] = useState(user?.profile?.casteCategory || "")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    setIsLoading(true)

    try {
      const response = await fetch(`http://127.0.0.1:8000/profile/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fullName,
          phone: mobile,
          state,
          district,
          land_size: parseFloat(landSize),
          crop_types: primaryCrop,
          farmer_category: casteCategory,
          irrigation_type: irrigationType,
          annual_income: parseFloat(annualIncome),
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.detail || "Failed to update profile")
      }

      const updatedFarmer = await response.json()
      
      updateProfile({
        fullName: updatedFarmer.name,
        mobile: updatedFarmer.phone,
        state: updatedFarmer.state,
        district: updatedFarmer.district,
        landSize: updatedFarmer.land_size,
        primaryCrop: updatedFarmer.crop_types,
        casteCategory: updatedFarmer.farmer_category,
        irrigationType: updatedFarmer.irrigation_type,
        annualIncome: updatedFarmer.annual_income,
        isProfileComplete: true,
      })
      
      router.push("/dashboard")
    } catch (error: any) {
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const availableDistricts = state ? districts[state] || [] : []

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F2933]">Complete Your Farmer Profile</h1>
          <p className="mt-2 text-[#4B5563]">
            Provide some details about your farm so we can suggest the most relevant government schemes.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex items-center gap-2 ${
                  step.active ? "text-[#2E7D32]" : "text-[#4B5563]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step.active
                      ? "bg-[#2E7D32] text-white"
                      : "bg-[#E5E7EB] text-[#4B5563]"
                  }`}
                >
                  {step.number}
                </div>
                <span className="hidden sm:inline font-medium">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 sm:w-16 h-0.5 bg-[#E5E7EB] mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Profile Form Card */}
        <Card className="bg-white shadow-lg border-[#E5E7EB]">
          <CardHeader>
            <CardTitle className="text-xl text-[#1F2933]">Farm Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1 - Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2933] border-b border-[#E5E7EB] pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="text-[#1F2933]">
                      Full Name
                    </Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 border-[#E5E7EB]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="mobile" className="text-[#1F2933]">
                      Mobile Number
                    </Label>
                    <div className="relative mt-1.5">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="mobile"
                        value={mobile}
                        className="pl-10 border-[#E5E7EB] bg-[#F5F7F6]"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 - Location Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2933] border-b border-[#E5E7EB] pb-2">
                  Location Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="state" className="text-[#1F2933]">
                      State
                    </Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563] z-10" />
                      <Select value={state} onValueChange={setState}>
                        <SelectTrigger className="pl-10 border-[#E5E7EB]">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="district" className="text-[#1F2933]">
                      District
                    </Label>
                    <div className="relative mt-1.5">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563] z-10" />
                      <Select value={district} onValueChange={setDistrict} disabled={!state}>
                        <SelectTrigger className="pl-10 border-[#E5E7EB]">
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableDistricts.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3 - Farm Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2933] border-b border-[#E5E7EB] pb-2">
                  Farm Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="landSize" className="text-[#1F2933]">
                      Land Size (in acres)
                    </Label>
                    <div className="relative mt-1.5">
                      <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="landSize"
                        type="number"
                        step="0.5"
                        min="0"
                        value={landSize}
                        onChange={(e) => setLandSize(e.target.value)}
                        className="pl-10 border-[#E5E7EB]"
                        placeholder="Enter land size"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="primaryCrop" className="text-[#1F2933]">
                      Primary Crop
                    </Label>
                    <div className="relative mt-1.5">
                      <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563] z-10" />
                      <Select value={primaryCrop} onValueChange={setPrimaryCrop}>
                        <SelectTrigger className="pl-10 border-[#E5E7EB]">
                          <SelectValue placeholder="Select Primary Crop" />
                        </SelectTrigger>
                        <SelectContent>
                          {crops.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4 - Farm Conditions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2933] border-b border-[#E5E7EB] pb-2">
                  Farm Conditions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="irrigationType" className="text-[#1F2933]">
                      Irrigation Type
                    </Label>
                    <div className="relative mt-1.5">
                      <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563] z-10" />
                      <Select value={irrigationType} onValueChange={setIrrigationType}>
                        <SelectTrigger className="pl-10 border-[#E5E7EB]">
                          <SelectValue placeholder="Select Irrigation Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {irrigationTypes.map((i) => (
                            <SelectItem key={i} value={i}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="annualIncome" className="text-[#1F2933]">
                      Annual Income (in Rs)
                    </Label>
                    <div className="relative mt-1.5">
                      <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                      <Input
                        id="annualIncome"
                        type="number"
                        min="0"
                        value={annualIncome}
                        onChange={(e) => setAnnualIncome(e.target.value)}
                        className="pl-10 border-[#E5E7EB]"
                        placeholder="Enter annual income"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5 - Social Category */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1F2933] border-b border-[#E5E7EB] pb-2">
                  Social Category
                </h3>
                <div className="max-w-md">
                  <Label htmlFor="casteCategory" className="text-[#1F2933]">
                    Caste Category
                  </Label>
                  <div className="relative mt-1.5">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563] z-10" />
                    <Select value={casteCategory} onValueChange={setCasteCategory}>
                      <SelectTrigger className="pl-10 border-[#E5E7EB]">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {casteCategories.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Profile & Find Schemes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Helper Information */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3 text-[#4B5563]">
            <CheckCircle className="h-5 w-5 text-[#2E7D32]" />
            <span>Used only to match you with eligible government schemes</span>
          </div>
          <div className="flex items-center gap-3 text-[#4B5563]">
            <Shield className="h-5 w-5 text-[#2E7D32]" />
            <span>Your data remains secure</span>
          </div>
          <div className="flex items-center gap-3 text-[#4B5563]">
            <Target className="h-5 w-5 text-[#2E7D32]" />
            <span>Helps provide accurate recommendations</span>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
