'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Presale from '@/components/Presale'
import Features from '@/components/Features'
import Tokenomics from '@/components/Tokenomics'
import Roadmap from '@/components/Roadmap'
import Team from '@/components/Team'
import Footer from '@/components/Footer'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-x-hidden">
      {/* Hero Section Background - Only for Hero/Presale */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"></div>
      <div className="fixed inset-0 bg-[url('/stars.svg')] opacity-5"></div>
      
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <Presale />
        
        {/* Container for Features → Footer with Parallax Background */}
        <div className="relative">
          {/* Unified Parallax Background for Features → Footer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Deep space gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-slate-900/30"
              style={{ y: -100 }}
              animate={{ y: [0, -50, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Nebula clouds */}
            <motion.div
              className="absolute top-1/4 left-0 w-full h-96 bg-gradient-to-r from-purple-600/5 via-blue-500/10 to-orange-500/5 blur-3xl"
              style={{ y: -200 }}
              animate={{ y: [0, -100, 0], x: [-50, 50, -50] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.div
              className="absolute top-1/2 right-0 w-full h-96 bg-gradient-to-l from-orange-600/8 via-pink-500/6 to-purple-500/4 blur-3xl"
              style={{ y: -300 }}
              animate={{ y: [0, -150, 0], x: [50, -50, 50] }}
              transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Floating particles layer - 5x bigger */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-5 h-5 bg-orange-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${30 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
              />
            ))}
            
            {/* Subtle grid pattern */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(249, 115, 22, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(249, 115, 22, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '100px 100px'
              }}
            />
          </div>
          
          {/* Sections with parallax background */}
          <Features />
          <Tokenomics />
          <Roadmap />
          <Team />
          <Footer />
        </div>
      </main>
    </div>
  )
}