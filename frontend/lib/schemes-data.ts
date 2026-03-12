import { type Scheme } from "@/components/kisan-sathi/scheme-card"

export const schemes: Scheme[] = [
  {
    id: "1",
    slug: "pm-kisan",
    name: "PM-Kisan Samman Nidhi",
    description: "Direct income support of Rs 6,000 per year to farmer families across the country, paid in three equal installments.",
    type: "Central",
    benefit: "Rs 6,000/year",
    benefitAmount: "6000",
    matchPercentage: 92,
  },
  {
    id: "2",
    slug: "soil-health",
    name: "Soil Health Card Scheme",
    description: "Free soil testing and health cards with recommendations for crop-wise fertilizer usage to improve soil health.",
    type: "Central",
    benefit: "Free soil testing",
    matchPercentage: 88,
  },
  {
    id: "3",
    slug: "fasal-bima",
    name: "Pradhan Mantri Fasal Bima Yojana",
    description: "Comprehensive crop insurance scheme to provide financial support to farmers in case of crop failure due to natural calamities.",
    type: "Central",
    benefit: "Crop insurance coverage",
    matchPercentage: 85,
  },
  {
    id: "4",
    slug: "kisan-credit",
    name: "Kisan Credit Card",
    description: "Easy access to credit for farmers to meet their agricultural and farm-related expenses at subsidized interest rates.",
    type: "Central",
    benefit: "Up to Rs 3 lakh credit",
    matchPercentage: 78,
  },
  {
    id: "5",
    slug: "drip-irrigation",
    name: "Pradhan Mantri Krishi Sinchayee Yojana",
    description: "Subsidy for micro-irrigation systems including drip and sprinkler irrigation to improve water use efficiency.",
    type: "Central",
    benefit: "55-90% subsidy",
    matchPercentage: 72,
  },
  {
    id: "6",
    slug: "agri-infra",
    name: "Agriculture Infrastructure Fund",
    description: "Credit facility for investment in post-harvest management infrastructure and community farming assets.",
    type: "Central",
    benefit: "Rs 1 crore loan at 3% interest",
    matchPercentage: 65,
  },
]

export function getSchemeBySlug(slug: string): Scheme | undefined {
  return schemes.find((s) => s.slug === slug)
}

export function getPopularSchemes(): Scheme[] {
  return schemes.slice(0, 3)
}

export function getRecommendedSchemes(): Scheme[] {
  return schemes.filter((s) => (s.matchPercentage || 0) >= 70)
}
