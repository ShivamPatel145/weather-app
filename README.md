# Weather App

A simple weather application that allows users to search for the current weather in any city. The app displays temperature, weather conditions, humidity, and wind speed, with relevant icons for each condition.

## Features
- Search for weather by city name
- Displays temperature, weather condition, humidity, and wind speed
- Responsive and clean UI
- Weather icons for different conditions

## Technologies Used
- HTML
- CSS
- JavaScript

## How to Use
1. Clone the repository:
   ```sh
   git clone https://github.com/ShivamPatel145/weather-app.git
   ```

2. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

3. Copy `config.sample.js` to `config.js`:

   ```sh
   cp config.sample.js config.js
   ```

4. Open `config.js` and replace `"your-api-key-here"` with your actual API key
5. Open `index.html` in your browser.
6. Enter a city name and click the search icon to view the weather.

## Environment Setup

### Local Development

- The API key is stored in `config.js` (not tracked by Git for security)
- Never commit your actual API key to version control
- The `.gitignore` file prevents accidental commits of sensitive data

### Production Deployment (Vercel)

1. Set the environment variable `WEATHER_API_KEY` in your Vercel dashboard
2. The app will automatically use the environment variable in production
3. No additional configuration needed

## Deployment

### Deploy to Vercel

1. Fork/clone this repository
2. Connect your GitHub repository to Vercel
3. Set the environment variable:
   - Variable name: `WEATHER_API_KEY`
   - Value: Your OpenWeatherMap API key
4. Deploy!

## Folder Structure

```text
index.html
script.js
style.css
config.sample.js
server.js
package.json
vercel.json
images/
    clear.png
    clouds.png
    drizzle.png
    humidity.png
    mist.png
    rain.png
    search.png
    snow.png
    wind.png
```

## License

This project is licensed under the MIT License.
