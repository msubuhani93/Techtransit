// Simple Express server for internal deployment
// Install: npm install express
// Run: node server.js

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Tech Transit Portal is running on:`);
  console.log(`  Local:   http://localhost:${PORT}`);
  console.log(`  Network: http://YOUR_IP:${PORT}`);
  console.log(`\nShare the Network URL with your team members!`);
});
