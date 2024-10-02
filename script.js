async function fetchWeather() {
    const latitude = '41.7001'; // Coventry, RI latitude
    const longitude = '-71.6456'; // Coventry, RI longitude
    const apiUrl = `https://api.weather.gov/points/${latitude},${longitude}`; // Weather.gov API

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const forecastUrl = data.properties.forecast; // Fetch the forecast URL from the response

        // Fetch the forecast data using the URL provided in the response
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = ''; // Clear previous data

        // Loop through the forecast periods and display the data
        forecastData.properties.periods.forEach(period => {
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
        const forecastDiv = document.getElementById('forecast');
        forecastDiv.innerHTML = '<p>Sorry, there was a problem fetching the weather data.</p>';
    }
}

// Fetch weather data every hour
fetchWeather();
setInterval(fetchWeather, 3600000); // 3600000 ms = 1 hour
