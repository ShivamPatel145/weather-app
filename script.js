// Configuration
const CONFIG = {
    API_KEY: "5c7b3b33abe0c161bad73653d12ddda9",
    API_URL: "https://api.openweathermap.org/data/2.5/weather",
    DEFAULT_UNITS: "metric",
    DEBOUNCE_DELAY: 300, // ms
};

// Add these new configurations
Object.assign(CONFIG, {
    CACHE_DURATION: 1000 * 60 * 10, // 10 minutes
    MAX_RETRIES: 3,
    RETRY_DELAY: 1000, // 1 second
    ALERT_DURATION: 3000, // 3 seconds
});

// DOM Elements
const elements = {
    searchBox: document.querySelector(".search input"),
    searchBtn: document.querySelector(".search button"),
    weatherIcon: document.querySelector(".weather-icon"),
    weatherInfo: document.querySelector(".weather"),
    errorDisplay: document.querySelector(".error"),
    cityDisplay: document.querySelector(".city"),
    tempDisplay: document.querySelector(".temp"),
    humidityDisplay: document.querySelector(".humidity"),
    windDisplay: document.querySelector(".wind"),
    alertContainer: document.querySelector('.alert-container')
};

// Weather icon mapping
const WEATHER_ICONS = {
    Clouds: "images/clouds.png",
    Clear: "images/clear.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Snow: "images/snow.png"
};

// Add to existing WEATHER_ICONS
Object.assign(WEATHER_ICONS, {
    Haze: "images/mist.png",
    Fog: "images/mist.png",
    Thunderstorm: "images/rain.png"
});

// Cache management
const cache = {
    data: new Map(),
    set(key, value) {
        this.data.set(key, {
            value,
            timestamp: Date.now()
        });
    },
    get(key) {
        const item = this.data.get(key);
        if (!item) return null;
        if (Date.now() - item.timestamp > CONFIG.CACHE_DURATION) {
            this.data.delete(key);
            return null;
        }
        return item.value;
    }
};

// Utility functions
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

const showAlert = (message, type = 'info') => {
    const alert = document.createElement('div');
    alert.className = `alert ${type}`;
    alert.innerHTML = `
        ${message}
        <button class="close-btn">&times;</button>
    `;

    elements.alertContainer.appendChild(alert);

    // Force reflow
    void alert.offsetWidth;

    // Show alert
    setTimeout(() => alert.classList.add('show'), 10);

    // Setup close button
    const closeBtn = alert.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => removeAlert(alert));

    // Auto remove after duration
    setTimeout(() => removeAlert(alert), CONFIG.ALERT_DURATION);
};

const removeAlert = (alert) => {
    alert.classList.remove('show');
    setTimeout(() => alert.remove(), 500);
};

const showError = (message) => {
    elements.errorDisplay.textContent = message;
    elements.errorDisplay.style.display = "block";
    elements.weatherInfo.style.display = "none";
    
    // Remove any existing show class
    elements.errorDisplay.classList.remove('show');
    
    // Force a reflow
    void elements.errorDisplay.offsetWidth;
    
    // Add the show class to trigger animation
    elements.errorDisplay.classList.add('show');

    showAlert(message, 'error');
};

const showWeather = () => {
    elements.weatherInfo.style.display = "block";
    elements.errorDisplay.style.display = "none";
    elements.weatherInfo.classList.add('active');
};

const setLoading = (isLoading) => {
    elements.searchBtn.disabled = isLoading;
    elements.searchBox.disabled = isLoading;
    elements.searchBtn.style.cursor = isLoading ? "wait" : "pointer";
};

// Enhanced weather checking function
async function checkWeather(city, retryCount = 0) {
    // Sanitize input - remove extra spaces and trim
    const sanitizedCity = city.replace(/\s+/g, ' ').trim();
    
    if (!sanitizedCity) {
        showError("Please enter a city name");
        return;
    }

    setLoading(true);

    try {
        // Check cache first
        const cachedData = cache.get(sanitizedCity.toLowerCase());
        if (cachedData) {
            updateUI(cachedData);
            return;
        }

        const params = new URLSearchParams({
            q: sanitizedCity,
            units: CONFIG.DEFAULT_UNITS,
            appid: CONFIG.API_KEY
        });

        const response = await fetch(`${CONFIG.API_URL}?${params}`);
        
        if (response.status === 404) {
            showError("City not found. Please check the spelling and try again.");
            return;
        }

        if (!response.ok) {
            throw new Error(`Weather data fetch failed: ${response.statusText}`);
        }

        const data = await response.json();
        cache.set(sanitizedCity.toLowerCase(), data);
        updateUI(data);

    } catch (error) {
        console.error('Error fetching weather:', error);
        if (retryCount < CONFIG.MAX_RETRIES) {
            setTimeout(() => {
                checkWeather(city, retryCount + 1);
            }, CONFIG.RETRY_DELAY);
            return;
        }
        showError("Failed to fetch weather data. Please try again later.");
    } finally {
        setLoading(false);
    }
}

// New function to update UI
function updateUI(data) {
    elements.cityDisplay.textContent = data.name;
    elements.tempDisplay.textContent = `${Math.round(data.main.temp)}°C`;
    elements.humidityDisplay.textContent = `${data.main.humidity}%`;
    elements.windDisplay.textContent = `${data.wind.speed} km/h`;

    // Smooth icon transition
    const weatherCondition = data.weather[0].main;
    const newIconSrc = WEATHER_ICONS[weatherCondition] || WEATHER_ICONS.Clear;
    
    if (elements.weatherIcon.src.split('/').pop() !== newIconSrc.split('/').pop()) {
        elements.weatherIcon.classList.add('changing');
        setTimeout(() => {
            elements.weatherIcon.src = newIconSrc;
            elements.weatherIcon.classList.remove('changing');
        }, 200);
    }

    showAlert(`Weather updated for ${data.name}`, 'success');
    showWeather();
}

// Event listeners
const debouncedCheckWeather = debounce((city) => checkWeather(city), CONFIG.DEBOUNCE_DELAY);

elements.searchBtn.addEventListener("click", () => {
    debouncedCheckWeather(elements.searchBox.value);
    elements.searchBox.value = elements.searchBox.value.replace(/\s+/g, ' ').trim();
});

elements.searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        debouncedCheckWeather(elements.searchBox.value);
        elements.searchBox.value = elements.searchBox.value.replace(/\s+/g, ' ').trim();
    }
});

// Add this new event listener for better UX
elements.searchBox.addEventListener("input", (e) => {
    if (elements.errorDisplay.style.display === "block") {
        elements.errorDisplay.style.display = "none";
    }
});

// Add input validation on blur
elements.searchBox.addEventListener("blur", (e) => {
    e.target.value = e.target.value.replace(/\s+/g, ' ').trim();
});

// Add offline/online handling
window.addEventListener('online', () => {
    showAlert('Back online! You can search again.', 'success');
});

window.addEventListener('offline', () => {
    showAlert('You are offline. Please check your connection.', 'error');
});

// Initialize the app
elements.searchBox.focus();