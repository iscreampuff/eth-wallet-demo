import React, { useState } from 'react';

// All the components used for this site
import WalletConnection from './components/WalletConnection';
import BalanceDisplay from './components/BalanceDisplay';
import TransactionHistory from './components/TransactionHistory';

function App() {
  // State management for our wallet app:
  // - account: stores connected wallet address (empty string if not connected)
  // - balance: stores ETH balance (empty string initially)
  // - transactions: stores transaction history (null means not loaded yet)
  // - error: stores error messages (empty string means no errors)
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [transactions, setTransactions] = useState(null);
  const [error, setError] = useState('');

  return (
    // Bootstrap container for responsive layout
    <div className="container mt-5">
      <h1 className="text-center mb-4 dashboard-heading">Ethereum Wallet Dashboard</h1>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card shadow">
            <div className="my-4 card-body">

              {/* WalletConnection handles MetaMask connection */}
              {/* Pass down state setters so child components can update parent state */}
              <WalletConnection
                account={account}
                setAccount={setAccount}
                setBalance={setBalance}
                setTransactions={setTransactions}
                setError={setError}
              />

              {/* Error display - only shows when error state isn't empty */}
              {error && <div className="alert alert-danger mt-3">{error}</div>}

              {/* BalanceDisplay shows ETH balance when wallet is connected */}
              <BalanceDisplay account={account} balance={balance} />

              {/* TransactionHistory shows last 10 transactions */}
              <TransactionHistory transactions={transactions} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
