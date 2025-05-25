# Ethereum Wallet Demo

## Overview
A web application for interacting with Ethereum wallets:
- **Backend**: Lightweight Node.js server fetching wallet balances, gas prices, and block data using Alchemy
- **Frontend**: Responsive React app for MetaMask integration, balance viewing, and transaction history

## Backend Features
- ✅ Get wallet balance (ETH)
- ✅ Fetch current gas prices (Gwei)
- ✅ Retrieve latest block number

## Frontend Features
- ✅ MetaMask wallet connection
- ✅ Transaction history display
- ✅ Responsive Bootstrap layout
- ✅ Basic error handling

---

## Setup Instructions

### Backend Setup
1. Install dependencies: npm install express axios dotenv
2. Create .env file: ALCHEMY_API_KEY=your-alchemy-key-here and PORT=5000
3. Start the server: node server.js or with nodemon server.js

### Frontend Setup
1. Install dependencies (check frontend/package.json)
2. Create .env file: REACT_APP_ALCHEMY_API_KEY=your_alchemy_key
3. Start the React app: npm start

---

### API Endpoint: GET /api/v1/eth-data?address={validEthAddress}

---

## Technical Details

### Backend Design
- Minimal Dependencies
- Validation First: Address validation in middleware
- Parallel Fetching: Uses Promise.all() for efficient data retrieval
- 

### Frontend Design (Styling Approach)
- Bootstrap 5 for responsive layout
- Minimal custom CSS overrides
- No additional CSS frameworks

---

## Limitations (Backend)
- No data persistence (stateless API)
- Ethereum Mainnet only (configured for ETH)
- Basic error handling

## Limitations (Frontend)
- Currently only shows sent transactions
- API calls not fully integrated
- No transaction signing capability

## Future Improvements
- Implement full API integration
- Support for multiple networks
- Enhanced error handling
