import React from 'react';
import axios from 'axios';
import Web3 from 'web3';

// This component handles the MetaMask connection and
// making the request using axios

const WalletConnection = ({ account, setAccount, setBalance, setTransactions, setError }) => {

  // Main wallet connection handler
  const connectWallet = async () => {
    try {
      // 1. Check if MetaMask is installed
      if(!window.ethereum) {
        throw new Error('MetaMask is not installed!');
      }

      // 2. Request account access from MetaMask
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // 3. Save the first account address then update the account state
      const connectedAddress = accounts[0];
      setAccount(connectedAddress);

      // 4. Initialize Web3 instance using MetaMask's provider
      const web3 = new Web3(window.ethereum);

      // 5. Get the balance (in wei)
      const balanceWei = await web3.eth.getBalance(connectedAddress);

      // 6. Convert wei to ETH
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether');

      // 7. Update balance state
      setBalance(balanceEth);

      // 8. Fetch transactions from alchemy
      console.log("Fetching transactions for:", connectedAddress);

      // This only returns the 10 most recent transactions SENT by the user
      // (Does not include transactions RECEIVED by the user)
      try {
        const response = await axios.post('/transaction', {
          address: connectedAddress // Or hardcoded test address
        });

        // Check for API-level errors
        if(response.data.error) {
          throw new Error(response.data.error.message);
        }

        // console.log(response.data);
        setTransactions(response.data.transfers);

      } catch(error) {
        console.error("Failed to fetch transactions:", error);
        setError("Could not load transaction history: " + error.message);
        setTransactions(null);
      }

    } catch(err) {
      // Handle errors (e.g., user rejects connection)
      setError(err.message);
    }
  };

  // Render connection button or connected status
  return (
    <div className="text-center">
      {!account ? (
        <button onClick={connectWallet} className="btn btn-primary rounded-pill px-4 py-2">
          Connect MetaMask Wallet
        </button>
      ) : (
        <div className="alert alert-success">
          {/* Better to display the wallet address shortened */}
          Wallet Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </div>
      )}
    </div>
  );

};

export default WalletConnection;
