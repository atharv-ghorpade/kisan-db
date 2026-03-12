"use client"

import { Globe, Accessibility, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function GovernmentBar() {
  return (
    <div className="w-full bg-gradient-to-r from-[#FF9933] to-[#F37021] py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left side - Government of India */}
        <div className="flex items-center gap-2">
          {/* Indian Flag Icon */}
          <div className="flex flex-col h-4 w-6 rounded-sm overflow-hidden shadow-sm">
            <div className="h-1/3 bg-[#FF9933]" />
            <div className="h-1/3 bg-white flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full border border-[#000080]" />
            </div>
            <div className="h-1/3 bg-[#138808]" />
          </div>
          <span className="text-white text-sm font-medium">Government of India</span>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-1">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 h-7 px-2 text-xs"
              >
                <Globe className="h-3.5 w-3.5 mr-1" />
                <span className="hidden sm:inline">English</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>हिंदी</DropdownMenuItem>
              <DropdownMenuItem>मराठी</DropdownMenuItem>
              <DropdownMenuItem>తెలుగు</DropdownMenuItem>
              <DropdownMenuItem>தமிழ்</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Accessibility */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-7 px-2"
          >
            <Accessibility className="h-3.5 w-3.5" />
          </Button>

          {/* Help */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 h-7 px-2 text-xs"
          >
            <HelpCircle className="h-3.5 w-3.5 mr-1" />
            <span className="hidden sm:inline">Help</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
