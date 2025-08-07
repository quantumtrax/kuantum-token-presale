'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WalletOption {
  name: string
  icon: string
  id: string
  description: string
  color: string
}

export default function ConnectWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connectingWallet, setConnectingWallet] = useState('')

  const walletOptions: WalletOption[] = [
    {
      name: 'MetaMask',
      icon: '🦊',
      id: 'metamask',
      description: 'Connect using browser extension',
      color: 'from-orange-400 to-orange-600'
    },
    {
      name: 'WalletConnect',
      icon: '📱',
      id: 'walletconnect',
      description: 'Connect using mobile wallet',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Coinbase Wallet',
      icon: '🔵',
      id: 'coinbase',
      description: 'Connect using Coinbase Wallet',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      name: 'Trust Wallet',
      icon: '🛡️',
      id: 'trust',
      description: 'Connect using Trust Wallet',
      color: 'from-blue-600 to-cyan-600'
    },
    {
      name: 'Phantom',
      icon: '👻',
      id: 'phantom',
      description: 'Connect using Phantom Wallet',
      color: 'from-purple-400 to-purple-600'
    },
    {
      name: 'Rainbow',
      icon: '🌈',
      id: 'rainbow',
      description: 'Connect using Rainbow Wallet',
      color: 'from-pink-400 to-purple-500'
    }
  ]

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setIsConnected(true)
          setAddress(accounts[0])
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const connectSpecificWallet = async (walletId: string) => {
    setConnectingWallet(walletId)
    setIsConnecting(true)

    try {
      if (walletId === 'metamask') {
        await connectMetaMask()
      } else if (walletId === 'walletconnect') {
        await connectWalletConnect()
      } else if (walletId === 'coinbase') {
        await connectCoinbase()
      } else {
        // For other wallets, try generic connection
        await connectGenericWallet()
      }
    } catch (error) {
      console.error(`Error connecting to ${walletId}:`, error)
    } finally {
      setIsConnecting(false)
      setConnectingWallet('')
      setShowWalletModal(false)
    }
  }

  const connectMetaMask = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      // Switch to BSC Testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }]
      })

      if (accounts.length > 0) {
        setIsConnected(true)
        setAddress(accounts[0])
      }
    } else {
      window.open('https://metamask.io/download/', '_blank')
    }
  }

  const connectWalletConnect = async () => {
    // WalletConnect integration would go here
    alert('WalletConnect integration coming soon!')
  }

  const connectCoinbase = async () => {
    // Coinbase Wallet integration would go here
    alert('Coinbase Wallet integration coming soon!')
  }

  const connectGenericWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      if (accounts.length > 0) {
        setIsConnected(true)
        setAddress(accounts[0])
      }
    } else {
      alert('Please install a Web3 wallet')
    }
  }

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress('')
  }

  if (isConnected) {
    return (
      <div className="relative">
        <button 
          onClick={disconnectWallet}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {formatAddress(address)}
        </button>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setShowWalletModal(true)}
        disabled={isConnecting}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>

      {/* Wallet Selection Modal */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWalletModal(false)}
          >
            <motion.div
              className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">
                  <span style={{padding: '8px 16px'}}>Choose Wallet</span>
                </h2>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Wallet Options Grid */}
              <div className="grid grid-cols-1 gap-4">
                {walletOptions.map((wallet, index) => (
                  <motion.button
                    key={wallet.id}
                    className="flex items-center p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-orange-500/50 transition-all duration-200 group"
                    onClick={() => connectSpecificWallet(wallet.id)}
                    disabled={isConnecting}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Wallet Icon */}
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${wallet.color} flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform`}>
                      {connectingWallet === wallet.id ? (
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      ) : (
                        wallet.icon
                      )}
                    </div>

                    {/* Wallet Info */}
                    <div className="flex-1 text-left">
                      <h3 className="text-white font-semibold group-hover:text-orange-400 transition-colors">
                        <span style={{padding: '4px 8px'}}>{wallet.name}</span>
                      </h3>
                      <p className="text-gray-400 text-sm">
                        <span style={{padding: '4px 8px'}}>{wallet.description}</span>
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="text-gray-400 group-hover:text-orange-400 transition-colors">
                      →
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  <span style={{padding: '4px 8px'}}>
                    New to Ethereum wallets?{' '}
                    <a 
                      href="https://ethereum.org/en/wallets/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      Learn more
                    </a>
                  </span>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}