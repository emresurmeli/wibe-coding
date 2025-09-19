# Weather Dashboard - Vibe Coding 101

A beautiful, responsive weather dashboard that displays current weather conditions and 5-day forecasts for any city. Built with vanilla HTML5, CSS3, JavaScript, and Bootstrap 5.

## Features

- 🌤️ **Current Weather Display**: Shows temperature, humidity, wind speed, visibility, and weather conditions
- 📅 **5-Day Forecast**: Displays upcoming weather with daily averages
- ❤️ **Favorites System**: Save and quickly access your favorite cities
- 🌡️ **Unit Toggle**: Switch between Celsius and Fahrenheit
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, weather-inspired design with smooth animations
- ⚡ **Real-time Data**: Powered by OpenWeatherMap API

## Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Custom styling with weather-inspired color scheme
- **Vanilla JavaScript** - Modern ES6+ features and async/await
- **Bootstrap 5** - Responsive grid system and components
- **OpenWeatherMap API** - Weather data source

## Setup Instructions

### 1. Get an API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Generate an API key (free tier includes 1,000 calls/day)

### 2. Configure the App

1. Open `script.js`
2. Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   this.apiKey = 'your_actual_api_key_here';
   ```

### 3. Run the App

1. Open `index.html` in your web browser
2. Or serve it using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

## Usage

1. **Search for Weather**: Enter a city name in the search box and click "Search" or press Enter
2. **Toggle Units**: Switch between Celsius (°C) and Fahrenheit (°F) using the radio buttons
3. **Add Favorites**: Click "Add to Favorites" on any city to save it for quick access
4. **View Favorites**: Click on any favorite city to instantly view its weather
5. **Remove Favorites**: Click the "×" button on any favorite to remove it

## Project Structure

```
101-example-app/
├── index.html          # Main HTML structure
├── styles.css          # Custom CSS styling
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## API Endpoints Used

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

## Features Implemented

### ✅ User Stories Completed

- ✅ Search for any city to see current weather
- ✅ View 5-day weather forecast for planning
- ✅ Save favorite cities for quick access
- ✅ Weather icons for quick condition understanding
- ✅ Temperature toggle between Celsius and Fahrenheit

### 🎨 Design Features

- Weather-inspired color scheme (blues, whites, grays)
- Smooth animations and transitions
- Glass-morphism card effects
- Responsive design for all screen sizes
- Modern gradient backgrounds

### 🛡️ Error Handling

- Graceful API error handling
- User-friendly error messages
- Network failure recovery
- Invalid city name handling
- API key validation

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Future Enhancements

- 🌙 Dark mode toggle
- 📍 Location-based weather (geolocation)
- 🌍 Multiple language support
- 📊 Weather charts and graphs
- 🔔 Weather alerts and notifications
- 📱 PWA (Progressive Web App) features

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Make sure you've replaced `YOUR_API_KEY_HERE` with your actual API key
   - Verify your API key is active on OpenWeatherMap

2. **"City not found" error**
   - Check the spelling of the city name
   - Try including country code (e.g., "London, UK")

3. **No data loading**
   - Check your internet connection
   - Verify the API key has sufficient quota remaining
   - Check browser console for any JavaScript errors

### Development Tips

- Open browser developer tools (F12) to see console logs
- Check the Network tab to monitor API calls
- Use the sample data in the comments for testing without an API key

## License

This project is created for educational purposes as part of the Vibe Coding 101 course.

## Contributing

This is a learning project, but feel free to fork and experiment with additional features!

---

**Happy Coding! 🌤️**
