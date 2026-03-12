"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Bell,
  MessageSquare,
  Send,
  MapPin,
  Phone,
  Edit,
  ArrowRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  Compass,
  Sprout,
  Droplets,
  IndianRupee,
  Tag,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { SchemeCard } from "@/components/kisan-sathi/scheme-card"
import { useAuth } from "@/lib/auth-context"
import { getRecommendedSchemes } from "@/lib/schemes-data"

const notifications = [
  {
    id: 1,
    type: "new",
    message: "New scheme available for wheat farmers in your region",
    time: "2 hours ago",
    icon: Sprout,
  },
  {
    id: 2,
    type: "status",
    message: "Your PM-Kisan application has been approved",
    time: "Yesterday",
    icon: CheckCircle2,
  },
  {
    id: 3,
    type: "deadline",
    message: "Soil Health Card registration deadline in 5 days",
    time: "2 days ago",
    icon: AlertCircle,
  },
]

const helpCenters = [
  {
    name: "Krishi Seva Kendra",
    address: "Block Road, District Center",
    distance: "2.5 km",
    phone: "1800-180-1551",
  },
  {
    name: "District Agriculture Office",
    address: "Government Complex, Main Road",
    distance: "5 km",
    phone: "1800-180-1552",
  },
  {
    name: "Soil Testing Center",
    address: "Agricultural Research Institute",
    distance: "8 km",
    phone: "1800-180-1553",
  },
]

const samplePrompts = [
  "Which schemes are available for wheat farmers?",
  "How do I apply for PM-Kisan?",
  "What documents do I need for crop insurance?",
]

export default function DashboardPage() {
  const { user } = useAuth()
  const [aiQuestion, setAiQuestion] = useState("")
  const [recommendedSchemes, setRecommendedSchemes] = useState<any[]>([])
  
  const profile = user?.profile || {
    state: "Maharashtra",
    district: "Pune",
    landSize: 5,
    primaryCrop: "Wheat",
    irrigationType: "Canal",
    annualIncome: 200000,
    casteCategory: "General",
    age: 35,
    gender: "male"
  };

  useEffect(() => {
    async function fetchRecommend() {
      try {
        const pf = profile as any;
        const payload = {
          state: pf.state || "Maharashtra",
          land_hectares: pf.landSize || 1.5,
          land_ownership: "owner",
          crop_type: pf.primaryCrop || "Wheat",
          annual_income_rs: pf.annualIncome || 150000,
          age: pf.age || 35,
          caste: pf.casteCategory || "General",
          gender: pf.gender || "male",
          irrigation_type: pf.irrigationType || "canal",
          is_income_tax_payer: false,
          is_government_employee: false,
          is_pensioner_above_10k: false,
          is_pm_kisan_beneficiary: true,
          has_aadhaar: true,
          has_land_records: true,
        };
        const res = await fetch("http://127.0.0.1:8000/api/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const data = await res.json();
          setRecommendedSchemes(data.results.slice(0, 3));
        }
      } catch (e) {
        console.error("Failed to fetch recommended schemes", e);
      }
    }
    fetchRecommend();
  }, [user]);

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F2933]">Farmer Dashboard</h1>
          <p className="mt-2 text-[#4B5563]">
            Your personalized space to discover government schemes and manage applications.
          </p>
        </div>

        {/* Notifications Card - Top */}
        <Card className="bg-white shadow-sm border-[#E5E7EB] mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#F37021]" />
                Notifications
              </CardTitle>
              <Badge variant="secondary" className="bg-[#F37021]/10 text-[#F37021]">
                {notifications.length} New
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 bg-[#F5F7F6] rounded-lg hover:bg-[#E8F5E9] transition-colors cursor-pointer"
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      notification.type === "new"
                        ? "bg-[#2E7D32]/10 text-[#2E7D32]"
                        : notification.type === "status"
                        ? "bg-[#2E5FA7]/10 text-[#2E5FA7]"
                        : "bg-[#F37021]/10 text-[#F37021]"
                    }`}
                  >
                    <notification.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1F2933] font-medium">{notification.message}</p>
                    <p className="text-xs text-[#4B5563] mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Assistant Card */}
        <Card className="bg-white shadow-sm border-[#E5E7EB] mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#2E7D32]" />
              Ask Kisan Sathi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Ask about schemes, eligibility or application process"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                className="border-[#E5E7EB] focus:border-[#2E7D32]"
              />
              <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {samplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setAiQuestion(prompt)}
                  className="text-sm px-3 py-1.5 bg-[#F5F7F6] text-[#4B5563] rounded-full hover:bg-[#E8F5E9] hover:text-[#2E7D32] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recommended Schemes */}
          <Card className="bg-white shadow-sm border-[#E5E7EB] lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-[#1F2933]">Recommended Schemes for You</CardTitle>
                <Link href="/schemes/recommended">
                  <Button variant="outline" size="sm" className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white">
                    View All Schemes
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedSchemes.map((scheme) => (
                  <SchemeCard key={scheme.id} scheme={scheme} showMatch />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Your Farm Profile */}
          <Card className="bg-white shadow-sm border-[#E5E7EB]">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-[#1F2933]">Your Farm Profile</CardTitle>
                <Link href="/profile">
                  <Button variant="ghost" size="sm" className="text-[#2E7D32] hover:bg-[#2E7D32]/10">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-[#4B5563]" />
                  <span className="text-[#4B5563]">Location:</span>
                  <span className="text-[#1F2933] font-medium">{profile.district}, {profile.state}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Sprout className="h-4 w-4 text-[#4B5563]" />
                  <span className="text-[#4B5563]">Land Size:</span>
                  <span className="text-[#1F2933] font-medium">{profile.landSize} acres</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Sprout className="h-4 w-4 text-[#4B5563]" />
                  <span className="text-[#4B5563]">Primary Crop:</span>
                  <span className="text-[#1F2933] font-medium">{profile.primaryCrop}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Droplets className="h-4 w-4 text-[#4B5563]" />
                  <span className="text-[#4B5563]">Irrigation:</span>
                  <span className="text-[#1F2933] font-medium">{profile.irrigationType}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <IndianRupee className="h-4 w-4 text-[#4B5563]" />
                  <span className="text-[#4B5563]">Annual Income:</span>
                  <span className="text-[#1F2933] font-medium">Rs {profile.annualIncome?.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Tag className="h-4 w-4 text-[#4B5563]" />
                  <span className="text-[#4B5563]">Category:</span>
                  <span className="text-[#1F2933] font-medium">{profile.casteCategory}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Explore Schemes */}
          <Card className="bg-white shadow-sm border-[#E5E7EB]">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
                <Compass className="h-5 w-5 text-[#2E5FA7]" />
                Explore Schemes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#4B5563] mb-4">
                Browse additional government schemes beyond your recommendations.
              </p>
              <Link href="/schemes">
                <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white">
                  Explore All Schemes
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Nearby Agriculture Help Centers */}
          <Card className="bg-white shadow-sm border-[#E5E7EB] lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
                <Building2 className="h-5 w-5 text-[#F37021]" />
                Nearby Agriculture Help Centers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {helpCenters.map((center) => (
                  <div
                    key={center.name}
                    className="p-4 bg-[#F5F7F6] rounded-lg hover:bg-[#E8F5E9] transition-colors"
                  >
                    <h4 className="font-semibold text-[#1F2933] mb-2">{center.name}</h4>
                    <div className="space-y-1.5 text-sm">
                      <p className="flex items-center gap-2 text-[#4B5563]">
                        <MapPin className="h-4 w-4" />
                        {center.address}
                      </p>
                      <p className="flex items-center gap-2 text-[#4B5563]">
                        <Compass className="h-4 w-4" />
                        {center.distance} away
                      </p>
                      <p className="flex items-center gap-2 text-[#2E7D32]">
                        <Phone className="h-4 w-4" />
                        {center.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  )
}
