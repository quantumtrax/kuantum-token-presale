'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-lg shadow-2xl border-b border-orange-500/20' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => scrollToSection('hero')}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">⚡</span>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur opacity-30 animate-pulse"></div>
          </div>
          <div className="flex items-center">
            <span className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              &nbsp;KUANTUM
            </span>
          </div>
        </motion.div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: 'hero', label: 'Home' },
            { href: 'presale', label: 'Features' },
            { href: 'tokenomics', label: 'Tokenomics' },
            { href: 'roadmap', label: 'Roadmap' },
            { href: 'team', label: 'Team' },
            { href: 'whitepaper', label: 'Whitepaper' },
          ].map((item, index) => (
            <motion.button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white/80 hover:text-orange-500 font-medium transition-all duration-300 relative group px-8 py-4 border border-transparent hover:border-orange-500/30 rounded-lg"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 group-hover:w-full"></span>
              <div className="absolute inset-0 bg-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.button>
          ))}
        </div>

        {/* Connect Wallet Button */}
        <div className="flex items-center">
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
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
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <motion.button
                          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(249, 115, 22, 0.4)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={openConnectModal}
                          className="relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg overflow-hidden group"
                        >
                          <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>Connect Wallet</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        </motion.button>
                      )
                    }

                    if (chain.unsupported) {
                      return (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={openChainModal}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors"
                        >
                          Wrong network
                        </motion.button>
                      )
                    }

                    return (
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={openChainModal}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 20,
                                height: 20,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <Image
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  width={20}
                                  height={20}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={openAccountModal}
                          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                        >
                          <span className="relative z-10 inline-block" style={{padding: '8px 16px'}}>
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </span>
                        </motion.button>
                      </div>
                    )
                  })()}
                </div>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </nav>
    </motion.header>
  )
}