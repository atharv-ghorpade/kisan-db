"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  IndianRupee,
  Calendar,
  Eye,
  Filter,
  Search,
  Download,
  RefreshCw,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"

type ApplicationStatus = "pending" | "under_review" | "approved" | "rejected"

interface Application {
  id: string
  schemeId: string
  schemeName: string
  appliedDate: string
  status: ApplicationStatus
  benefit: string
  lastUpdated: string
  nextStep?: string
  progress: number
  documents: { name: string; status: "verified" | "pending" | "rejected" }[]
}

const statusConfig: Record<ApplicationStatus, { label: string; color: string; bgColor: string; icon: any }> = {
  pending: {
    label: "Pending",
    color: "text-[#4B5563]",
    bgColor: "bg-[#4B5563]/10",
    icon: Clock,
  },
  under_review: {
    label: "Under Review",
    color: "text-[#F37021]",
    bgColor: "bg-[#F37021]/10",
    icon: AlertCircle,
  },
  approved: {
    label: "Approved",
    color: "text-[#2E7D32]",
    bgColor: "bg-[#2E7D32]/10",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-600",
    bgColor: "bg-red-100",
    icon: AlertCircle,
  },
}

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  )
}

export default function AppliedSchemesPage() {
  const { user } = useAuth()
  const [dbApplications, setDbApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    if (!user) return

    fetch(`http://127.0.0.1:8000/applications/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((app: any) => ({
          id: app.application_number,
          schemeId: app.scheme_id.toString(),
          schemeName: "Scheme ID: " + app.scheme_id,
          appliedDate: new Date(app.submission_date).toLocaleDateString(),
          status: app.status as ApplicationStatus,
          benefit: app.subsidy_amount_approved ? `Rs ${app.subsidy_amount_approved}` : "TBD",
          lastUpdated: new Date(app.updated_at).toLocaleDateString(),
          progress: app.status === "approved" ? 100 : app.status === "under_review" ? 60 : 25,
          documents: [],
        }))
        setDbApplications(mapped)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
        setIsLoading(false)
      })
  }, [user])

  const filteredApplications = dbApplications.filter((app) => {
    const matchesSearch =
      app.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = [
    { label: "Total Applications", value: dbApplications.length, color: "text-[#1F2933]" },
    { label: "Approved", value: dbApplications.filter((a) => a.status === "approved").length, color: "text-[#2E7D32]" },
    { label: "Under Review", value: dbApplications.filter((a) => a.status === "under_review").length, color: "text-[#F37021]" },
    { label: "Pending", value: dbApplications.filter((a) => a.status === "pending").length, color: "text-[#4B5563]" },
  ]

  if (!user) {
    return (
      <PageLayout>
        <div className="max-w-5xl mx-auto py-20 px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Please login to view your applications</h2>
            <Link href="/auth">
                <Button className="bg-[#2E7D32]">Login Now</Button>
            </Link>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto py-10 px-4">
        {/* Page Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1F2933]">Applied Schemes</h1>
              <p className="mt-2 text-lg text-[#4B5563]">
                Track the status of your scheme applications
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="border-[#2E7D32] text-[#2E7D32] rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <Card className="bg-white shadow-lg border-[#E5E7EB] hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className={`h-1 ${
                  index === 1 ? "bg-[#2E7D32]" : 
                  index === 2 ? "bg-[#F37021]" : 
                  index === 3 ? "bg-[#4B5563]" : "bg-[#2E5FA7]"
                }`} />
                <CardContent className="pt-6 text-center">
                  <motion.p
                    className={`text-3xl font-bold ${stat.color}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                  >
                    <AnimatedNumber value={stat.value} />
                  </motion.p>
                  <p className="text-sm text-[#4B5563] mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
            <Input
              placeholder="Search by scheme name or application ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 border-[#E5E7EB] rounded-xl focus:border-[#2E7D32] focus:ring-[#2E7D32]"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 h-12 border-[#E5E7EB] rounded-xl">
              <Filter className="h-4 w-4 mr-2 text-[#4B5563]" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Applications List */}
        <motion.div
          className="space-y-5"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {isLoading ? (
            <div className="text-center py-20">
                <Loader2 className="h-10 w-10 animate-spin mx-auto text-[#2E7D32] mb-4" />
                <p>Loading your applications...</p>
            </div>
          ) : (
            <AnimatePresence>
                {filteredApplications.map((application, index) => {
                const config = statusConfig[application.status] || statusConfig.pending
                const StatusIcon = config.icon

                return (
                    <motion.div
                    key={application.id}
                    variants={fadeInUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    layout
                    >
                    <Card className="bg-white shadow-lg border-[#E5E7EB] hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div className={`h-1 ${
                        application.status === "approved" ? "bg-gradient-to-r from-[#2E7D32] to-[#66BB6A]" :
                        application.status === "under_review" ? "bg-gradient-to-r from-[#F37021] to-[#FFB74D]" :
                        "bg-[#4B5563]"
                        }`} />
                        <CardContent className="pt-6">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                            <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3 flex-wrap">
                                <h3 className="font-semibold text-[#1F2933] text-xl group-hover:text-[#2E7D32] transition-colors">
                                {application.schemeName}
                                </h3>
                                <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: index * 0.1 }}
                                >
                                <Badge className={`${config.bgColor} ${config.color}`}>
                                    <StatusIcon className="h-3 w-3 mr-1" />
                                    {config.label}
                                </Badge>
                                </motion.div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-[#4B5563]">Application Progress</span>
                                <span className="font-medium text-[#1F2933]">{application.progress}%</span>
                                </div>
                                <div className="h-2.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full rounded-full ${
                                    application.status === "approved" ? "bg-gradient-to-r from-[#2E7D32] to-[#66BB6A]" :
                                    application.status === "under_review" ? "bg-gradient-to-r from-[#F37021] to-[#FFB74D]" :
                                    "bg-[#4B5563]"
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${application.progress}%` }}
                                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                                />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-[#4B5563]">
                                <FileText className="h-4 w-4" />
                                <span>{application.id}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#4B5563]">
                                <Calendar className="h-4 w-4" />
                                <span>{application.appliedDate}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#2E7D32]">
                                <IndianRupee className="h-4 w-4" />
                                <span className="font-medium">{application.benefit}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#4B5563]">
                                <RefreshCw className="h-4 w-4" />
                                <span>{application.lastUpdated}</span>
                                </div>
                            </div>
                            </div>

                            <div className="flex gap-2 shrink-0">
                            <Dialog>
                                <DialogTrigger asChild>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white rounded-lg transition-all duration-300"
                                    >
                                    <Eye className="h-4 w-4 mr-1" />
                                    Details
                                    </Button>
                                </motion.div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-lg">
                                <DialogHeader>
                                    <DialogTitle className="text-xl">{application.schemeName}</DialogTitle>
                                </DialogHeader>
                                <motion.div
                                    className="space-y-6 pt-4"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-[#4B5563]">Application ID</p>
                                        <p className="font-medium">{application.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#4B5563]">Status</p>
                                        <Badge className={`${config.bgColor} ${config.color}`}>
                                        {config.label}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#4B5563]">Applied Date</p>
                                        <p className="font-medium">{application.appliedDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#4B5563]">Benefit</p>
                                        <p className="font-medium text-[#2E7D32]">{application.benefit}</p>
                                    </div>
                                    </div>
                                </motion.div>
                                </DialogContent>
                            </Dialog>
                            <Link href={`/schemes`}>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-[#4B5563] hover:text-[#2E7D32] hover:bg-[#2E7D32]/10 rounded-lg"
                                >
                                    View Schemes
                                </Button>
                                </motion.div>
                            </Link>
                            </div>
                        </div>
                        </CardContent>
                    </Card>
                    </motion.div>
                )
                })}
            </AnimatePresence>
          )}
        </motion.div>

        {/* Empty State */}
        {!isLoading && filteredApplications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-white shadow-lg border-[#E5E7EB]">
              <CardContent className="py-16 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  <FileText className="h-16 w-16 text-[#4B5563] mx-auto mb-6" />
                </motion.div>
                <h3 className="text-xl font-medium text-[#1F2933] mb-2">
                  No applications found
                </h3>
                <p className="text-[#4B5563] mb-6 max-w-md mx-auto">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "Start by exploring available schemes and applying for the ones you are eligible for."}
                </p>
                <Link href="/schemes">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-5 rounded-xl shadow-lg">
                      Explore Schemes
                    </Button>
                  </motion.div>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </PageLayout>
  )
}
