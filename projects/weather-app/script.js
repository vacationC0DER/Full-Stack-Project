// script.js

const apiKey = '634fdde064151974f765c29cfb48de1d'; 
document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('city-input').value.trim();
    if (city !== '') {
        getWeather(city);
    }
});

function getWeather(city) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = 'Loading...';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                weatherResult.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>${data.weather[0].description}</p>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
            } else {
                weatherResult.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            weatherResult.innerHTML = '<p>Error fetching data.</p>';
            console.error(error);
        });
}