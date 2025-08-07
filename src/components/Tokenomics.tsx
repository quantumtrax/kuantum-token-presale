'use client'

import { motion } from 'framer-motion'

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-32 pb-40 w-full relative">
      
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full px-8">
          <motion.div 
            className="relative mb-20 flex items-center justify-center h-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Cyberpunk scanning lines */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
                animate={{
                  y: [60, -60, 60],
                  opacity: [0, 0.8, 0.2, 0.8, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  delay: 2,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Static title */}
            <h2 className="text-5xl md:text-7xl font-black text-center relative z-20 select-none">
              <span
                className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent inline-block"
                style={{
                  padding: '8px 16px',
                }}
              >
                TOKENOMICS
              </span>
            </h2>

            {/* Data stream effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-green-400/30 text-xs font-mono"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [0, -20, -40],
                    scale: [0.8, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeOut"
                  }}
                >
                  {Math.random().toString(2).substr(2, 8)}
                </motion.div>
              ))}
            </div>

          </motion.div>
          
          <div className="w-full max-w-none flex flex-col items-center justify-center">
            {/* Main content with 3 columns */}
            <div className="flex justify-center items-start gap-8 w-full">
              
              {/* Token Distribution - Left - 15% of total width */}
              <motion.div 
                className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 w-[15vw] flex-shrink-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-8">
                  <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Token Distribution</span>
                </h3>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-orange-500/30">
                      <th className="text-left p-4 text-orange-400 font-bold text-base">
                        <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Distribution</span>
                      </th>
                      <th className="text-right p-4 text-orange-400 font-bold text-base">
                        <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>%</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {[
                      { label: 'Presale', value: '40%' },
                      { label: 'Liquidity', value: '25%' },
                      { label: 'Marketing', value: '15%' },
                      { label: 'Team', value: '10%' },
                      { label: 'Development', value: '10%' },
                    ].map((item, index) => (
                      <motion.tr 
                        key={index}
                        className="border-b border-gray-700/50 hover:bg-orange-500/5 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <td className="p-4 text-gray-300">
                          <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{item.label}</span>
                        </td>
                        <td className="p-4 text-right font-semibold text-white">
                          <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{item.value}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* Tokenomics Table - Center - 40% of total width */}
              <motion.div 
                className="bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-xl border border-orange-500/20 rounded-3xl overflow-hidden shadow-2xl w-[40vw] flex-shrink-0"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02, boxShadow: '0 25px 50px rgba(249, 115, 22, 0.15)' }}
              >
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-orange-500/30">
                    <th className="text-left p-6 text-orange-400 font-bold text-lg">
                      <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Token Details</span>
                    </th>
                    <th className="text-right p-6 text-orange-400 font-bold text-lg">
                      <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Value</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white">
                  {[
                    { label: 'Symbol', value: 'KTK' },
                    { label: 'Name', value: 'KUANTUM' },
                    { label: 'Total Supply', value: '1,000,000,000' },
                    { label: 'Decimal', value: '18' },
                    { label: 'Blockchain', value: 'BSC' },
                    { label: 'Presale Price', value: '0.001 BNB' },
                    { label: 'Listing Price', value: '0.002 BNB' },
                    { label: 'Liquidity Lock', value: '2 Years' },
                  ].map((item, index) => (
                    <motion.tr 
                      key={index}
                      className="border-b border-gray-700/50 hover:bg-orange-500/5 transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <td className="p-6 text-gray-300">
                        <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{item.label}</span>
                      </td>
                      <td className="p-6 text-right font-semibold text-white">
                        <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{item.value}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
              </motion.div>

              {/* Key Features - Right - 15% of total width */}
              <motion.div 
                className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-8 w-[15vw] flex-shrink-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-8">
                  <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Key Features</span>
                </h3>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-b border-orange-500/30">
                      <th className="text-left p-4 text-orange-400 font-bold text-base">
                        <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Features</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {[
                      'Auto-liquidity generation',
                      'Deflationary mechanism',
                      'Holder rewards',
                      'Anti-whale protection',
                    ].map((feature, index) => (
                      <motion.tr 
                        key={index}
                        className="border-b border-gray-700/50 hover:bg-orange-500/5 transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <td className="p-4 text-gray-300">
                          <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{feature}</span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 30px empty space */}
      <div className="h-8"></div>
    </section>
  )
}