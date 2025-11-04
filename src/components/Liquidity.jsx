import React, { useState, useEffect } from 'react';
import { TOKENS } from '../utils/contracts.js';

const Liquidity = ({ web3Service, account }) => {
  const [tokenA, setTokenA] = useState('USDC');
  const [tokenB, setTokenB] = useState('USDT');
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [loading, setLoading] = useState(false);
  const [reserves, setReserves] = useState(null);

  useEffect(() => {
    loadPoolReserves();
  }, [tokenA, tokenB]);

  const loadPoolReserves = async () => {
    try {
      const reserves = await web3Service.getPoolReserves(tokenA, tokenB);
      setReserves(reserves);
    } catch (error) {
      setReserves(null);
    }
  };

  const addLiquidity = async () => {
    if (!amountA || !amountB) return;

    setLoading(true);
    try {
      const tx = await web3Service.addLiquidity(tokenA, tokenB, amountA, amountB);
      console.log('Liquidity added:', tx);
      alert('Liquidity added successfully!');
      setAmountA('');
      setAmountB('');
      await loadPoolReserves();
    } catch (error) {
      console.error('Add liquidity error:', error);
      alert('Failed to add liquidity: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="liquidity-interface">
      <h2>💧 Add Liquidity</h2>
      
      <div className="pool-info">
        <h3>Pool: {tokenA}-{tokenB}</h3>
        {reserves ? (
          <div className="reserves">
            <p>Reserves: {reserves.reserveA} {tokenA} / {reserves.reserveB} {tokenB}</p>
            <p>Price: 1 {tokenA} = {(reserves.reserveB / reserves.reserveA).toFixed(6)} {tokenB}</p>
          </div>
        ) : (
          <p>No liquidity in this pool yet</p>
        )}
      </div>

      <div className="liquidity-inputs">
        <div className="input-group">
          <label>{tokenA} Amount</label>
          <input
            type="number"
            placeholder="0.0"
            value={amountA}
            onChange={(e) => setAmountA(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>{tokenB} Amount</label>
          <input
            type="number"
            placeholder="0.0"
            value={amountB}
            onChange={(e) => setAmountB(e.target.value)}
          />
        </div>

        <div className="token-selectors">
          <select value={tokenA} onChange={(e) => setTokenA(e.target.value)}>
            {TOKENS.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
          <span>and</span>
          <select value={tokenB} onChange={(e) => setTokenB(e.target.value)}>
            {TOKENS.map(token => (
              <option key={token.symbol} value={token.symbol}>
                {token.symbol}
              </option>
            ))}
          </select>
        </div>

        <button 
          onClick={addLiquidity}
          disabled={!account || loading || !amountA || !amountB}
          className="add-liquidity-btn"
        >
          {loading ? 'Adding Liquidity...' : 'Add Liquidity'}
        </button>
      </div>
    </div>
  );
};

export default Liquidity;
