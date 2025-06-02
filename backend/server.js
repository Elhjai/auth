const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const converterRoutes = require('./routes/converterRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://currencyconverter.up.railway.app' // Your Railway frontend URL
  ],
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/converter', converterRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Currency Converter API is running!' });
});

// Sync database and start server
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false })
  .then(() => {
    console.log('✅ Database synced successfully');
    console.log('📊 Tables created/verified');
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Unable to connect to the database:', err);
  });
