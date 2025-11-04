import React, { useState } from 'react';
import { Web3Service } from './utils/web3.js';
import WalletConnect from './components/WalletConnect.jsx';
import SwapInterface from './components/SwapInterface.jsx';
import Liquidity from './components/Liquidity.jsx';
import './styles/globals.css';

function App() {
  const [account, setAccount] = useState(null);
  const [activeTab, setActiveTab] = useState('swap');
  const [web3Service] = useState(new Web3Service());

  const connectWallet = async () => {
    try {
      const account = await web3Service.connectWallet();
      setAccount(account);
    } catch (error) {
      alert(error.message);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🦄 IOPN DEX</h1>
        <WalletConnect 
          account={account}
          connectWallet={connectWallet}
          disconnectWallet={disconnectWallet}
        />
      </header>

      <main className="app-main">
        <div className="tab-navigation">
          <button 
            className={activeTab === 'swap' ? 'active' : ''}
            onClick={() => setActiveTab('swap')}
          >
            💱 Swap
          </button>
          <button 
            className={activeTab === 'liquidity' ? 'active' : ''}
            onClick={() => setActiveTab('liquidity')}
          >
            💧 Liquidity
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'swap' && (
            <SwapInterface web3Service={web3Service} account={account} />
          )}
          {activeTab === 'liquidity' && (
            <Liquidity web3Service={web3Service} account={account} />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>IOPN Testnet DEX - Built on IOPN Chain</p>
      </footer>
    </div>
  );
}

export default App;
