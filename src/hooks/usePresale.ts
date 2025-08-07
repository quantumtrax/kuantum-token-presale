import { useState, useEffect, useCallback } from 'react'
import { useAccount, usePublicClient, useWriteContract, useReadContract } from 'wagmi'
import { PRESALE_CONTRACT_ADDRESS, PRESALE_CONTRACT_ABI, KTK_TOKEN_ADDRESS, KTK_TOKEN_ABI, PresaleData, UserData, formatEther, parseEther } from '@/utils/contract'
import { useNotification } from '@/contexts/NotificationContext'

export const usePresale = () => {
  const { address, isConnected } = useAccount()
  const publicClient = usePublicClient()
  const { writeContractAsync } = useWriteContract()
  const { showNotification } = useNotification()
  
  const [presaleData, setPresaleData] = useState<PresaleData | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Read presale status
  const { data: presaleStatus, refetch: refetchPresaleStatus } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: PRESALE_CONTRACT_ABI,
    functionName: 'getPresaleStatus',
  })

  // Read user KTK token balance from the actual token contract
  const { data: userTokensData, refetch: refetchUserTokens } = useReadContract({
    address: KTK_TOKEN_ADDRESS,
    abi: KTK_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  // Read user contributions if address exists
  const { data: userContributionsData, refetch: refetchUserContributions } = useReadContract({
    address: PRESALE_CONTRACT_ADDRESS,
    abi: PRESALE_CONTRACT_ABI,
    functionName: 'userContributions',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  })

  // Process presale data
  useEffect(() => {
    if (presaleStatus && Array.isArray(presaleStatus) && presaleStatus.length === 4) {
      const [raised, goal, price, active] = presaleStatus as [bigint, bigint, bigint, boolean]
      const progress = goal > BigInt(0) ? Number((raised * BigInt(100)) / goal) : 0
      
      setPresaleData({
        totalRaised: formatEther(raised),
        maxGoal: formatEther(goal),
        tokenPrice: formatEther(price),
        presaleActive: active,
        progress: Math.min(progress, 100)
      })
    }
  }, [presaleStatus])

  // Process user data
  useEffect(() => {
    if (userTokensData !== undefined && userContributionsData !== undefined) {
      setUserData({
        tokenBalance: (Number(userTokensData) / 1e18).toString(),
        contribution: formatEther(userContributionsData as bigint)
      })
    }
  }, [userTokensData, userContributionsData])

  // Buy tokens function
  const buyTokens = useCallback(async (ethAmount: string): Promise<boolean> => {
    if (!address) {
      showNotification({
        type: 'error',
        title: 'Wallet Error',
        message: 'Please connect your wallet first.',
        duration: 4000
      })
      return false
    }

    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      showNotification({
        type: 'error',
        title: 'Invalid Amount',
        message: 'Please enter a valid ETH amount.',
        duration: 4000
      })
      return false
    }

    try {
      setIsLoading(true)
      
      showNotification({
        type: 'info',
        title: 'Transaction Pending',
        message: 'Please confirm the transaction in your wallet...',
        duration: 8000
      })

      // First buy tokens in presale contract
      const presaleHash = await writeContractAsync({
        address: PRESALE_CONTRACT_ADDRESS,
        abi: PRESALE_CONTRACT_ABI,
        functionName: 'buyTokens',
        value: parseEther(ethAmount),
      })
      
      showNotification({
        type: 'info',
        title: 'Presale Transaction Confirmed',
        message: 'Now minting your KTK tokens...',
        duration: 4000
      })

      // Wait for presale transaction
      if (publicClient) {
        await publicClient.waitForTransactionReceipt({ hash: presaleHash })
      }

      // Calculate tokens to mint (based on price 0.001 ETH = 1000 tokens)
      const tokensToMint = parseEther((parseFloat(ethAmount) * 1000).toString())

      // Mint actual KTK tokens to user's wallet
      const tokenHash = await writeContractAsync({
        address: KTK_TOKEN_ADDRESS,
        abi: KTK_TOKEN_ABI,
        functionName: 'claimTokens',
        args: [tokensToMint],
      })

      const hash = tokenHash // Use token hash for final confirmation
      
      showNotification({
        type: 'info',
        title: 'Transaction Submitted',
        message: 'Transaction submitted! Waiting for confirmation...',
        duration: 6000
      })

      // Wait for transaction receipt
      if (publicClient) {
        const receipt = await publicClient.waitForTransactionReceipt({ hash })
        
        if (receipt.status === 'success') {
          showNotification({
            type: 'success',
            title: 'Purchase Successful!',
            message: `Successfully purchased KTK tokens with ${ethAmount} ETH!`,
            duration: 6000
          })
          
          // Refetch data
          refetchPresaleStatus()
          refetchUserTokens()
          refetchUserContributions()
          return true
        } else {
          throw new Error('Transaction failed')
        }
      }
      
      return false
    } catch (error: unknown) {
      console.error('Error buying tokens:', error)
      
      let errorMessage = 'Transaction failed. Please try again.'
      if (error && typeof error === 'object' && 'name' in error && error.name === 'UserRejectedRequestError') {
        errorMessage = 'Transaction cancelled by user.'
      } else if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('insufficient funds')) {
        errorMessage = 'Insufficient ETH balance.'
      } else if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string' && error.message.includes('Exceeds max goal')) {
        errorMessage = 'Purchase amount exceeds presale goal.'
      }
      
      showNotification({
        type: 'error',
        title: 'Purchase Failed',
        message: errorMessage,
        duration: 5000
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }, [address, showNotification, writeContractAsync, publicClient, refetchPresaleStatus, refetchUserTokens, refetchUserContributions])

  return {
    presaleData,
    userData,
    isLoading,
    buyTokens,
    isContractReady: true,
    isConnected
  }
}