"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { IndianRupee } from "lucide-react"
import { motion } from "framer-motion"

export interface Scheme {
  id?: string
  scheme_id?: string | number
  slug?: string
  name?: string
  scheme_name?: string
  title?: string
  description?: string
  eligibility_summary?: string
  benefit?: string
  benefits?: string
  type?: "Central" | "State"
  ministry?: string
  benefitAmount?: string
  matchPercentage?: number
  score?: number
  priority?: "HIGH" | "MEDIUM" | "LOW"
}

interface SchemeCardProps {
  scheme: Scheme
  showMatch?: boolean
  showApply?: boolean
  index?: number
}

export function SchemeCard({ scheme, showMatch = false, showApply = false, index = 0 }: SchemeCardProps) {
  const [animatedMatch, setAnimatedMatch] = useState(0)
  
  const score = scheme.score || scheme.matchPercentage || 0;
  const displayName = scheme.scheme_name || scheme.name || scheme.title;
  const displayDesc = scheme.eligibility_summary || scheme.description || scheme.benefits;
  const benefit = scheme.benefit || scheme.benefits;
  const schemeId = scheme.scheme_id || scheme.id || scheme.slug;

  useEffect(() => {
    if (showMatch && score > 0) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedMatch((prev) => {
            if (prev >= score) {
              clearInterval(interval)
              return score
            }
            return prev + 1
          })
        }, 15)
        return () => clearInterval(interval)
      }, index * 100)
      return () => clearTimeout(timer)
    }
  }, [showMatch, score, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -4 }}
    >
      <Card className="group bg-white border border-[#E5E7EB] shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E7D32]/0 to-[#2E7D32]/0 group-hover:from-[#2E7D32]/[0.02] group-hover:to-[#66BB6A]/[0.05] transition-all duration-500 pointer-events-none rounded-xl" />
        <CardHeader className="pb-3 relative">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold text-[#1F2933] line-clamp-2 group-hover:text-[#2E7D32] transition-colors duration-300">
              {displayName}
            </CardTitle>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {scheme.priority ? (
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    scheme.priority === 'HIGH'   ? 'bg-green-100 text-green-800' :
                    scheme.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                                                   'bg-gray-100 text-gray-600'
                  }`}>
                    {scheme.priority} MATCH
                  </span>
              ) : (
                scheme.type && (
                  <Badge
                    variant="secondary"
                    className={`shrink-0 transition-all duration-300 ${
                      scheme.type === "Central"
                        ? "bg-[#2E5FA7]/10 text-[#2E5FA7] group-hover:bg-[#2E5FA7]/20"
                        : "bg-[#F37021]/10 text-[#F37021] group-hover:bg-[#F37021]/20"
                    }`}
                  >
                    {scheme.type}
                  </Badge>
                )
              )}
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-3 relative">
          <p className="text-[#4B5563] text-sm line-clamp-2 mb-4">{displayDesc}</p>
          <motion.div
            className="flex items-center gap-2 text-[#2E7D32]"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IndianRupee className="h-4 w-4" />
            </motion.div>
            <span className="font-medium text-sm line-clamp-1">{benefit}</span>
          </motion.div>
          {showMatch && score > 0 && (
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-[#E5E7EB] rounded-full h-2.5 overflow-hidden">
                <motion.div
                  className={`h-2.5 rounded-full ${
                    score >= 80
                      ? "bg-gradient-to-r from-[#2E7D32] to-[#66BB6A]"
                      : score >= 50
                      ? "bg-gradient-to-r from-[#F37021] to-[#FFB74D]"
                      : "bg-[#4B5563]"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                />
              </div>
              <motion.span
                className="text-sm font-semibold text-[#1F2933] min-w-[70px] text-right"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {animatedMatch}% Match
              </motion.span>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-0 gap-2 relative">
          {showApply && (
            <Link href={`/apply/${schemeId}`} className="flex-1 w-full">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white transition-all duration-300 shadow-md hover:shadow-lg">
                  Apply Now →
                </Button>
              </motion.div>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
