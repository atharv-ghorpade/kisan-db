"use client"

import { useState } from "react"
import Link from "next/link"
import { Filter, SlidersHorizontal, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { SchemeCard } from "@/components/kisan-sathi/scheme-card"
import { getRecommendedSchemes } from "@/lib/schemes-data"

const schemeTypes = ["All", "Central", "State"]
const benefitRanges = ["All", "Up to Rs 10,000", "Rs 10,000 - Rs 50,000", "Above Rs 50,000"]

export default function RecommendedSchemesPage() {
  const [selectedType, setSelectedType] = useState("All")
  const [selectedBenefit, setSelectedBenefit] = useState("All")

  const recommendedSchemes = getRecommendedSchemes()

  const filteredSchemes = recommendedSchemes.filter((scheme) => {
    const matchesType = selectedType === "All" || scheme.type === selectedType
    return matchesType
  })

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Back Button */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[#2E7D32] hover:text-[#1B5E20] mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1F2933]">Recommended Government Schemes</h1>
          <p className="mt-2 text-[#4B5563]">
            Based on your farm profile, these schemes match your eligibility.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48 border-[#E5E7EB]">
                <Filter className="h-4 w-4 mr-2 text-[#4B5563]" />
                <SelectValue placeholder="Scheme Type" />
              </SelectTrigger>
              <SelectContent>
                {schemeTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Benefit Filter */}
            <Select value={selectedBenefit} onValueChange={setSelectedBenefit}>
              <SelectTrigger className="w-full md:w-56 border-[#E5E7EB]">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-[#4B5563]" />
                <SelectValue placeholder="Benefit Amount" />
              </SelectTrigger>
              <SelectContent>
                {benefitRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-[#4B5563] mb-6">
          {filteredSchemes.length} schemes match your profile
        </p>

        {/* Scheme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} showMatch showApply />
          ))}
        </div>

        {/* Empty State */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-[#E5E7EB]">
            <p className="text-[#1F2933] text-lg font-medium mb-2">
              No schemes match your current farm profile.
            </p>
            <p className="text-[#4B5563] mb-4">
              Update your profile to discover more schemes.
            </p>
            <Link href="/profile">
              <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white">
                Update Profile
              </Button>
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
