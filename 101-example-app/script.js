// Weather Dashboard JavaScript
class WeatherApp {
    constructor() {
        this.apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        this.favorites = this.loadFavorites();
        this.currentUnit = 'metric';
        
        this.initializeEventListeners();
        this.displayFavorites();
    }

    // Initialize all event listeners
    initializeEventListeners() {
        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', () => this.searchWeather());
        document.getElementById('cityInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchWeather();
        });

        // Unit toggle
        document.querySelectorAll('input[name="unit"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.currentUnit = e.target.value;
                // Re-search with new unit if there's current weather data
                if (document.getElementById('currentWeatherSection').style.display !== 'none') {
                    this.searchWeather();
                }
            });
        });

        // Add to favorites
        document.getElementById('addToFavoritesBtn').addEventListener('click', () => this.addToFavorites());
    }

    // Search for weather data
    async searchWeather() {
        const cityInput = document.getElementById('cityInput');
        const city = cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.showLoading(true);
        this.hideError();

        try {
            const weatherData = await this.fetchWeatherData(city);
            const forecastData = await this.fetchForecastData(city);
            
            this.displayCurrentWeather(weatherData);
            this.displayForecast(forecastData);
            
            // Clear search input
            cityInput.value = '';
            
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.showLoading(false);
        }
    }

    // Fetch current weather data
    async fetchWeatherData(city) {
        const url = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${this.currentUnit}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again later.');
            }
        }
        
        return await response.json();
    }

    // Fetch 5-day forecast data
    async fetchForecastData(city) {
        const url = `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${this.currentUnit}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch forecast data. Please try again later.');
        }
        
        return await response.json();
    }

    // Display current weather
    displayCurrentWeather(data) {
        const section = document.getElementById('currentWeatherSection');
        
        // Update city and date
        document.getElementById('currentCity').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Update weather icon
        const iconElement = document.getElementById('currentWeatherIcon');
        iconElement.className = `bi ${this.getWeatherIcon(data.weather[0].icon)} display-1`;

        // Update temperature and description
        document.getElementById('currentTemp').textContent = `${Math.round(data.main.temp)}°${this.getUnitSymbol()}`;
        document.getElementById('currentDescription').textContent = data.weather[0].description;

        // Update weather details
        document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°${this.getUnitSymbol()}`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} ${this.getWindUnit()}`;
        document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;

        // Show section with animation
        section.style.display = 'block';
        section.classList.add('fade-in');
    }

    // Display 5-day forecast
    displayForecast(data) {
        const forecastList = document.getElementById('forecastList');
        const section = document.getElementById('forecastSection');
        
        // Clear previous forecast
        forecastList.innerHTML = '';

        // Group forecast by day (OpenWeatherMap returns 3-hour intervals)
        const dailyForecasts = this.groupForecastByDay(data.list);

        // Display next 5 days
        Object.keys(dailyForecasts).slice(0, 5).forEach(date => {
            const dayData = dailyForecasts[date];
            const forecastItem = this.createForecastItem(date, dayData);
            forecastList.appendChild(forecastItem);
        });

        // Show section with animation
        section.style.display = 'block';
        section.classList.add('fade-in');
    }

    // Group forecast data by day
    groupForecastByDay(forecastList) {
        const dailyForecasts = {};
        
        forecastList.forEach(item => {
            const date = new Date(item.dt * 1000).toDateString();
            
            if (!dailyForecasts[date]) {
                dailyForecasts[date] = {
                    temps: [],
                    descriptions: [],
                    icons: []
                };
            }
            
            dailyForecasts[date].temps.push(item.main.temp);
            dailyForecasts[date].descriptions.push(item.weather[0].description);
            dailyForecasts[date].icons.push(item.weather[0].icon);
        });
        
        return dailyForecasts;
    }

    // Create forecast item element
    createForecastItem(date, dayData) {
        const col = document.createElement('div');
        col.className = 'col-md-2 col-6 mb-3';
        
        // Calculate average temperature
        const avgTemp = Math.round(dayData.temps.reduce((a, b) => a + b, 0) / dayData.temps.length);
        
        // Get most common description and icon
        const mostCommonDesc = this.getMostCommon(dayData.descriptions);
        const mostCommonIcon = this.getMostCommon(dayData.icons);
        
        col.innerHTML = `
            <div class="forecast-item slide-in">
                <div class="forecast-date">${new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div class="forecast-icon">
                    <i class="bi ${this.getWeatherIcon(mostCommonIcon)}"></i>
                </div>
                <div class="forecast-temp">${avgTemp}°${this.getUnitSymbol()}</div>
                <div class="forecast-description">${mostCommonDesc}</div>
            </div>
        `;
        
        return col;
    }

    // Get most common item in array
    getMostCommon(arr) {
        return arr.sort((a, b) =>
            arr.filter(v => v === a).length - arr.filter(v => v === b).length
        ).pop();
    }

    // Get weather icon class based on OpenWeatherMap icon code
    getWeatherIcon(iconCode) {
        const iconMap = {
            '01d': 'bi-sun',           // clear sky day
            '01n': 'bi-moon',          // clear sky night
            '02d': 'bi-cloud-sun',     // few clouds day
            '02n': 'bi-cloud-moon',    // few clouds night
            '03d': 'bi-cloud',         // scattered clouds
            '03n': 'bi-cloud',
            '04d': 'bi-cloud',         // broken clouds
            '04n': 'bi-cloud',
            '09d': 'bi-cloud-rain',    // shower rain
            '09n': 'bi-cloud-rain',
            '10d': 'bi-cloud-rain',    // rain day
            '10n': 'bi-cloud-rain',    // rain night
            '11d': 'bi-cloud-lightning', // thunderstorm
            '11n': 'bi-cloud-lightning',
            '13d': 'bi-cloud-snow',    // snow
            '13n': 'bi-cloud-snow',
            '50d': 'bi-cloud',         // mist
            '50n': 'bi-cloud'
        };
        
        return iconMap[iconCode] || 'bi-cloud';
    }

    // Get unit symbol
    getUnitSymbol() {
        return this.currentUnit === 'metric' ? 'C' : 'F';
    }

    // Get wind speed unit
    getWindUnit() {
        return this.currentUnit === 'metric' ? 'm/s' : 'mph';
    }

    // Show/hide loading spinner
    showLoading(show) {
        const spinner = document.getElementById('loadingSpinner');
        spinner.style.display = show ? 'block' : 'none';
    }

    // Show error message
    showError(message) {
        const errorAlert = document.getElementById('errorAlert');
        const errorMessage = document.getElementById('errorMessage');
        
        errorMessage.textContent = message;
        errorAlert.style.display = 'block';
        errorAlert.classList.add('fade-in');
    }

    // Hide error message
    hideError() {
        const errorAlert = document.getElementById('errorAlert');
        errorAlert.style.display = 'none';
    }

    // Add current city to favorites
    addToFavorites() {
        const cityName = document.getElementById('currentCity').textContent;
        
        if (!cityName || cityName === '') {
            this.showError('No city selected to add to favorites');
            return;
        }

        if (this.favorites.includes(cityName)) {
            this.showError('City is already in favorites');
            return;
        }

        this.favorites.push(cityName);
        this.saveFavorites();
        this.displayFavorites();
        
        // Update button state
        const btn = document.getElementById('addToFavoritesBtn');
        btn.innerHTML = '<i class="bi bi-heart-fill"></i> Added to Favorites';
        btn.classList.add('btn-success');
        btn.classList.remove('btn-outline-danger');
        
        setTimeout(() => {
            btn.innerHTML = '<i class="bi bi-heart"></i> Add to Favorites';
            btn.classList.remove('btn-success');
            btn.classList.add('btn-outline-danger');
        }, 2000);
    }

    // Remove city from favorites
    removeFromFavorites(cityName) {
        this.favorites = this.favorites.filter(city => city !== cityName);
        this.saveFavorites();
        this.displayFavorites();
    }

    // Display favorites list
    displayFavorites() {
        const favoritesSection = document.getElementById('favoritesSection');
        const favoritesList = document.getElementById('favoritesList');
        
        if (this.favorites.length === 0) {
            favoritesSection.style.display = 'none';
            return;
        }

        favoritesList.innerHTML = '';
        
        this.favorites.forEach(city => {
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'favorite-city';
            favoriteBtn.innerHTML = `
                ${city}
                <button class="remove-favorite" onclick="weatherApp.removeFromFavorites('${city}')">
                    <i class="bi bi-x"></i>
                </button>
            `;
            
            favoriteBtn.addEventListener('click', () => {
                document.getElementById('cityInput').value = city.split(',')[0];
                this.searchWeather();
            });
            
            favoritesList.appendChild(favoriteBtn);
        });
        
        favoritesSection.style.display = 'block';
    }

    // Load favorites from localStorage
    loadFavorites() {
        const saved = localStorage.getItem('weatherFavorites');
        return saved ? JSON.parse(saved) : [];
    }

    // Save favorites to localStorage
    saveFavorites() {
        localStorage.setItem('weatherFavorites', JSON.stringify(this.favorites));
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherApp = new WeatherApp();
});

// Add some sample data for demonstration (remove this in production)
// You can uncomment this to test the app without an API key
/*
document.addEventListener('DOMContentLoaded', () => {
    // Sample weather data for testing
    const sampleWeatherData = {
        name: "London",
        sys: { country: "GB" },
        weather: [{ description: "clear sky", icon: "01d" }],
        main: { 
            temp: 22, 
            feels_like: 25, 
            humidity: 65 
        },
        wind: { speed: 3.5 },
        visibility: 10000
    };
    
    const sampleForecastData = {
        list: [
            { dt: Date.now() / 1000 + 86400, main: { temp: 20 }, weather: [{ description: "clear sky", icon: "01d" }] },
            { dt: Date.now() / 1000 + 172800, main: { temp: 18 }, weather: [{ description: "few clouds", icon: "02d" }] },
            { dt: Date.now() / 1000 + 259200, main: { temp: 16 }, weather: [{ description: "rain", icon: "10d" }] },
            { dt: Date.now() / 1000 + 345600, main: { temp: 19 }, weather: [{ description: "clear sky", icon: "01d" }] },
            { dt: Date.now() / 1000 + 432000, main: { temp: 21 }, weather: [{ description: "few clouds", icon: "02d" }] }
        ]
    };
    
    // Uncomment to test with sample data
    // window.weatherApp = new WeatherApp();
    // window.weatherApp.displayCurrentWeather(sampleWeatherData);
    // window.weatherApp.displayForecast(sampleForecastData);
});
*/
