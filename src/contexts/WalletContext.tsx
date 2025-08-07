'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface WalletOption {
  name: string
  icon: string
  id: string
  description: string
  color: string
}

interface WalletContextType {
  isWalletConnected: boolean
  walletAddress: string
  isConnecting: boolean
  isDisconnecting: boolean
  connectWallet: () => void
  disconnectWallet: () => void
  showWalletModal: boolean
  setShowWalletModal: (show: boolean) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [isDisconnecting, setIsDisconnecting] = useState(false)
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

  const connectWallet = () => {
    setShowWalletModal(true)
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
      }) as string[]
      
      // Switch to BSC Testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }]
      })

      if (accounts.length > 0) {
        setIsWalletConnected(true)
        setWalletAddress(accounts[0])
        localStorage.removeItem('walletManuallyDisconnected')
      }
    } else {
      window.open('https://metamask.io/download/', '_blank')
    }
  }

  const connectWalletConnect = async () => {
    alert('WalletConnect integration coming soon!')
  }

  const connectCoinbase = async () => {
    alert('Coinbase Wallet integration coming soon!')
  }

  const connectGenericWallet = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[]
      
      if (accounts.length > 0) {
        setIsWalletConnected(true)
        setWalletAddress(accounts[0])
        localStorage.removeItem('walletManuallyDisconnected')
      }
    } else {
      alert('Please install a Web3 wallet')
    }
  }

  const disconnectWallet = async () => {
    try {
      setIsDisconnecting(true)
      
      // Set a flag in localStorage to prevent automatic reconnection
      localStorage.setItem('walletManuallyDisconnected', 'true')
      
      // Clear local state immediately
      setIsWalletConnected(false)
      setWalletAddress('')
      
      console.log('Wallet disconnected successfully')
      
      // Disable disconnect button for 1 second
      setTimeout(() => {
        setIsDisconnecting(false)
      }, 1000)
      
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
      // Even if there's an error, clear local state
      setIsWalletConnected(false)
      setWalletAddress('')
      localStorage.setItem('walletManuallyDisconnected', 'true')
      
      // Still disable button for 1 second
      setTimeout(() => {
        setIsDisconnecting(false)
      }, 1000)
    }
  }

  useEffect(() => {
    // Only listen for account changes, no auto-connection
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setIsWalletConnected(false)
          setWalletAddress('')
        } else if (isWalletConnected) {
          // Only update if already connected
          setWalletAddress(accounts[0])
        }
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [isWalletConnected])

  const value = {
    isWalletConnected,
    walletAddress,
    isConnecting,
    isDisconnecting,
    connectWallet,
    disconnectWallet,
    showWalletModal,
    setShowWalletModal,
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
      
      {/* Global Wallet Selection Modal - Industry Standard Design */}
      <AnimatePresence>
        {showWalletModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWalletModal(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg max-w-sm w-full shadow-xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Connect a wallet
                  </h3>
                  <button
                    onClick={() => setShowWalletModal(false)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Connect with one of our available wallet providers.
                </p>
              </div>

              {/* Wallet Options */}
              <div className="p-4 space-y-3">
                {walletOptions.map((wallet, index) => (
                  <motion.button
                    key={wallet.id}
                    className="w-full flex items-center justify-between p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-orange-400 dark:hover:border-orange-400 transition-all duration-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    onClick={() => connectSpecificWallet(wallet.id)}
                    disabled={isConnecting}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center text-lg mr-3">
                        {connectingWallet === wallet.id ? (
                          <div className="animate-spin w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full"></div>
                        ) : (
                          wallet.icon
                        )}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {wallet.name}
                      </span>
                    </div>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="p-4 pt-0 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  New to Ethereum?{' '}
                  <a 
                    href="https://ethereum.org/en/wallets/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:text-orange-600"
                  >
                    Learn about wallets
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WalletContext.Provider>
  )
}