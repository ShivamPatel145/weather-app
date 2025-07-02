# Weather App

A simple weather application that allows users to search for current weather in any city. The app displays temperature, weather conditions, humidity, and wind speed with relevant icons.

## Features
- Search for weather by city name
- Displays temperature, weather condition, humidity, and wind speed
- Responsive and clean UI
- Weather icons for different conditions

## Technologies Used
- HTML
- CSS
- JavaScript
- OpenWeatherMap API

## How to Use
1. Clone the repository:
   ```sh
   git clone https://github.com/ShivamPatel145/weather-app.git
   ```
2. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
3. For local development: Replace the API key in `script.js` (line 3)
4. For deployment: Set environment variable in Vercel dashboard
5. Open `index.html` in your browser
6. Enter a city name and click the search icon to view the weather

## Deployment on Vercel
1. Fork/clone this repository
2. Connect your GitHub repository to Vercel
3. In Vercel dashboard, go to Settings → Environment Variables
4. Add: `WEATHER_API_KEY` = `your_openweathermap_api_key`
5. Deploy!

## Project Structure
```
index.html
script.js
style.css
api/
    config.js
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
