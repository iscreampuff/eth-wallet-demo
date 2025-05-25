import React from 'react';

// Displays the user's Ethereum balance when a wallet is connected
// account (string): The connected Ethereum wallet address
// balance (string): The current balance in ETH (empty string if loading)

const BalanceDisplay = ({ account, balance }) => {

  if(!account) return null;

  return (
    <div className="mt-4 pt-3">
    <p className="text-center fs-5 balance-display">
      {/* Conditional rendering based on balance state */}
      {balance !== '' ? (
        <>
          Your current balance is <span className="balance-amount">{balance} ETH</span>
        </>
      ) : (
        <span className="balance-loading">Loading...</span>
      )}
    </p>
    </div>
  );

}

export default BalanceDisplay;
