// Environment configuration template
// ⚠️ IMPORTANT: Never commit API keys to version control!
// Copy this file to config.js and add your actual API key

const ENV_CONFIG = {
    // Replace 'your-api-key-here' with your actual OpenWeatherMap API key
    // Get your free API key from: https://openweathermap.org/api
    API_KEY: "your-api-key-here"
};

// Validation
if (!ENV_CONFIG.API_KEY || ENV_CONFIG.API_KEY === "your-api-key-here") {
    console.error("❌ Please set your API key in config.js");
    alert("Please set your OpenWeatherMap API key in config.js file");
}
