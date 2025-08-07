'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

// Background Typewriter Effect Component
function BackgroundTypewriter({ text, children, delay = 1, startDelay = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          // Add 4 characters at once for 4x speed (2x faster than previous 2x)
          setCurrentIndex(prev => prev + 4)
        }, delay)
        return () => clearTimeout(timeout)
      } else if (currentIndex >= text.length && !isComplete) {
        setIsComplete(true)
      }
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [currentIndex, text, delay, startDelay, isVisible, isComplete])

  // Calculate background width based on current progress
  const progress = Math.min(currentIndex / text.length, 1)

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsVisible(true)}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background that reveals as typing progresses */}
      <motion.div
        className="absolute inset-0 bg-orange-500/10 rounded-lg blur-sm"
        style={{
          width: `${progress * 100}%`,
          transition: 'width 0.05s ease-out'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default function Features() {
  const features = [
    {
      title: 'DECENTRALISED SYSTEM',
      description: 'A technical failure can paralyze all affiliate networks on a centralized platform, until the cause is detected and rectified the system.',
      icon: '⬢'
    },
    {
      title: 'BANKS PAYMENT SYSTEMS',
      description: 'Up to 45% of a merchant\'s budget is spent on commissions charged by a number of brokers, including banks, payment systems.',
      icon: '⬢'
    },
    {
      title: 'CPA NETWORKS',
      description: 'Affiliate networks have to pay for using existing platforms on a monthly basis or spend money on developing proprietary platforms',
      icon: '⬢'
    }
  ]

  return (
    <section className="py-20 w-full">
      <div className="w-full">
        <div className="flex justify-center items-center">
          <div className="grid md:grid-cols-3 gap-16 max-w-7xl px-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="text-center group max-w-sm mx-auto"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <motion.h3 
                  className="text-white font-bold text-xl mb-6 group-hover:text-orange-500 transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                >
                  <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{feature.title}</span>
                </motion.h3>
                
                <motion.p 
                  className="text-gray-400 text-base leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                >
                  <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{feature.description}</span>
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Vision and Mission Section */}
        <div className="w-full mt-32">
          <div className="w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="grid lg:grid-cols-3 gap-16 items-center w-full px-8" style={{ width: '85%', margin: '0 auto' }}>
              {/* Left Side - Content */}
              <motion.div 
                className="lg:col-span-2 space-y-12 bg-gray-900/20 backdrop-blur-md border border-gray-700/30 rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ 
                  minWidth: '600px',
                  maxWidth: '100%',
                  width: 'auto'
                }}
              >
                <motion.h2 
                  className="text-4xl lg:text-5xl font-bold text-white mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Vision and Mission</span>
                </motion.h2>
                
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Vision</span>
                    </h3>
                    <BackgroundTypewriter 
                      text="To be at the forefront of a new era of technology and innovations which serves the next generation of human life to live with more freedom and less fear."
                      delay={0}
                      startDelay={100}
                    >
                      <p className="text-gray-400 text-lg leading-relaxed">
                        <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                          To be at the forefront of a new era of technology and innovations which serves the next generation of human life to live with more freedom and less fear.
                        </span>
                      </p>
                    </BackgroundTypewriter>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Mission</span>
                    </h3>
                    <BackgroundTypewriter 
                      text="It is to give users the best products and services by exploring all possible frontiers in new technology and innovations and being socially responsible to our planet and our planet and our societies."
                      delay={0}
                      startDelay={100}
                    >
                      <p className="text-gray-400 text-lg leading-relaxed">
                        <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                          It is to give users the best products and services by exploring all possible frontiers in new technology and innovations and being socially responsible to our planet and our societies.
                        </span>
                      </p>
                    </BackgroundTypewriter>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Solution</span>
                    </h3>
                    <BackgroundTypewriter 
                      text="We have planned an ecosystem of new solutions that will help users save their assets and trade them for different services in the coming years. Also, we will keep researching how we can reinvent the wheel so that blockchain can be used in most areas of day-to-day life and how it can be used for the betterment of humankind and technology users."
                      delay={0}
                      startDelay={100}
                    >
                      <p className="text-gray-400 text-lg leading-relaxed">
                        <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                          We have planned an ecosystem of new solutions that will help users save their assets and trade them for different services in the coming years. Also, we will keep researching how we can reinvent the wheel so that blockchain can be used in most areas of day-to-day life and how it can be used for the betterment of humankind and technology users.
                        </span>
                      </p>
                    </BackgroundTypewriter>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Right Side - Phone Illustration */}
              <motion.div 
                className="lg:col-span-1 flex justify-center items-center relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Phone Container */}
                <div className="relative w-80 h-96">
                  {/* Phone Frame */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Screen */}
                    <div className="m-4 h-5/6 bg-gradient-to-b from-slate-100 to-slate-200 rounded-2xl relative overflow-hidden">
                      {/* Status Bar */}
                      <div className="h-6 bg-black rounded-t-2xl flex items-center justify-center">
                        <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
                      </div>
                      
                      {/* Screen Content */}
                      <div className="p-6 h-full bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                        <div className="mt-4 space-y-2">
                          <div className="w-24 h-2 bg-gray-300 rounded"></div>
                          <div className="w-20 h-2 bg-gray-300 rounded"></div>
                          <div className="w-28 h-2 bg-gray-300 rounded"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Home Indicator */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full"></div>
                  </motion.div>
                  
                  {/* Orbiting Elements */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full shadow-lg"
                    animate={{ 
                      rotate: [0, 360],
                      x: [0, 20, 0, -20, 0],
                      y: [0, -10, 0, 10, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"
                    animate={{ 
                      rotate: [360, 0],
                      x: [0, -15, 0, 15, 0],
                      y: [0, 15, 0, -15, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.div
                    className="absolute top-1/2 -right-8 w-4 h-4 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-lg"
                    animate={{ 
                      rotate: [0, 360],
                      x: [0, 25, 0, -25, 0],
                      y: [0, 20, 0, -20, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.div
                    className="absolute top-1/4 -left-6 w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg"
                    animate={{ 
                      rotate: [360, 0],
                      x: [0, -20, 0, 20, 0],
                      y: [0, -25, 0, 25, 0]
                    }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Orbital Rings */}
                  <motion.div
                    className="absolute inset-0 border-2 border-orange-400/20 rounded-full"
                    style={{ 
                      width: '120%', 
                      height: '120%', 
                      left: '-10%', 
                      top: '-10%' 
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <motion.div
                    className="absolute inset-0 border border-blue-400/15 rounded-full"
                    style={{ 
                      width: '140%', 
                      height: '140%', 
                      left: '-20%', 
                      top: '-20%' 
                    }}
                    animate={{ rotate: [360, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}