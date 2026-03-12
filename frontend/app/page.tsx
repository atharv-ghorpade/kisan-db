"use client"

import Link from "next/link"
import Image from "next/image"
import { UserPlus, Search, FileCheck, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageLayout } from "@/components/kisan-sathi/page-layout"
import { SchemeCard } from "@/components/kisan-sathi/scheme-card"
import { getPopularSchemes } from "@/lib/schemes-data"
import { motion } from "framer-motion"

import { useState, useEffect } from "react"

const howItWorks = [
  {
    icon: UserPlus,
    title: "Create Profile",
    description: "Enter basic farmer details.",
  },
  {
    icon: Search,
    title: "Smart Matching",
    description: "The platform finds schemes suitable for your farm.",
  },
  {
    icon: FileCheck,
    title: "Apply Easily",
    description: "Apply to schemes with a simple process.",
  },
]

const benefits = [
  "Personalized scheme recommendations",
  "Simple eligibility explanation",
  "Deadline alerts for schemes",
  "Secure document verification",
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
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export default function LandingPage() {
  const [popularSchemes, setPopularSchemes] = useState<any[]>([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/schemes")
      .then(res => res.json())
      .then(data => setPopularSchemes(data.slice(0, 3)))
      .catch(err => console.error(err))
  }, [])

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#F5F7F6] via-[#E8F5E9] to-[#C8E6C9] py-12 lg:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#2E7D32]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#66BB6A]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <motion.div
              className="flex-1 text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1F2933] leading-tight text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Find the Right <span className="text-[#2E7D32]">Government Schemes</span> for Your Farm
              </motion.h1>
              <motion.p
                className="mt-6 text-lg lg:text-xl text-[#4B5563] max-w-xl mx-auto lg:mx-0 text-pretty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Discover government benefits tailored to your land, crops and location.
              </motion.p>
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link href="/auth">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-lg px-10 py-7 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    >
                      Check Eligibility
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="flex-1 w-full max-w-md lg:max-w-lg"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-white p-3 ring-1 ring-[#E5E7EB]"
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/images/hero-farmer.png"
                  alt="PM Kisan Samman Nidhi scheme - farmers with Prime Minister"
                  width={600}
                  height={340}
                  className="object-contain w-full h-auto rounded-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyRTdEMzIiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="max-w-7xl mx-auto px-4 relative">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2933] text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {howItWorks.map((step, index) => (
              <motion.div key={step.title} variants={fadeInUp}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(46, 125, 50, 0.15)" }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-white border border-[#E5E7EB] shadow-lg hover:border-[#2E7D32]/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#F37021] text-white flex items-center justify-center font-bold text-lg shadow-lg z-10">
                      {index + 1}
                    </div>
                    <CardContent className="pt-12 pb-8 px-6 text-center">
                      <motion.div
                        className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2E7D32]/10 to-[#66BB6A]/10 mb-6 group-hover:from-[#2E7D32]/20 group-hover:to-[#66BB6A]/20 transition-all duration-300"
                        whileHover={{ rotate: 5, scale: 1.05 }}
                      >
                        <step.icon className="h-10 w-10 text-[#2E7D32]" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-[#1F2933] mb-3">{step.title}</h3>
                      <p className="text-[#4B5563] leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Popular Government Schemes Section */}
      <section className="py-20 bg-gradient-to-b from-[#F5F7F6] to-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2933] text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Popular Government Schemes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularSchemes.map((scheme, index) => (
              <SchemeCard key={scheme.id} scheme={scheme} index={index} />
            ))}
          </div>
          <motion.div
            className="mt-14 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/schemes">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white px-8 py-6 text-lg rounded-xl transition-all duration-300"
                >
                  View All Schemes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Use Kisan Sathi Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1F2933] text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Use Kisan Sathi
          </motion.h2>
          <motion.div
            className="max-w-2xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <div className="grid gap-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, x: 8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-5 p-5 bg-gradient-to-r from-[#F5F7F6] to-[#E8F5E9] rounded-2xl border border-[#E5E7EB] hover:border-[#2E7D32]/30 hover:shadow-lg transition-all duration-300 cursor-default">
                    <motion.div
                      className="shrink-0 w-12 h-12 rounded-xl bg-[#2E7D32] flex items-center justify-center shadow-lg"
                      whileHover={{ rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle className="h-6 w-6 text-white" />
                    </motion.div>
                    <span className="text-lg text-[#1F2933] font-medium">{benefit}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E7D32] via-[#3E8E41] to-[#66BB6A]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiLz48L2c+PC9nPjwvc3ZnPg==')]" />
        
        <motion.div
          className="max-w-4xl mx-auto px-4 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 text-balance">
            {"Don't miss government benefits for your farm."}
          </h2>
          <p className="text-white/90 text-lg lg:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of farmers who have discovered schemes they were eligible for.
          </p>
          <Link href="/auth">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                className="bg-white text-[#2E7D32] hover:bg-white/95 text-lg px-10 py-7 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 font-semibold"
              >
                Start Finding Schemes
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.span>
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </section>
    </PageLayout>
  )
}
