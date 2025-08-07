'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Sparkles, Wallet, Clock, Copy } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useNotification } from '@/contexts/NotificationContext'
import { usePresale } from '@/hooks/usePresale'
import { calculateTokens } from '@/utils/contract'

export default function Hero() {
  const [amount, setAmount] = useState('')
  const { showNotification } = useNotification()
  const { presaleData, userData, buyTokens } = usePresale()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const progress = presaleData ? presaleData.progress : 65
  const contractAddress = "0x9a6d7ae4e22194118bd77983d5cfc1098db19741"

  const handleBuyTokens = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      showNotification({
        type: 'error',
        title: 'Invalid Amount',
        message: 'Please enter a valid ETH amount.',
        duration: 4000
      })
      return
    }

    const success = await buyTokens(amount)
    if (success) {
      setAmount('') // Clear input on success
    }
  }

  const handleVisaPayment = () => {
    showNotification({
      type: 'warning',
      title: 'VISA Payment',
      message: 'VISA payment integration is coming soon! Stay tuned for updates.',
      duration: 5000
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showNotification({
        type: 'success',
        title: 'Copied!',
        message: 'Contract address copied to clipboard successfully.',
        duration: 3000
      })
    }).catch(() => {
      showNotification({
        type: 'error',
        title: 'Copy Failed',
        message: 'Failed to copy contract address. Please try again.',
        duration: 4000
      })
    })
  }


  useEffect(() => {
    // Check if there's an existing end date in localStorage
    let endDate
    const storedEndDate = localStorage.getItem('presaleEndDate')
    
    if (storedEndDate) {
      endDate = new Date(storedEndDate)
    } else {
      // Set end date to 7 days from now
      endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      localStorage.setItem('presaleEndDate', endDate.toISOString())
    }
    
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    // Initial calculation
    const now = new Date().getTime()
    const distance = endDate.getTime() - now
    
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
    }

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="hero" className="min-h-screen pt-20 pb-10 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-40"
          style={{
            objectPosition: 'right center',
          }}
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {/* Moderate fade overlay - 40% levels */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10"></div>
        {/* Additional opacity overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Color theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-purple-900/20 to-orange-900/10"></div>
      </div>
      
      {/* Animated gradient background (as fallback) */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-orange-900/20 animate-gradient-x z-1"></div>
      
      {/* Floating orbs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl z-5"
      />
      
      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-xl z-5"
      />


      <div className="container mx-auto px-6 relative z-20" style={{paddingTop: '110px'}}>
        {/* Top Center Section */}
        <div className="text-center" style={{marginBottom: '30px'}}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full px-6 py-3 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 mr-2 text-orange-400" />
            <span className="text-orange-300 font-semibold relative z-10 inline-block" style={{padding: '8px 16px'}}>🔥 Presale Now Live - Limited Time Offer</span>
            <div className="ml-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold mb-8 relative"
          >
            <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              KUANTUM
            </span>
            <div className="text-white mt-2 text-4xl md:text-6xl">PRESALE LAUNCH</div>
            
            {/* Glowing effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 blur-2xl opacity-30 animate-pulse"></div>
          </motion.h1>
        </div>

        <div className="flex items-center" style={{paddingLeft: '7.5%', paddingRight: '7.5%', gap: '10%'}}>
          {/* Left Side - Presale Card */}
          <div className="order-2 lg:order-1" style={{width: '40%'}}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-xl border border-orange-500/30 rounded-3xl" style={{padding: '25px', width: '100%'}}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-lg">
                      <div className="absolute w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <h3 className="text-3xl font-bold text-white">Buy KTK Tokens</h3>
                  </div>
                </div>
                <br />
                
                {/* Progress Section */}
                <div>
                  <div className="flex justify-between text-white mb-3">
                    <span className="font-semibold">Presale Progress</span>
                    <span className="text-orange-500 font-bold">{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-4 mb-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="bg-gradient-to-r from-orange-500 to-red-500 h-4 rounded-full shadow-lg relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    </motion.div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{presaleData ? `${parseFloat(presaleData.totalRaised).toFixed(3)} ETH Raised` : 'Loading...'}</span>
                    <span>Goal: {presaleData ? `${parseFloat(presaleData.maxGoal)} ETH` : '5 ETH'}</span>
                  </div>
                </div>
                <br />

                {/* Input Section */}
                <div>
                  <label className="block text-white font-semibold mb-3">Purchase Amount (BNB)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.01"
                      min="0.001"
                      step="0.001"
                      className="w-full bg-gray-800/50 border-2 border-gray-700 hover:border-orange-500/50 focus:border-orange-500 rounded-xl text-white placeholder-gray-400 font-medium text-lg transition-all duration-300"
                      style={{padding: '8px 16px'}}
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500 font-bold" style={{right: '40px'}}>
                      ETH
                    </div>
                  </div>
                  {amount && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg"
                    >
                      <p className="text-orange-300 font-semibold">
                        You&rsquo;ll receive: {presaleData ? calculateTokens(amount, presaleData.tokenPrice) : (parseFloat(amount) * 1000).toLocaleString()} KTK tokens
                      </p>
                    </motion.div>
                  )}
                </div>
                <br />

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-3">
                  {['0.01', '0.05', '0.1', '0.5'].map((value) => (
                    <motion.button
                      key={value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAmount(value)}
                      className="bg-gray-800/50 hover:bg-orange-500/20 border border-gray-700 hover:border-orange-500/50 text-white rounded-xl font-semibold transition-all duration-300"
                      style={{padding: '8px 16px'}}
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
                <br />

                {/* Buy Button Row */}
                <div className="flex gap-3">
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openConnectModal,
                      authenticationStatus,
                      mounted,
                    }) => {
                      const ready = mounted && authenticationStatus !== 'loading'
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                          authenticationStatus === 'authenticated')

                      return (
                        <div
                          className="flex-1"
                          style={{flexBasis: '70%'}}
                          {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                              opacity: 0,
                              pointerEvents: 'none',
                              userSelect: 'none',
                            },
                          })}
                        >
                          <motion.button
                            whileHover={{ 
                              scale: 1.02,
                              boxShadow: '0 10px 30px rgba(249, 115, 22, 0.4)'
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={connected ? handleBuyTokens : openConnectModal}
                            className="w-full relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group"
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              <Wallet className="w-5 h-5 mr-2" />
                              <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                                {connected ? 'Buy KTK Tokens' : 'Connect Wallet'}
                              </span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                          </motion.button>
                        </div>
                      )
                    }}
                  </ConnectButton.Custom>

                  {/* VISA Button */}
                  <motion.button
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: '0 10px 30px rgba(30, 58, 138, 0.4)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleVisaPayment}
                    className="relative bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 overflow-hidden group"
                    style={{flexBasis: '30%'}}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                        VISA
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </motion.button>
                </div>
                <br />
                <br />

                {/* Token Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Current Price:</span>
                    <span className="text-white font-semibold">{presaleData ? `${presaleData.tokenPrice} ETH` : '0.001 ETH'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Your Tokens:</span>
                    <span className="text-orange-500 font-semibold">{userData ? `${parseFloat(userData.tokenBalance).toLocaleString()} KTK` : '0 KTK'}</span>
                  </div>
                  <br></br>
                  <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="block flex gap-4 items-center justify-center overflow-hidden"
            >
              {[
                { value: '245M ' , label: 'Tokens Sold', suffix: 'KTK' },
                { value: '2,458 ', label: 'Total Raised', suffix: 'BNB' },
                { value: '15.4K ', label: 'Investors', suffix: 'REAL' },
                { value: '0.001 ', label: 'Current', suffix: 'BNB' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.0, y: -5 }}
                  className="bg-gradient-to-br from-black/40 to-gray-900/40 backdrop-blur-sm border border-orange-500/20 rounded-xl hover:border-orange-500/40 transition-all duration-300 flex-1"
                >
                  <div className="text-2xl font-bold text-white mb-2">
                    <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                      {stat.value}
                      <span className="text-orange-500 text-sm ml-1">{stat.suffix}</span>
                    </span>
                  </div>
                  <div className="text-gray-400 text-xs">
                    <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Main Content */}
          <div className="order-1 lg:order-2 text-center lg:text-left" style={{width: '50%'}}>
            <div style={{width: '100%'}}>
            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center lg:justify-start mb-8"
            >
              <div className="relative group" style={{width: '70%'}}>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-6">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center justify-center lg:justify-start">
                    <Clock className="mr-3 text-blue-400" size={24} />
                    <span className="relative z-10 inline-block" style={{padding: '20px 16px'}}>Presale Ends In</span>
                  </h4>
                  <div className="grid grid-cols-4 gap-3 " style={{padding: 10}}>
                    {[
                      { label: 'Days', value: timeLeft.days },
                      { label: 'Hours', value: timeLeft.hours },
                      { label: 'Minutes', value: timeLeft.minutes },
                      { label: 'Seconds', value: timeLeft.seconds },
                    ].map((time, index) => (
                      <div key={index} className="text-center">
                        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mb-2 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                          <span className="relative z-10 text-2xl font-bold text-white inline-block" style={{padding: '10px 10px'}}>
                            {time.value.toString().padStart(2, '0')}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs font-semibold relative z-10 inline-block" style={{padding: '10px 10px'}}>{time.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed"
            >
              <br />Experience Next-Gen Investment Opportunities with <span className="text-orange-500 font-semibold">KUANTUM</span>, 
              a revolutionary cryptocurrency built on decentralized technology. Join thousands of investors 
              in shaping the future of digital finance.
            </motion.p>
            <br />

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center"
            >
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group border-2 border-orange-500/30 hover:border-orange-500 bg-black/20 hover:bg-orange-500/10 text-white rounded-2xl font-bold text-lg transition-all duration-300 backdrop-blur-sm flex items-center"
              >
                <Play className="mr-2 w-5 h-5"/>
                <span className="relative z-10 inline-block" style={{padding: '8px 20px'}}>Watch Demo</span>
              </motion.button>
            </motion.div>
            <br />

            {/* Stats */}
           
            </div>
          </div>
        </div>

        {/* Presale Contract Address Section */}
        <br />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative group max-w-4xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-600/30 rounded-3xl p-8 text-center">
              <h3 className="text-white text-xl md:text-2xl font-semibold mb-6">
                <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}><br />You can buy KTK also by BNB directly from Presale Contract Address</span>
              </h3>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="bg-white/10 border border-gray-500/30 rounded-xl px-6 py-3 font-mono text-white text-sm md:text-base break-all">
                  <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{contractAddress}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(contractAddress)}
                  className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Copy</span>
                </motion.button>
              </div>
              <br />
            </div>
          </div>
        </motion.div>
        <br />
      </div>
    </section>
  )
}