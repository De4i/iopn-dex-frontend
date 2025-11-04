import { ethers } from 'ethers';
import { CONTRACT_ADDRESSES, DEX_ABI, TOKEN_ABI } from './contracts.js';

export class Web3Service {
  constructor() {
    this.provider = null;
    this.signer = null;
    this.dexContract = null;
    this.tokenContracts = {};
    this.account = null;
  }

  async connectWallet() {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.provider = new ethers.providers.Web3Provider(window.ethereum);
        this.signer = this.provider.getSigner();
        this.account = await this.signer.getAddress();
        
        // Initialize contracts
        this.dexContract = new ethers.Contract(CONTRACT_ADDRESSES.DEX, DEX_ABI, this.signer);
        
        // Initialize token contracts
        for (const [symbol, address] of Object.entries(CONTRACT_ADDRESSES)) {
          if (symbol !== 'DEX') {
            this.tokenContracts[symbol] = new ethers.Contract(address, TOKEN_ABI, this.signer);
          }
        }
        
        return this.account;
      } catch (error) {
        console.error('Error connecting wallet:', error);
        throw error;
      }
    } else {
      throw new Error('Please install MetaMask or OKX Wallet!');
    }
  }

  async getTokenBalance(tokenSymbol) {
    const tokenContract = this.tokenContracts[tokenSymbol];
    if (!tokenContract) throw new Error('Token contract not found');
    
    const balance = await tokenContract.balanceOf(this.account);
    return ethers.utils.formatUnits(balance, 18);
  }

  async getAllBalances() {
    const balances = {};
    for (const symbol of Object.keys(this.tokenContracts)) {
      balances[symbol] = await this.getTokenBalance(symbol);
    }
    return balances;
  }

  async approveToken(tokenSymbol, amount) {
    const tokenContract = this.tokenContracts[tokenSymbol];
    const amountWei = ethers.utils.parseUnits(amount.toString(), 18);
    
    const tx = await tokenContract.approve(CONTRACT_ADDRESSES.DEX, amountWei);
    return await tx.wait();
  }

  async addLiquidity(tokenASymbol, tokenBSymbol, amountA, amountB) {
    // Approve both tokens first
    await this.approveToken(tokenASymbol, amountA);
    await this.approveToken(tokenBSymbol, amountB);

    const amountAWei = ethers.utils.parseUnits(amountA.toString(), 18);
    const amountBWei = ethers.utils.parseUnits(amountB.toString(), 18);

    const tx = await this.dexContract.addLiquidity(
      CONTRACT_ADDRESSES[tokenASymbol],
      CONTRACT_ADDRESSES[tokenBSymbol],
      amountAWei,
      amountBWei
    );

    return await tx.wait();
  }

  async swapTokens(tokenInSymbol, tokenOutSymbol, amountIn) {
    await this.approveToken(tokenInSymbol, amountIn);

    const amountInWei = ethers.utils.parseUnits(amountIn.toString(), 18);
    const tx = await this.dexContract.swap(
      CONTRACT_ADDRESSES[tokenInSymbol],
      CONTRACT_ADDRESSES[tokenOutSymbol],
      amountInWei
    );

    return await tx.wait();
  }

  async getAmountOut(amountIn, tokenInSymbol, tokenOutSymbol) {
    const amountInWei = ethers.utils.parseUnits(amountIn.toString(), 18);
    const amountOut = await this.dexContract.getAmountOut(
      amountInWei,
      CONTRACT_ADDRESSES[tokenInSymbol],
      CONTRACT_ADDRESSES[tokenOutSymbol]
    );
    
    return ethers.utils.formatUnits(amountOut, 18);
  }

  async getPoolReserves(tokenASymbol, tokenBSymbol) {
    try {
      const reserves = await this.dexContract.getReserves(
        CONTRACT_ADDRESSES[tokenASymbol],
        CONTRACT_ADDRESSES[tokenBSymbol]
      );
      
      return {
        reserveA: ethers.utils.formatUnits(reserves.reserveA, 18),
        reserveB: ethers.utils.formatUnits(reserves.reserveB, 18)
      };
    } catch (error) {
      return null;
    }
  }
}
