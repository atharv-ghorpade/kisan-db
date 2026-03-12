"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  IndianRupee,
  Calendar,
  FileText,
  CheckCircle,
  Users,
  Clock,
  Building2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { getSchemeBySlug } from "@/lib/schemes-data"

// Extended scheme details (would come from a database in production)
const schemeDetails: Record<string, {
  fullDescription: string
  eligibility: string[]
  benefits: string[]
  documents: string[]
  applicationDeadline: string
  ministry: string
  launchYear: string
  beneficiaries: string
}> = {
  "pm-kisan": {
    fullDescription: "PM-Kisan Samman Nidhi Yojana is a Central Sector scheme with 100% funding from Government of India. It provides income support to all landholding farmer families across the country to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs.",
    eligibility: [
      "All landholding farmer families with cultivable land",
      "Both husband and wife can benefit if land is in their joint names",
      "Family includes self, spouse, and minor children",
      "Small and marginal farmers are prioritized",
    ],
    benefits: [
      "Rs 6,000 per year in three equal installments",
      "Direct Bank Transfer (DBT) to beneficiary account",
      "First installment: April - July",
      "Second installment: August - November",
      "Third installment: December - March",
    ],
    documents: [
      "Aadhaar Card",
      "Land ownership documents / Land records",
      "Bank account details with IFSC code",
      "Mobile number linked with Aadhaar",
    ],
    applicationDeadline: "Open throughout the year",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchYear: "2019",
    beneficiaries: "11+ Crore farmers",
  },
  "soil-health": {
    fullDescription: "Soil Health Card Scheme is a flagship program aimed at issuing soil health cards to all farmers across the country. The card provides information on soil health status and recommends appropriate dosage of nutrients to improve soil health and fertility.",
    eligibility: [
      "All farmers with agricultural land",
      "No minimum land size requirement",
      "Both registered and unregistered farmers",
    ],
    benefits: [
      "Free soil testing",
      "Personalized soil health card",
      "Crop-wise fertilizer recommendations",
      "Improved crop productivity",
      "Reduced input costs",
    ],
    documents: [
      "Aadhaar Card",
      "Land records",
      "Contact details",
    ],
    applicationDeadline: "Open throughout the year",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchYear: "2015",
    beneficiaries: "12+ Crore farmers",
  },
  "fasal-bima": {
    fullDescription: "Pradhan Mantri Fasal Bima Yojana provides comprehensive insurance coverage against failure of the crop thus helping in stabilising the income of the farmers. The scheme covers all Food & Oilseeds crops and Annual Commercial/Horticultural Crops.",
    eligibility: [
      "All farmers growing notified crops",
      "Both loanee and non-loanee farmers",
      "Sharecroppers and tenant farmers (with proper documentation)",
    ],
    benefits: [
      "Financial support in case of crop loss",
      "Low premium rates (2% for Kharif, 1.5% for Rabi)",
      "Coverage for prevented sowing",
      "Post-harvest losses covered",
      "Localized calamity coverage",
    ],
    documents: [
      "Aadhaar Card",
      "Land records / Tenancy agreement",
      "Bank account details",
      "Crop sowing certificate",
    ],
    applicationDeadline: "Varies by crop season",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    launchYear: "2016",
    beneficiaries: "6+ Crore farmers",
  },
}

// Default details for schemes without specific data
const defaultDetails = {
  fullDescription: "This government scheme is designed to support farmers and improve agricultural productivity. Please contact your nearest agriculture office for complete details.",
  eligibility: [
    "Indian citizen farmers",
    "Valid land records",
    "Registered with local agriculture department",
  ],
  benefits: [
    "Financial assistance",
    "Technical support",
    "Access to resources",
  ],
  documents: [
    "Aadhaar Card",
    "Land ownership proof",
    "Bank account details",
  ],
  applicationDeadline: "Contact local office",
  ministry: "Ministry of Agriculture & Farmers Welfare",
  launchYear: "2020",
  beneficiaries: "Farmers across India",
}

export default function SchemeDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const scheme = getSchemeBySlug(slug)

  if (!scheme) {
    notFound()
  }

  const details = schemeDetails[slug] || defaultDetails

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Back Button */}
        <Link href="/schemes" className="inline-flex items-center gap-2 text-[#2E7D32] hover:text-[#1B5E20] mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Schemes
        </Link>

        {/* Scheme Header */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Badge
                  variant="secondary"
                  className={
                    scheme.type === "Central"
                      ? "bg-[#2E5FA7]/10 text-[#2E5FA7]"
                      : "bg-[#F37021]/10 text-[#F37021]"
                  }
                >
                  {scheme.type} Government Scheme
                </Badge>
                {scheme.matchPercentage && (
                  <Badge className="bg-[#2E7D32] text-white">
                    {scheme.matchPercentage}% Match
                  </Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1F2933] mb-2">{scheme.name}</h1>
              <p className="text-[#4B5563]">{scheme.description}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href={`/apply/${slug}`}>
                <Button size="lg" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white">
                  Apply Now
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-[#2E7D32]" />
              <div>
                <p className="text-xs text-[#4B5563]">Benefit</p>
                <p className="font-semibold text-[#1F2933]">{scheme.benefit}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#2E5FA7]" />
              <div>
                <p className="text-xs text-[#4B5563]">Ministry</p>
                <p className="font-semibold text-[#1F2933] text-sm truncate">{details.ministry.split(" ").slice(0, 2).join(" ")}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#F37021]" />
              <div>
                <p className="text-xs text-[#4B5563]">Beneficiaries</p>
                <p className="font-semibold text-[#1F2933]">{details.beneficiaries}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#4B5563]" />
              <div>
                <p className="text-xs text-[#4B5563]">Launched</p>
                <p className="font-semibold text-[#1F2933]">{details.launchYear}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* About the Scheme */}
          <Card className="bg-white shadow-sm border-[#E5E7EB] md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#2E7D32]" />
                About the Scheme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#4B5563] leading-relaxed">{details.fullDescription}</p>
            </CardContent>
          </Card>

          {/* Eligibility */}
          <Card className="bg-white shadow-sm border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
                <Users className="h-5 w-5 text-[#2E5FA7]" />
                Eligibility Criteria
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {details.eligibility.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#4B5563]">
                    <CheckCircle className="h-4 w-4 text-[#2E7D32] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="bg-white shadow-sm border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-[#2E7D32]" />
                Benefits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {details.benefits.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#4B5563]">
                    <CheckCircle className="h-4 w-4 text-[#2E7D32] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Required Documents */}
          <Card className="bg-white shadow-sm border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#F37021]" />
                Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {details.documents.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#4B5563]">
                    <div className="h-4 w-4 rounded border border-[#E5E7EB] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Application Timeline */}
          <Card className="bg-white shadow-sm border-[#E5E7EB]">
            <CardHeader>
              <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#4B5563]" />
                Application Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-[#F5F7F6] rounded-lg">
                <AlertCircle className="h-5 w-5 text-[#F37021]" />
                <div>
                  <p className="text-sm font-medium text-[#1F2933]">Application Deadline</p>
                  <p className="text-sm text-[#4B5563]">{details.applicationDeadline}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link href={`/apply/${slug}`}>
            <Button size="lg" className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8">
              Apply for this Scheme
            </Button>
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
