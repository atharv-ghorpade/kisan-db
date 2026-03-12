import { Sprout } from "lucide-react"
import Link from "next/link"

interface LogoProps {
  variant?: "light" | "dark"
  size?: "sm" | "md" | "lg"
}

export function Logo({ variant = "light", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-12",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  const textColor = variant === "light" ? "text-[#1F2933]" : "text-white"
  const subTextColor = variant === "light" ? "text-[#4B5563]" : "text-white/80"

  return (
    <Link href="/" className="flex items-center gap-2 group">
      {/* Logo Icon */}
      <div className={`${sizeClasses[size]} aspect-square relative`}>
        <div className="absolute inset-0 flex items-end justify-center">
          {/* Soil */}
          <div className="w-full h-1/4 bg-[#8B4513] rounded-b-sm" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Plant */}
          <Sprout className={`${size === "sm" ? "h-5 w-5" : size === "md" ? "h-6 w-6" : "h-7 w-7"} text-[#2E7D32]`} />
        </div>
        <div className="absolute top-0 right-0">
          {/* Sun */}
          <div className={`${size === "sm" ? "h-2 w-2" : "h-2.5 w-2.5"} rounded-full bg-[#F37021]`} />
        </div>
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-tight">
        <span className={`font-bold ${textSizes[size]} ${textColor} group-hover:text-[#2E7D32] transition-colors`}>
          किसान साथी
        </span>
        <span className={`font-semibold ${size === "sm" ? "text-xs" : "text-sm"} ${subTextColor}`}>
          Kisan Sathi
        </span>
      </div>
    </Link>
  )
}
