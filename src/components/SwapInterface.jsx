import React, { useState, useEffect } from 'react';
import { TOKENS } from '../utils/contracts.js';

const SwapInterface = ({ web3Service, account }) => {
  const [fromToken, setFromToken] = useState('USDC');
  const [toToken, setToToken] = useState('USDT');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState({});

  useEffect(() => {
    if (account) {
      loadBalances();
    }
  }, [account]);

  const loadBalances = async () => {
    try {
      const balances = await web3Service.getAllBalances();
      setBalances(balances);
    } catch (error) {
      console.error('Error loading balances:', error);
    }
  };

  const handleFromAmountChange = async (value) => {
    setFromAmount(value);
    if (value && parseFloat(value) > 0) {
      try {
        const amountOut = await web3Service.getAmountOut(value, fromToken, toToken);
        setToAmount(amountOut);
      } catch (error) {
        setToAmount('0');
      }
    } else {
      setToAmount('');
    }
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const executeSwap = async () => {
    if (!fromAmount || parseFloat(fromAmount) <= 0) return;

    setLoading(true);
    try {
      const tx = await web3Service.swapTokens(fromToken, toToken, fromAmount);
      console.log('Swap successful:', tx);
      alert('Swap completed successfully!');
      await loadBalances();
      setFromAmount('');
      setToAmount('');
    } catch (error) {
      console.error('Swap error:', error);
      alert('Swap failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="swap-interface">
      <h2>💱 Swap Tokens</h2>
      
      <div className="swap-container">
        <div className="input-group">
          <label>From</label>
          <div className="token-input">
            <input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
            />
            <select 
              value={fromToken} 
              onChange={(e) => setFromToken(e.target.value)}
            >
              {TOKENS.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="balance">
            Balance: {balances[fromToken] || '0'}
          </div>
        </div>

        <div className="swap-arrow" onClick={handleSwapTokens}>
          ↓
        </div>

        <div className="input-group">
          <label>To</label>
          <div className="token-input">
            <input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
            />
            <select 
              value={toToken} 
              onChange={(e) => setToToken(e.target.value)}
            >
              {TOKENS.map(token => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
          <div className="balance">
            Balance: {balances[toToken] || '0'}
          </div>
        </div>

        <button 
          onClick={executeSwap} 
          disabled={!account || loading || !fromAmount}
          className="swap-btn"
        >
          {loading ? 'Swapping...' : 'Swap'}
        </button>
      </div>
    </div>
  );
};

export default SwapInterface;

