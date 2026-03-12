"use client"

import { useState, useEffect } from "react"
import {
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Eye,
  Check,
  X,
  AlertCircle,
  TrendingUp,
  Sprout,
  Shield,
  BarChart3,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { motion, AnimatePresence } from "framer-motion"

type ApplicationStatus = "pending" | "under_review" | "approved" | "rejected"

interface AdminApplication {
  id: string
  farmerName: string
  mobile: string
  schemeName: string
  appliedDate: string
  status: ApplicationStatus
  district: string
  landSize: string
  documents: { name: string; verified: boolean }[]
}

const pendingApplications: AdminApplication[] = [
  {
    id: "KS-2026-00201",
    farmerName: "Suresh Kumar",
    mobile: "9876543210",
    schemeName: "PM-Kisan Samman Nidhi",
    appliedDate: "March 11, 2026",
    status: "pending",
    district: "Pune",
    landSize: "3.5 acres",
    documents: [
      { name: "Aadhaar Card", verified: true },
      { name: "Land Records", verified: true },
      { name: "Bank Details", verified: false },
      { name: "Income Certificate", verified: false },
    ],
  },
  {
    id: "KS-2026-00202",
    farmerName: "Lakshmi Devi",
    mobile: "9876543211",
    schemeName: "Soil Health Card Scheme",
    appliedDate: "March 10, 2026",
    status: "pending",
    district: "Nashik",
    landSize: "2 acres",
    documents: [
      { name: "Aadhaar Card", verified: true },
      { name: "Land Records", verified: true },
      { name: "Contact Details", verified: true },
    ],
  },
  {
    id: "KS-2026-00203",
    farmerName: "Ravi Shankar",
    mobile: "9876543212",
    schemeName: "Fasal Bima Yojana",
    appliedDate: "March 9, 2026",
    status: "under_review",
    district: "Nagpur",
    landSize: "5 acres",
    documents: [
      { name: "Aadhaar Card", verified: true },
      { name: "Land Records", verified: true },
      { name: "Bank Details", verified: true },
      { name: "Crop Certificate", verified: false },
    ],
  },
]

const stats = [
  { label: "Total Farmers", value: "12,450", icon: Users, color: "text-[#2E7D32]", bgColor: "bg-[#2E7D32]/10" },
  { label: "Pending Applications", value: "234", icon: Clock, color: "text-[#F37021]", bgColor: "bg-[#F37021]/10" },
  { label: "Approved This Month", value: "1,567", icon: CheckCircle, color: "text-[#2E7D32]", bgColor: "bg-[#2E7D32]/10" },
  { label: "Active Schemes", value: "42", icon: Sprout, color: "text-[#2E5FA7]", bgColor: "bg-[#2E5FA7]/10" },
]

const statusConfig: Record<ApplicationStatus, { label: string; color: string; bgColor: string }> = {
  pending: { label: "Pending", color: "text-[#4B5563]", bgColor: "bg-[#4B5563]/10" },
  under_review: { label: "Under Review", color: "text-[#F37021]", bgColor: "bg-[#F37021]/10" },
  approved: { label: "Approved", color: "text-[#2E7D32]", bgColor: "bg-[#2E7D32]/10" },
  rejected: { label: "Rejected", color: "text-red-600", bgColor: "bg-red-100" },
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

function AnimatedNumber({ value }: { value: string }) {
  const [displayValue, setDisplayValue] = useState("0")
  const numericValue = parseInt(value.replace(/,/g, ""))

  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= numericValue) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current).toLocaleString())
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [numericValue, value])

  return <span>{displayValue}</span>
}

export default function AdminDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [applications, setApplications] = useState(pendingApplications)
  const [activeTab, setActiveTab] = useState("applications")

  const handleApprove = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "approved" as ApplicationStatus } : app
      )
    )
  }

  const handleReject = (id: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "rejected" as ApplicationStatus } : app
      )
    )
  }

  const filteredApplications = applications.filter(
    (app) =>
      app.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.schemeName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">
        {/* Page Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2E5FA7]/10 rounded-full mb-3">
                <Shield className="h-4 w-4 text-[#2E5FA7]" />
                <span className="text-sm font-medium text-[#2E5FA7]">Admin Portal</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#1F2933]">Admin Dashboard</h1>
              <p className="mt-2 text-lg text-[#4B5563]">
                Manage scheme applications, verify documents, and review farmer registrations
              </p>
            </div>
            <div className="flex gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="border-[#E5E7EB] rounded-xl">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="border-[#E5E7EB] rounded-xl">
                  <Settings className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-white shadow-lg border-[#E5E7EB] hover:border-[#2E7D32]/30 transition-all duration-300 overflow-hidden group">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        whileHover={{ rotate: 5 }}
                      >
                        <stat.icon className={`h-7 w-7 ${stat.color}`} />
                      </motion.div>
                      <div>
                        <motion.p
                          className={`text-2xl lg:text-3xl font-bold text-[#1F2933]`}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, type: "spring" }}
                        >
                          <AnimatedNumber value={stat.value} />
                        </motion.p>
                        <p className="text-sm text-[#4B5563]">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs defaultValue="applications" className="space-y-8" onValueChange={setActiveTab}>
            <TabsList className="bg-[#F5F7F6] p-1.5 rounded-xl h-14 w-full md:w-auto">
              <TabsTrigger
                value="applications"
                className="data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white rounded-lg px-6 text-base font-medium transition-all duration-300 data-[state=active]:shadow-md"
              >
                <FileText className="h-4 w-4 mr-2" />
                Applications
              </TabsTrigger>
              <TabsTrigger
                value="documents"
                className="data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white rounded-lg px-6 text-base font-medium transition-all duration-300 data-[state=active]:shadow-md"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger
                value="schemes"
                className="data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white rounded-lg px-6 text-base font-medium transition-all duration-300 data-[state=active]:shadow-md"
              >
                <Sprout className="h-4 w-4 mr-2" />
                Schemes
              </TabsTrigger>
            </TabsList>

            {/* Applications Tab */}
            <TabsContent value="applications">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white shadow-lg border-[#E5E7EB] overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-[#2E7D32] to-[#66BB6A]" />
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <CardTitle className="text-xl text-[#1F2933] flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-[#2E7D32]" />
                        Recent Applications
                      </CardTitle>
                      <div className="flex gap-3">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4B5563]" />
                          <Input
                            placeholder="Search applications..."
                            className="pl-11 w-72 border-[#E5E7EB] rounded-xl h-11 focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline" className="border-[#E5E7EB] rounded-xl h-11">
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-[#F5F7F6]/50">
                            <TableHead className="font-semibold text-[#1F2933]">Application ID</TableHead>
                            <TableHead className="font-semibold text-[#1F2933]">Farmer Name</TableHead>
                            <TableHead className="font-semibold text-[#1F2933]">Scheme</TableHead>
                            <TableHead className="font-semibold text-[#1F2933]">District</TableHead>
                            <TableHead className="font-semibold text-[#1F2933]">Applied Date</TableHead>
                            <TableHead className="font-semibold text-[#1F2933]">Status</TableHead>
                            <TableHead className="font-semibold text-[#1F2933]">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <AnimatePresence>
                            {filteredApplications.map((app, index) => (
                              <motion.tr
                                key={app.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: index * 0.05 }}
                                className="group hover:bg-[#F5F7F6]/50 transition-colors"
                              >
                                <TableCell className="font-medium text-[#2E5FA7]">{app.id}</TableCell>
                                <TableCell className="font-medium">{app.farmerName}</TableCell>
                                <TableCell>{app.schemeName}</TableCell>
                                <TableCell>{app.district}</TableCell>
                                <TableCell>{app.appliedDate}</TableCell>
                                <TableCell>
                                  <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring" }}
                                  >
                                    <Badge className={`${statusConfig[app.status].bgColor} ${statusConfig[app.status].color}`}>
                                      {statusConfig[app.status].label}
                                    </Badge>
                                  </motion.div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-1">
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-lg hover:bg-[#2E7D32]/10">
                                            <Eye className="h-4 w-4 text-[#4B5563]" />
                                          </Button>
                                        </motion.div>
                                      </DialogTrigger>
                                      <DialogContent className="sm:max-w-lg">
                                        <DialogHeader>
                                          <DialogTitle className="text-xl">Application Details</DialogTitle>
                                        </DialogHeader>
                                        <motion.div
                                          className="space-y-6 pt-4"
                                          initial={{ opacity: 0, y: 10 }}
                                          animate={{ opacity: 1, y: 0 }}
                                        >
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-[#F5F7F6] rounded-xl">
                                              <p className="text-sm text-[#4B5563]">Application ID</p>
                                              <p className="font-semibold text-[#2E5FA7]">{app.id}</p>
                                            </div>
                                            <div className="p-3 bg-[#F5F7F6] rounded-xl">
                                              <p className="text-sm text-[#4B5563]">Farmer Name</p>
                                              <p className="font-semibold">{app.farmerName}</p>
                                            </div>
                                            <div className="p-3 bg-[#F5F7F6] rounded-xl">
                                              <p className="text-sm text-[#4B5563]">Mobile</p>
                                              <p className="font-semibold">{app.mobile}</p>
                                            </div>
                                            <div className="p-3 bg-[#F5F7F6] rounded-xl">
                                              <p className="text-sm text-[#4B5563]">District</p>
                                              <p className="font-semibold">{app.district}</p>
                                            </div>
                                            <div className="p-3 bg-[#F5F7F6] rounded-xl">
                                              <p className="text-sm text-[#4B5563]">Land Size</p>
                                              <p className="font-semibold">{app.landSize}</p>
                                            </div>
                                            <div className="p-3 bg-[#F5F7F6] rounded-xl">
                                              <p className="text-sm text-[#4B5563]">Scheme</p>
                                              <p className="font-semibold text-[#2E7D32]">{app.schemeName}</p>
                                            </div>
                                          </div>
                                          <div>
                                            <p className="text-sm text-[#4B5563] mb-3 font-medium">Documents</p>
                                            <div className="space-y-2">
                                              {app.documents.map((doc, i) => (
                                                <motion.div
                                                  key={doc.name}
                                                  className="flex items-center justify-between p-3 bg-[#F5F7F6] rounded-xl"
                                                  initial={{ opacity: 0, x: -10 }}
                                                  animate={{ opacity: 1, x: 0 }}
                                                  transition={{ delay: i * 0.1 }}
                                                >
                                                  <span className="text-sm">{doc.name}</span>
                                                  {doc.verified ? (
                                                    <Badge className="bg-[#2E7D32]/10 text-[#2E7D32]">
                                                      <CheckCircle className="h-3 w-3 mr-1" />
                                                      Verified
                                                    </Badge>
                                                  ) : (
                                                    <Badge className="bg-[#F37021]/10 text-[#F37021]">
                                                      <Clock className="h-3 w-3 mr-1" />
                                                      Pending
                                                    </Badge>
                                                  )}
                                                </motion.div>
                                              ))}
                                            </div>
                                          </div>
                                        </motion.div>
                                      </DialogContent>
                                    </Dialog>
                                    {app.status === "pending" || app.status === "under_review" ? (
                                      <>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-9 w-9 p-0 rounded-lg text-[#2E7D32] hover:bg-[#2E7D32]/10"
                                            onClick={() => handleApprove(app.id)}
                                          >
                                            <Check className="h-4 w-4" />
                                          </Button>
                                        </motion.div>
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-9 w-9 p-0 rounded-lg text-red-600 hover:bg-red-50"
                                            onClick={() => handleReject(app.id)}
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </motion.div>
                                      </>
                                    ) : null}
                                  </div>
                                </TableCell>
                              </motion.tr>
                            ))}
                          </AnimatePresence>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white shadow-lg border-[#E5E7EB] overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-[#F37021] to-[#FFB74D]" />
                  <CardHeader>
                    <CardTitle className="text-xl text-[#1F2933] flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#F37021]" />
                      Document Verification Queue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="space-y-4"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      {applications
                        .filter((app) => app.documents.some((d) => !d.verified))
                        .map((app, index) => (
                          <motion.div
                            key={app.id}
                            className="p-5 bg-gradient-to-br from-[#F5F7F6] to-[#E8F5E9] rounded-2xl border border-[#E5E7EB] hover:border-[#2E7D32]/30 transition-all duration-300"
                            variants={fadeInUp}
                            whileHover={{ scale: 1.01, x: 4 }}
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white font-bold shadow-lg">
                                  {app.farmerName.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-semibold text-[#1F2933] text-lg">{app.farmerName}</p>
                                  <p className="text-sm text-[#4B5563]">{app.id} - {app.schemeName}</p>
                                </div>
                              </div>
                              <Badge className="bg-[#F37021]/10 text-[#F37021] text-sm px-3 py-1">
                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                {app.documents.filter((d) => !d.verified).length} pending
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              {app.documents
                                .filter((d) => !d.verified)
                                .map((doc, i) => (
                                  <motion.div
                                    key={doc.name}
                                    className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all duration-300"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                  >
                                    <FileText className="h-4 w-4 text-[#4B5563]" />
                                    <span className="text-sm font-medium">{doc.name}</span>
                                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-lg text-[#2E7D32] hover:bg-[#2E7D32]/10">
                                        <Check className="h-4 w-4" />
                                      </Button>
                                    </motion.div>
                                  </motion.div>
                                ))}
                            </div>
                          </motion.div>
                        ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Schemes Tab */}
            <TabsContent value="schemes">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white shadow-lg border-[#E5E7EB] overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-[#2E5FA7] to-[#5C9CE5]" />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-[#1F2933] flex items-center gap-2">
                        <Sprout className="h-5 w-5 text-[#2E5FA7]" />
                        Active Schemes
                      </CardTitle>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl shadow-md">
                          Add New Scheme
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="text-center py-16"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-[#2E7D32]/10 to-[#66BB6A]/10 flex items-center justify-center"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Sprout className="h-12 w-12 text-[#2E7D32]" />
                      </motion.div>
                      <p className="text-lg text-[#4B5563] font-medium">Scheme management features coming soon.</p>
                      <p className="text-sm text-[#4B5563] mt-2">You can add, edit, and manage government schemes here.</p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageLayout>
  )
}
