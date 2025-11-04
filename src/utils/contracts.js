// Contract addresses dari deployment Anda
export const CONTRACT_ADDRESSES = {
  DEX: "0xc1dAB94c9E2D37fFEC6799962E997651A420bfd9",
  USDC: "0xAe69efe47ad3b3AEE2Be0c3A6eeA2bA9bc4a9284",
  USDT: "0xd79Cf114127bE55bDD96b608662109B277DaBF8d",
  NBLAD: "0x049f8891fb426C753CB082C9C0B4561175515d4E",
  TEST1: "0xC0637a1A9640dcf27B1495faDA0243361b0b9Fbc",
  TEST2: "0x63D2e9dAB9500522a4D27F5B077313e5248D65D0",
  DE4I: "0xF7898A9c8E62B4008313e5F838Db403D7bce6f45"
};

// ABI SimpleDEX
export const DEX_ABI = [
  {
    "inputs": [
      {"internalType": "address","name": "tokenA","type": "address"},
      {"internalType": "address","name": "tokenB","type": "address"},
      {"internalType": "uint256","name": "amountA","type": "uint256"},
      {"internalType": "uint256","name": "amountB","type": "uint256"}
    ],
    "name": "addLiquidity",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256","name": "amountIn","type": "uint256"},
      {"internalType": "address","name": "tokenIn","type": "address"},
      {"internalType": "address","name": "tokenOut","type": "address"}
    ],
    "name": "getAmountOut",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address","name": "tokenA","type": "address"},
      {"internalType": "address","name": "tokenB","type": "address"}
    ],
    "name": "getReserves",
    "outputs": [
      {"internalType": "uint256","name": "reserveA","type": "uint256"},
      {"internalType": "uint256","name": "reserveB","type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "address","name": "tokenIn","type": "address"},
      {"internalType": "address","name": "tokenOut","type": "address"},
      {"internalType": "uint256","name": "amountIn","type": "uint256"}
    ],
    "name": "swap",
    "outputs": [{"internalType": "uint256","name": "amountOut","type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// ABI ERC20 Token
export const TOKEN_ABI = [
  {
    "inputs": [
      {"internalType": "address","name": "spender","type": "address"},
      {"internalType": "uint256","name": "amount","type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"internalType": "bool","name": "","type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "account","type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8","name": "","type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string","name": "","type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string","name": "","type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
];

export const TOKENS = [
  { symbol: "USDC", address: "0xAe69efe47ad3b3AEE2Be0c3A6eeA2bA9bc4a9284", decimals: 18, name: "USD Coin" },
  { symbol: "USDT", address: "0xd79Cf114127bE55bDD96b608662109B277DaBF8d", decimals: 18, name: "USD Tether" },
  { symbol: "NBLAD", address: "0x049f8891fb426C753CB082C9C0B4561175515d4E", decimals: 18, name: "NBLAD Token" },
  { symbol: "TEST1", address: "0xC0637a1A9640dcf27B1495faDA0243361b0b9Fbc", decimals: 18, name: "Test1 Token" },
  { symbol: "TEST2", address: "0x63D2e9dAB9500522a4D27F5B077313e5248D65D0", decimals: 18, name: "Test2 Token" },
  { symbol: "DE4I", address: "0xF7898A9c8E62B4008313e5F838Db403D7bce6f45", decimals: 18, name: "DE4I Token" }
];
