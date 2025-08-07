'use client'

import { motion } from 'framer-motion'

export default function Roadmap() {
  const roadmapItems = [
    {
      phase: "PHASE 1 - DEVELOPMENT",
      items: [
        "Website design and content",
        "Smart Contract development & Audit",
        "Whitepaper development",
        "Community Building"
      ]
    },
    {
      phase: "JULY - SEPTEMBER 2024",
      items: [
        "Launch of KUANTUM Presale on website",
        "Partnership building",
        "Community building, Social media campaigns",
        "Influencer marketing"
      ]
    },
    {
      phase: "OCTOBER - NOVEMBER 2024",
      items: [
        "Launch of KUANTUM Exchange and Staking",
        "Partnership building with other projects",
        "Exchange Listing",
        "Continue marketing"
      ]
    },
    {
      phase: "NOVEMBER 2024",
      items: [
        "Launch of KUANTUM Exchange and staking",
        "Community Building & partnerships partnerships",
        "Continued marketing efforts",
        "Product development"
      ]
    }
  ]

  return (
    <section id="roadmap" className="pt-40 pb-32 w-full relative">
      {/* Tree-specific effects only */}
      <motion.div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <div className="absolute left-1/2 top-0 w-2 h-full bg-gradient-to-b from-transparent via-orange-600/40 to-orange-800/60 blur-sm transform -translate-x-1/2"></div>
      </motion.div>
      
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full px-8">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Roadmap</span>
          </motion.h2>
        
        <div className="relative">
          {/* Timeline Line - Main Tree Trunk */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 via-orange-400 to-orange-600 transform md:-translate-x-px shadow-lg shadow-orange-500/20"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          ></motion.div>
          
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={index} className="relative grid md:grid-cols-12 gap-4">
                {/* Tree Branch - Left */}
                {index % 2 === 0 && (
                  <motion.div 
                    className="absolute left-4 md:left-1/2 top-8 w-8 md:w-32 h-0.5 bg-gradient-to-l from-orange-500/60 to-orange-400/40 md:-translate-x-32"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    style={{ transformOrigin: "right" }}
                  ></motion.div>
                )}
                
                {/* Tree Branch - Right */}
                {index % 2 === 1 && (
                  <motion.div 
                    className="absolute left-4 md:left-1/2 top-8 w-8 md:w-32 h-0.5 bg-gradient-to-r from-orange-500/60 to-orange-400/40"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    style={{ transformOrigin: "left" }}
                  ></motion.div>
                )}
                
                {/* Left Content (Even items) */}
                {index % 2 === 0 && (
                  <motion.div 
                    className="md:col-span-5 md:col-start-2"
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                      <h3 className="text-orange-500 font-bold text-lg mb-4">
                        <span className="relative z-10 inline-block" style={{ padding: '10px 10px'}}>{item.phase}</span>
                      </h3>
                      <ul className="space-y-2">
                        {item.items.map((feature, idx) => (
                          <li key={idx} className="">
                            <span className="text-gray-300 text-sm">
                              <span className="relative z-10 inline-block" style={{padding: '10px 10px'}}>{feature}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
                
                {/* Timeline Dot - Tree Node */}
                <motion.div 
                  className="absolute left-0 md:left-1/2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-4 border-black transform md:-translate-x-4 flex items-center justify-center z-20 shadow-lg shadow-orange-500/30"
                  initial={{ scale: 0, rotate: 180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.2 + 0.1,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                </motion.div>
                
                {/* Right Content (Odd items) */}
                {index % 2 === 1 && (
                  <motion.div 
                    className="md:col-span-5 md:col-start-7"
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 hover:border-orange-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                      <h3 className="text-orange-500 font-bold text-lg mb-4">
                        <span className="relative z-10 inline-block" style={{ padding: '10px 10px'}}>{item.phase}</span>
                      </h3>
                      <ul className="space-y-2">
                        {item.items.map((feature, idx) => (
                          <li key={idx} className="">
                            <span className="text-gray-300 text-sm">
                              <span className="relative z-10 inline-block" style={{padding: '10px 10px'}}>{feature}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
                
                {/* Mobile Content */}
                <div className="md:hidden ml-12">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 hover:border-orange-500/50 transition-colors">
                    <h3 className="text-orange-500 font-bold text-lg mb-4">
                      <span className="relative z-10 inline-block" style={{ padding: '10px 10px'}}>{item.phase}</span>
                    </h3>
                    <ul className="space-y-2">
                      {item.items.map((feature, idx) => (
                        <li key={idx} className="">
                          <span className="text-gray-300 text-sm">
                            <span className="relative z-10 inline-block" style={{padding: '10px 10px'}}>{feature}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}