import React from 'react';

// Displays a user's transaction history in a list format
// transactions (array|null): Array of transaction objects or null if not loaded

const TransactionHistory = ({ transactions }) => {

  if(transactions === null) return null;

  // If transactions array exists but is empty, show "no transactions" message
  if(transactions.length === 0) {
    return (
      <div className="mt-4">
        <p className="text-center text-secondary pt-3 fs-5">No transactions found</p>
      </div>
    );
  }

  // Main transaction list rendering
  return (
    <div className="mt-3 pt-3">
      <ul className="list-group">
        {transactions.map((tx, index) => (
          <li key={index} className="list-group-item">
            <div>
              <strong>Hash:</strong> {tx.hash}<br />
              <strong>From:</strong> {tx.from}<br />
              <strong>To:</strong> {tx.to}<br />
              <strong>Value:</strong> {tx.value || '0'} wei<br />
              <strong>Asset:</strong> {tx.asset || 'ETH'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default TransactionHistory;
