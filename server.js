const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// API endpoint to get the API key securely
app.get('/api/config', (req, res) => {
    res.json({
        API_KEY: process.env.WEATHER_API_KEY || 'your-api-key-here'
    });
});

// Serve index.html for all routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
});
