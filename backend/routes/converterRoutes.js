const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

// Cache for exchange rates to reduce API calls
let cachedRates = null;
let cacheTimestamp = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

router.get('/convert', authMiddleware, async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: 'Invalid parameters' });
  }

  try {
    let rates;

    // Check if cached rates are valid
    if (
      cachedRates &&
      cacheTimestamp &&
      Date.now() - cacheTimestamp < CACHE_DURATION
    ) {
      rates = cachedRates;
    } else {
      // Fetch latest rates from ExchangeRate-API
      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${from}`
      );

      if (response.data.result !== 'success') {
        return res.status(500).json({ message: 'Failed to fetch exchange rate' });
      }

      rates = response.data.conversion_rates;
      cachedRates = rates;
      cacheTimestamp = Date.now();
    }

    // Check if the target currency is supported
    if (!rates[to]) {
      return res.status(400).json({ message: `Currency ${to} not supported` });
    }

    // Perform conversion
    const rate = rates[to];
    const result = (amount * rate).toFixed(2);

    res.json({ result, from, to, amount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;