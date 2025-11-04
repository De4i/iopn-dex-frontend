import React from 'react';

const WalletConnect = ({ account, connectWallet, disconnectWallet }) => {
  return (
    <div className="wallet-connect">
      {!account ? (
        <button onClick={connectWallet} className="connect-btn">
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="account">
            {account.slice(0, 6)}...{account.slice(-4)}
          </span>
          <button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
