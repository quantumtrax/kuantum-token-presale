'use client'

import { motion } from 'framer-motion'

export default function Team() {
  const teamMembers = [
    {
      name: "Elver Brick",
      role: "Chief Executive Officer",
      image: "👤",
      color: "from-orange-400 to-orange-600"
    },
    {
      name: "Rane Deon",
      role: "Blockchain Developer", 
      image: "👤",
      color: "from-pink-400 to-purple-500"
    },
    {
      name: "Mark Cluster",
      role: "Market Researcher",
      image: "👤",
      color: "from-green-400 to-teal-500"
    }
  ]

  return (
    <>
      {/* 30px space before team section */}
      <div style={{ height: '30px' }}></div>
      
      <section id="team" className="py-20 w-full">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center w-full px-8">
          {/* Team Title */}
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Team</span>
          </motion.h2>
          
          {/* Team Members Grid - 100% width with equal spacing */}
          <div className="w-full" style={{ width: '100%', margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16" style={{ 
              paddingLeft: '10%', 
              paddingRight: '10%',
              justifyItems: 'center'
            }}>
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Circular Profile Image */}
                  <div className="w-48 h-48 mx-auto mb-8 relative">
                    <motion.div 
                      className="w-full h-full rounded-full flex items-center justify-center text-6xl shadow-2xl border-4 border-gray-700/30"
                      style={{
                        background: 'linear-gradient(to bottom right, #fb923c, #ea580c)'
                      }}
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {member.image}
                    </motion.div>
                    
                    {/* Decorative ring */}
                    <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-orange-500/20 group-hover:border-orange-500/50 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                  
                  {/* Name */}
                  <motion.h3 
                    className="text-xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
                  >
                    <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                      {member.name}
                    </span>
                  </motion.h3>
                  
                  {/* Role */}
                  <motion.p 
                    className="text-gray-400 font-medium text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
                  >
                    <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                      {member.role}
                    </span>
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Whitepaper Section */}
          <motion.div 
            id="whitepaper" 
            className="mt-20 w-full max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-gray-900/20 backdrop-blur-md border border-gray-700/30 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Whitepaper</span>
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed text-center">
                <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                  Download our comprehensive whitepaper to learn more about KUANTUM&rsquo;s technology, 
                  tokenomics, roadmap, and vision for the future of decentralized finance.
                </span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={{padding: '4px 8px'}}>Read Online</span>
                </motion.button>
                <motion.button 
                  className="border border-gray-600 hover:border-orange-500 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={{padding: '4px 8px'}}>Download PDF</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    
    {/* 30px space after team section */}
    <div style={{ height: '30px' }}></div>
    </>
  )
}