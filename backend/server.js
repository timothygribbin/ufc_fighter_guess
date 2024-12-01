// backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 5004;  // You can change this port if needed

app.use(cors());  // Enable CORS
app.use(express.json());  // Allow JSON requests

// Serve fighters data
const fightersData = require('./data/ufc_fighters_data.json');

// Get a random fighter for the guessing game
app.get('/api/fighter', (req, res) => {
  const randomFighter = fightersData[Math.floor(Math.random() * fightersData.length)];
  res.json(randomFighter);  // Send back a random fighter
});

// Serve the frontend (if you're using a build directory)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});