"use client"

import { useState } from "react"
import { Search, Filter, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect } from "react"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { SchemeCard } from "@/components/kisan-sathi/scheme-card"

const schemeTypes = ["All", "Central", "State"]
const crops = ["All", "Wheat", "Rice", "Cotton", "Sugarcane", "Pulses"]

export default function SchemesPage() {
  const [dbSchemes, setDbSchemes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedCrop, setSelectedCrop] = useState("All")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/schemes")
      .then(res => res.json())
      .then(data => {
        setDbSchemes(data.schemes || [])
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }, [])

  const filteredSchemes = dbSchemes.filter((scheme) => {
    const title = scheme.scheme_name || scheme.title || scheme.name || ""
    const desc = scheme.eligibility || scheme.description || scheme.benefits || ""
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "All" || (scheme.type === selectedType || scheme.ministry === selectedType)
    return matchesSearch && matchesType
  })

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1F2933]">Government Schemes</h1>
          <p className="mt-2 text-[#4B5563]">
            Browse all available government schemes for farmers
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
              <Input
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#E5E7EB] focus:border-[#2E7D32]"
              />
            </div>

            {/* Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-40 border-[#E5E7EB]">
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

            {/* Crop Filter */}
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="w-full md:w-40 border-[#E5E7EB]">
                <SlidersHorizontal className="h-4 w-4 mr-2 text-[#4B5563]" />
                <SelectValue placeholder="Crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-[#4B5563] mb-6">
          Showing {filteredSchemes.length} schemes
        </p>

        {/* Scheme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} showMatch showApply />
          ))}
        </div>

        {/* Empty State */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#4B5563] text-lg">No schemes found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 border-[#2E7D32] text-[#2E7D32]"
              onClick={() => {
                setSearchQuery("")
                setSelectedType("All")
                setSelectedCrop("All")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
