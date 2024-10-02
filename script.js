async function fetchWeather() {
    try {
        const response = await fetch('https://api.weather.gov/points/{latitude},{longitude}'); // Replace with your API endpoint
        const data = await response.json();

        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = ''; // Clear previous data

        data.properties.periods.forEach(period => {
            const periodDiv = document.createElement('div');
            periodDiv.innerHTML = `
                <h2>${period.name}</h2>
                <p>Temperature: ${period.temperature}°${period.temperatureUnit}</p>
                <p>Probability of Precipitation: ${period.probabilityOfPrecipitation.value ? period.probabilityOfPrecipitation.value : 'N/A'}%</p>
                <p>Wind Speed: ${period.windSpeed}</p>
                <p>Detailed Forecast: ${period.detailedForecast}</p>
                <hr>
            `;
            forecastDiv.appendChild(periodDiv);
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Fetch weather data every hour
fetchWeather();
setInterval(fetchWeather, 3600000); // 3600000 ms = 1 hour
