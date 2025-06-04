const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
const PORT = process.env.PORT || 5000;

// Middleware (just for potential future POST/PUT requests)
app.use(express.json());

// Middleware to validate the ethereum address
const validateAddress = (req, res, next) => {
  const address = req.query.address || req.body.address;

  if(!address || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return res.status(400).json({
      success: 'false',
      error: 'Valid Ethereum address is required.'
    });
  }

  // Attach the validated address to the request for later use
  req.validatedAddress = address;
  next();
};

// Fetch data from alchemy using axios
app.get('/api/v1/eth-data', validateAddress, async (req, res) => {
  try {
    const address = req.validatedAddress;

    // Axios calls to alchemy's JSON-RPC endpoints
    const [gasPriceRes, blockNumberRes, balanceRes] = await Promise.all([
      axios.post(url, {
        jsonrpc: "2.0",
        method: "eth_gasPrice",
        params: [],
        id: 1
      }),
      axios.post(url, {
        jsonrpc: "2.0",
        method: "eth_blockNumber",
        params: [],
        id: 2
      }),
      axios.post(url, {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [address, "latest"],
        id: 3
      })
    ]);

    // Converted the gas price from wei to gwei
    const currentGasPrice = parseInt(gasPriceRes.data.result, 16) / 10**9;

    // Converted the block number from hex to int
    const currentBlockNumber = parseInt(blockNumberRes.data.result, 16);

    // Converted the balance from wei to eth
    const balance = parseInt(balanceRes.data.result, 16) / 10**18;

    res.json({
      success: true,
      data: {
        currentGasPrice: currentGasPrice,
        currentBlockNum: currentBlockNumber,
        balance: balance,
        address: address,
        timestamp: new Date().toISOString()
      }
    });

  } catch(error) {
    console.error('Axios error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data',
      details: error.message
    });
  }
});

// New endpoint for React app
app.post('/transaction', validateAddress, async (req, res) => {
  try {
    // Can also use req.body (needs express.json())
    const address = req.validatedAddress;

    const response = await axios.post(url, {
      jsonrpc: "2.0",
      method: "alchemy_getAssetTransfers",
      params: [{
        fromBlock: "0x0",
        toBlock: "latest",
        fromAddress: address, // Try "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
        maxCount: "0xA",
        order: "desc",
        withMetadata: true // Better to show with the date
      }],
      id: 1
    });

    res.json({
      success: true,
      transfers: response.data.result.transfers || []
    });

  } catch(error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch data',
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
