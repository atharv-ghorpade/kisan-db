"use client"

import { useState } from "react"
import {
  ThumbsUp,
  Share2,
  MessageSquare,
  Send,
  MapPin,
  Sprout,
  CheckCircle,
  Play,
  Volume2,
  User,
  Award,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { motion, AnimatePresence } from "framer-motion"

const successStories = [
  {
    id: 1,
    farmer: "Ramesh Patil",
    location: "Pune, Maharashtra",
    crop: "Wheat",
    story: "After registering on Kisan Sathi, I discovered I was eligible for PM-Kisan and Soil Health Card schemes. Within 3 months, I received my first installment and soil testing report. My yield improved by 25%!",
    benefitAmount: "Rs 48,000",
    schemes: ["PM-Kisan", "Soil Health Card"],
    verified: true,
    likes: 124,
    hasAudio: true,
    hasVideo: true,
    image: "RP",
  },
  {
    id: 2,
    farmer: "Sunita Devi",
    location: "Varanasi, Uttar Pradesh",
    crop: "Rice",
    story: "I was unaware of crop insurance until Kisan Sathi recommended it. When floods damaged my crop last monsoon, I received compensation that saved my family from financial crisis.",
    benefitAmount: "Rs 75,000",
    schemes: ["Fasal Bima Yojana"],
    verified: true,
    likes: 89,
    hasAudio: false,
    hasVideo: true,
    image: "SD",
  },
  {
    id: 3,
    farmer: "Gurpreet Singh",
    location: "Ludhiana, Punjab",
    crop: "Cotton",
    story: "The AI assistant helped me understand which schemes I could apply for. I got Kisan Credit Card approved and used it to buy better seeds. My production doubled this season!",
    benefitAmount: "Rs 3,00,000 credit",
    schemes: ["Kisan Credit Card"],
    verified: true,
    likes: 67,
    hasAudio: true,
    hasVideo: false,
    image: "GS",
  },
]

const recommendedStories = [
  {
    id: 4,
    farmer: "Mahesh Kumar",
    location: "Nagpur, Maharashtra",
    crop: "Wheat",
    benefitAmount: "Rs 12,000",
  },
  {
    id: 5,
    farmer: "Anita Sharma",
    location: "Nashik, Maharashtra",
    crop: "Grapes",
    benefitAmount: "Rs 50,000",
  },
  {
    id: 6,
    farmer: "Balram Yadav",
    location: "Aurangabad, Maharashtra",
    crop: "Soybean",
    benefitAmount: "Rs 18,000",
  },
]

const communityQuestions = [
  {
    id: 1,
    author: "Vijay Kumar",
    question: "How long does PM-Kisan approval take after document submission?",
    replies: [
      {
        author: "Kisan Sathi Support",
        reply: "Typically 2-4 weeks after document verification. You can track status in your dashboard.",
        isOfficial: true,
      },
      {
        author: "Ramesh P.",
        reply: "Mine took about 3 weeks. Make sure all documents are clear and properly uploaded.",
        isOfficial: false,
      },
    ],
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    author: "Meena Devi",
    question: "Can I apply for multiple schemes at once?",
    replies: [
      {
        author: "Kisan Sathi Support",
        reply: "Yes! You can apply for any schemes you are eligible for. Each application is processed independently.",
        isOfficial: true,
      },
    ],
    timestamp: "5 hours ago",
  },
]

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

export default function CommunityPage() {
  const [newQuestion, setNewQuestion] = useState("")
  const [likedStories, setLikedStories] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState("stories")

  const handleLike = (storyId: number) => {
    setLikedStories((prev) =>
      prev.includes(storyId)
        ? prev.filter((id) => id !== storyId)
        : [...prev, storyId]
    )
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto py-10 px-4">
        {/* Page Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2E7D32]/10 rounded-full mb-4">
            <Award className="h-5 w-5 text-[#2E7D32]" />
            <span className="text-sm font-medium text-[#2E7D32]">Community Stories</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[#1F2933]">
            Kisan Community - Success Stories & Peer Guidance
          </h1>
          <p className="mt-3 text-lg text-[#4B5563]">
            Real farmers sharing real results
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="stories" className="w-full" onValueChange={setActiveTab}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <TabsList className="grid w-full grid-cols-2 bg-[#F5F7F6] mb-8 p-1.5 rounded-xl h-14">
                  <TabsTrigger
                    value="stories"
                    className="data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white rounded-lg text-base font-medium transition-all duration-300 data-[state=active]:shadow-md"
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Success Stories
                  </TabsTrigger>
                  <TabsTrigger
                    value="community"
                    className="data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white rounded-lg text-base font-medium transition-all duration-300 data-[state=active]:shadow-md"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Ask the Community
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              {/* Success Stories Tab */}
              <TabsContent value="stories">
                <motion.div
                  className="space-y-6"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <AnimatePresence>
                    {successStories.map((story, index) => (
                      <motion.div
                        key={story.id}
                        variants={fadeInUp}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="bg-white shadow-lg border-[#E5E7EB] hover:shadow-xl transition-all duration-300 overflow-hidden group">
                          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#2E7D32] to-[#66BB6A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <CardContent className="pt-6">
                            {/* Farmer Info */}
                            <div className="flex items-start gap-4 mb-5">
                              <motion.div
                                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white font-bold text-lg shadow-lg"
                                whileHover={{ scale: 1.05, rotate: 3 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                {story.image}
                              </motion.div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold text-[#1F2933] text-lg">{story.farmer}</h3>
                                  {story.verified && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", delay: index * 0.1 }}
                                    >
                                      <Badge variant="secondary" className="bg-[#2E7D32]/10 text-[#2E7D32]">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Verified
                                      </Badge>
                                    </motion.div>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-[#4B5563] mt-1">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {story.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Sprout className="h-3.5 w-3.5" />
                                    {story.crop}
                                  </span>
                                </div>
                              </div>
                              <div className="text-right">
                                <motion.p
                                  className="text-xl font-bold text-[#2E7D32]"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.1 + 0.2 }}
                                >
                                  {story.benefitAmount}
                                </motion.p>
                                <p className="text-xs text-[#4B5563]">Total Benefit</p>
                              </div>
                            </div>

                            {/* Story */}
                            <p className="text-[#4B5563] mb-5 leading-relaxed">{story.story}</p>

                            {/* Schemes */}
                            <div className="flex flex-wrap gap-2 mb-5">
                              {story.schemes.map((scheme, i) => (
                                <motion.div
                                  key={scheme}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <Badge variant="outline" className="border-[#2E5FA7] text-[#2E5FA7] bg-[#2E5FA7]/5">
                                    {scheme}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>

                            {/* Media & Actions */}
                            <div className="flex items-center justify-between pt-5 border-t border-[#E5E7EB]">
                              <div className="flex items-center gap-2">
                                {story.hasAudio && (
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="ghost" size="sm" className="text-[#4B5563] hover:text-[#2E7D32] hover:bg-[#2E7D32]/10 rounded-lg">
                                      <Volume2 className="h-4 w-4 mr-1.5" />
                                      Audio
                                    </Button>
                                  </motion.div>
                                )}
                                {story.hasVideo && (
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="ghost" size="sm" className="text-[#4B5563] hover:text-[#2E7D32] hover:bg-[#2E7D32]/10 rounded-lg">
                                      <Play className="h-4 w-4 mr-1.5" />
                                      Video
                                    </Button>
                                  </motion.div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className={`rounded-lg transition-colors duration-300 ${
                                      likedStories.includes(story.id)
                                        ? "text-[#2E7D32] bg-[#2E7D32]/10"
                                        : "text-[#4B5563] hover:text-[#2E7D32] hover:bg-[#2E7D32]/10"
                                    }`}
                                    onClick={() => handleLike(story.id)}
                                  >
                                    <motion.div
                                      animate={likedStories.includes(story.id) ? { scale: [1, 1.3, 1] } : {}}
                                      transition={{ duration: 0.3 }}
                                    >
                                      <ThumbsUp className="h-4 w-4 mr-1.5" />
                                    </motion.div>
                                    {story.likes + (likedStories.includes(story.id) ? 1 : 0)}
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button variant="ghost" size="sm" className="text-[#4B5563] hover:text-[#2E7D32] hover:bg-[#2E7D32]/10 rounded-lg">
                                    <Share2 className="h-4 w-4 mr-1.5" />
                                    Share
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </TabsContent>

              {/* Community Tab */}
              <TabsContent value="community">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Ask a Question */}
                  <Card className="bg-white shadow-lg border-[#E5E7EB] mb-8">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-[#1F2933] flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-[#2E7D32]" />
                        Ask the Community
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3">
                        <Input
                          placeholder="Ask your question about schemes, eligibility, or applications..."
                          value={newQuestion}
                          onChange={(e) => setNewQuestion(e.target.value)}
                          className="border-[#E5E7EB] focus:border-[#2E7D32] focus:ring-[#2E7D32] rounded-xl h-12"
                        />
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white shrink-0 h-12 px-6 rounded-xl shadow-md">
                            <Send className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Questions List */}
                  <motion.div
                    className="space-y-5"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    {communityQuestions.map((q) => (
                      <motion.div key={q.id} variants={fadeInUp}>
                        <Card className="bg-white shadow-lg border-[#E5E7EB] hover:shadow-xl transition-all duration-300">
                          <CardContent className="pt-6">
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F5F7F6] to-[#E8F5E9] flex items-center justify-center">
                                <User className="h-5 w-5 text-[#4B5563]" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-[#1F2933]">{q.author}</span>
                                  <span className="text-sm text-[#4B5563]">{q.timestamp}</span>
                                </div>
                                <p className="text-[#1F2933] mt-1 text-lg">{q.question}</p>
                              </div>
                            </div>

                            {/* Replies */}
                            <div className="ml-14 space-y-3">
                              {q.replies.map((reply, index) => (
                                <motion.div
                                  key={index}
                                  className={`p-4 rounded-xl ${
                                    reply.isOfficial
                                      ? "bg-gradient-to-r from-[#2E7D32]/5 to-[#66BB6A]/5 border border-[#2E7D32]/20"
                                      : "bg-[#F5F7F6]"
                                  }`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-medium text-[#1F2933] text-sm">{reply.author}</span>
                                    {reply.isOfficial && (
                                      <Badge className="bg-[#2E7D32] text-white text-xs shadow-sm">
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Official
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-[#4B5563] leading-relaxed">{reply.reply}</p>
                                </motion.div>
                              ))}
                            </div>

                            <div className="mt-4 ml-14">
                              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button variant="ghost" size="sm" className="text-[#2E7D32] hover:bg-[#2E7D32]/10 rounded-lg">
                                  <MessageSquare className="h-4 w-4 mr-1.5" />
                                  Reply
                                </Button>
                              </motion.div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Share Tip Button */}
                  <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="outline" className="border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white px-8 py-5 text-base rounded-xl transition-all duration-300">
                            <Award className="h-5 w-5 mr-2" />
                            Share Your Tip
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-xl">Share a Farming Tip</DialogTitle>
                        </DialogHeader>
                        <motion.div
                          className="space-y-4 pt-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Input placeholder="Tip Title" className="border-[#E5E7EB] rounded-xl h-12" />
                          <Textarea placeholder="Describe your tip..." className="border-[#E5E7EB] rounded-xl min-h-[120px]" />
                          <Input placeholder="Related Crop (optional)" className="border-[#E5E7EB] rounded-xl h-12" />
                          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                            <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white py-5 rounded-xl shadow-lg">
                              Submit Tip
                            </Button>
                          </motion.div>
                        </motion.div>
                      </DialogContent>
                    </Dialog>
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white shadow-lg border-[#E5E7EB] sticky top-24 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-[#2E7D32] to-[#66BB6A]" />
              <CardHeader>
                <CardTitle className="text-base text-[#1F2933] flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#F37021]" />
                  Stories Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendedStories.map((story, index) => (
                  <motion.div
                    key={story.id}
                    className="p-4 bg-gradient-to-br from-[#F5F7F6] to-[#E8F5E9] rounded-xl hover:from-[#E8F5E9] hover:to-[#C8E6C9] transition-all duration-300 cursor-pointer group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {story.farmer.charAt(0)}
                      </div>
                      <span className="font-medium text-sm text-[#1F2933] group-hover:text-[#2E7D32] transition-colors">
                        {story.farmer}
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5563] flex items-center gap-1.5 mb-1">
                      <MapPin className="h-3 w-3" />
                      {story.location}
                    </p>
                    <p className="text-xs text-[#4B5563] flex items-center gap-1.5">
                      <Sprout className="h-3 w-3" />
                      {story.crop}
                    </p>
                    <p className="text-base font-semibold text-[#2E7D32] mt-3">{story.benefitAmount}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
