# Vibe Coding 101 App Specification Document

## Description
This is a weather dashboard app that displays current weather conditions and 5-day forecasts for any city. Users can search for cities and save their favorites for quick access. The app is designed for people who want a clean, simple way to check weather information.

---

## User Stories
- As a user, I want to search for a city name so that I can see its current weather
- As a user, I want to see a 5-day weather forecast so that I can plan my week
- As a user, I want to save my favorite cities so that I can quickly check their weather
- As a user, I want to see weather icons so that I can quickly understand conditions
- As a user, I want to see temperature in both Celsius and Fahrenheit so that I can use my preferred unit

---

## Tech Stack (Frontend Only)
- HTML5 for structure
- CSS3 for styling (with Flexbox/Grid for layout)
- Vanilla JavaScript for functionality
- Bootstrap 5 for responsive design components
- OpenWeatherMap API for weather data

---

## APIs
API: OpenWeatherMap
Base URL: https://api.openweathermap.org/data/2.5/
Example Endpoint: https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY
Required: API key (free tier available)
Data Used: Current weather, temperature, weather description, city name
How Used: Fetch current weather when user searches for a city

---

## Additional Comments
- I want to make the app mobile-responsive with a clean, modern design
- I'm excited to learn how to handle API calls and display dynamic data
- I might add a dark mode feature later if I have time
- I'm concerned about handling API errors gracefully
- I want to use a color scheme inspired by weather (blues, whites, grays)