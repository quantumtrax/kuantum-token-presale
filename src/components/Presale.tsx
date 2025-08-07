'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap, Shield } from 'lucide-react'

export default function Presale() {

  return (
    <section id="presale" className="pb-20 px-6 relative overflow-hidden" style={{paddingTop: '20px'}}>
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>

      <div className="container mx-auto relative z-10">
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