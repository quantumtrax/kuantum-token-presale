// Contract addresses - deployed on Sepolia testnet
export const PRESALE_CONTRACT_ADDRESS = "0x9a6d7ae4e22194118bd77983d5cfc1098db19741" as `0x${string}`
export const KTK_TOKEN_ADDRESS = "0x3e293b74e01b9fe39d010567d3cdb527a2e448f3" as `0x${string}`

// Smart contract ABI
export const PRESALE_CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "buyTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getTokenBalance",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
    "name": "getContribution",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPresaleProgress",
    "outputs": [
      {"internalType": "uint256", "name": "raised", "type": "uint256"},
      {"internalType": "uint256", "name": "goal", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPresaleStatus",
    "outputs": [
      {"internalType": "uint256", "name": "raised", "type": "uint256"},
      {"internalType": "uint256", "name": "goal", "type": "uint256"},
      {"internalType": "uint256", "name": "price", "type": "uint256"},
      {"internalType": "bool", "name": "active", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokenPrice",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalRaised",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxGoal",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "presaleActive",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "userContributions",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "userTokens",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "buyer", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "ethAmount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256"}
    ],
    "name": "TokensPurchased",
    "type": "event"
  }
] as const

// KTK Token ABI - for minting tokens to users
export const KTK_TOKEN_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
    "name": "claimTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "from", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "to", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
  }
] as const

export interface PresaleData {
  totalRaised: string
  maxGoal: string
  tokenPrice: string
  presaleActive: boolean
  progress: number
}

export interface UserData {
  tokenBalance: string
  contribution: string
}

// Helper function to calculate tokens from ETH amount
export const calculateTokens = (ethAmount: string, tokenPrice: string): string => {
  try {
    const eth = parseFloat(ethAmount)
    const price = parseFloat(tokenPrice)
    if (price > 0) {
      return ((eth / price)).toLocaleString()
    }
    return "0"
  } catch {
    return "0"
  }
}

// Helper to format wei to ether
export const formatEther = (wei: bigint): string => {
  return (Number(wei) / 1e18).toString()
}

// Helper to parse ether to wei  
export const parseEther = (ether: string): bigint => {
  return BigInt(Math.floor(parseFloat(ether) * 1e18))
}