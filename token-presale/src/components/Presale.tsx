'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap, Shield } from 'lucide-react'
import { usePresale } from '@/hooks/usePresale'

export default function Presale() {
  const { presaleData } = usePresale()

  return (
    <section id="presale" className="pb-20 px-6 relative overflow-hidden" style={{paddingTop: '20px'}}>
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

      <div className="container mx-auto relative z-10">
        {/* Presale Progress Section */}
        {presaleData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Kuantum Token Presale
                </h2>
                <p className="text-gray-300">
                  Join the presale now and be part of the quantum revolution
                </p>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-orange-500 font-semibold">Progress</span>
                  <span className="text-white font-bold text-xl">{presaleData.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${presaleData.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                  />
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {parseFloat(presaleData.totalRaised).toFixed(2)} ETH
                  </h3>
                  <p className="text-gray-400">Raised</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {parseFloat(presaleData.maxGoal).toFixed(2)} ETH
                  </h3>
                  <p className="text-gray-400">Goal</p>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-orange-500 mb-2">
                    {parseFloat(presaleData.tokenPrice).toFixed(4)} ETH
                  </h3>
                  <p className="text-gray-400">Price per Token</p>
                </div>
              </div>
              
              {/* Status */}
              <div className="text-center mt-6">
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  presaleData.presaleActive 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {presaleData.presaleActive ? 'Presale Active' : 'Presale Ended'}
                </span>
              </div>
            </div>
          </motion.div>
        )}
        {/* Features Grid */}
        <div className="flex justify-center" style={{marginBottom: '20px'}}>
          <div className="flex gap-6">
            {[
              { icon: TrendingUp, title: 'Price Appreciation', desc: 'Expected 5x growth after presale', color: 'from-green-500 to-emerald-500' },
              { icon: Users, title: 'Growing Community', desc: '15,000+ investors already joined', color: 'from-blue-500 to-cyan-500' },
              { icon: Shield, title: 'Secure & Audited', desc: 'Smart contracts fully audited', color: 'from-purple-500 to-pink-500' },
              { icon: Zap, title: 'Instant Delivery', desc: 'Tokens sent immediately after purchase', color: 'from-yellow-500 to-orange-500' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="relative bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 hover:border-orange-500/30 rounded-xl transition-all duration-300 group cursor-pointer flex-1 overflow-hidden"
              >
                {/* Background Icon */}
                <div className={`absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300`}>
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
                    <feature.icon size={32} className="text-white" />
                  </div>
                </div>
                
                <div className="relative z-10 p-6">
                  <h5 className="text-white font-bold mb-1 group-hover:text-orange-500 transition-colors duration-300">
                    <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{feature.title}</span>
                  </h5>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                    <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{feature.desc}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}