import requests

# Coordinates for Coventry, RI
latitude = 41.6751
longitude = -71.5509

# Get the location information from NWS API
location_url = f"https://api.weather.gov/points/{latitude},{longitude}"

# Get the forecast URL
response = requests.get(location_url)
if response.status_code == 200:
    forecast_url = response.json()['properties']['forecast']
    
    # Get the forecast data
    forecast_response = requests.get(forecast_url)
    if forecast_response.status_code == 200:
        forecast_data = forecast_response.json()
        
        # Accessing periods from the correct nested structure
        if 'properties' in forecast_data and 'periods' in forecast_data['properties']:
            for period in forecast_data['properties']['periods']:
                name = period['name']
                temperature = period.get('temperature', 'N/A')
                probability_of_precipitation = period['probabilityOfPrecipitation']['value'] if 'probabilityOfPrecipitation' in period and period['probabilityOfPrecipitation']['value'] is not None else 'N/A'
                wind_speed = period['windSpeed']
                detailed_forecast = period['detailedForecast']

                print(f"{name}:")
                print(f"  Temperature: {temperature}°F")
                print(f"  Probability of Precipitation: {probability_of_precipitation}%")
                print(f"  Wind Speed: {wind_speed}")
                print(f"  Detailed Forecast: {detailed_forecast}")
                print()  # Blank line for better readability
        else:
            print("Key 'periods' not found in forecast_data.")
    else:
        print(f"Error fetching forecast: {forecast_response.status_code}")
else:
    print(f"Error fetching location: {response.status_code}")
