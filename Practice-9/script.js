// DAY 7 — Weather Dashboard
// File: script.js

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");

const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const weatherCard = document.querySelector("#weatherCard");

const cityName = document.querySelector("#cityName");
const country = document.querySelector("#country");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");
const weatherIcon = document.querySelector("#weatherIcon");

const feelsLike = document.querySelector("#feelsLike");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");


const getWeatherIcon = (condition) => {

  const icons = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Haze: "🌫️"
  };

  return icons[condition] || "🌤️";
};


const fetchWeather = async (city) => {

  const API_KEY = "YOUR_API_KEY";

  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {

    loading.classList.remove("hidden");
    error.classList.add("hidden");
    weatherCard.classList.add("hidden");

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    displayWeather(data);

  } catch (err) {

    error.textContent = err.message;
    error.classList.remove("hidden");

  } finally {

    loading.classList.add("hidden");
  }
};


const displayWeather = (data) => {

  cityName.textContent = data.name;
  country.textContent = data.sys.country;

  temperature.textContent =
    `${Math.round(data.main.temp)}°C`;

  description.textContent =
    data.weather[0].description;

  weatherIcon.textContent =
    getWeatherIcon(data.weather[0].main);

  feelsLike.textContent =
    `${Math.round(data.main.feels_like)}°C`;

  humidity.textContent =
    `${data.main.humidity}%`;

  wind.textContent =
    `${data.wind.speed} m/s`;

  pressure.textContent =
    `${data.main.pressure} hPa`;

  weatherCard.classList.remove("hidden");
};


searchBtn.addEventListener("click", () => {

  const city = cityInput.value.trim();

  if (!city) {
    error.textContent = "Please enter a city name";
    error.classList.remove("hidden");
    return;
  }

  fetchWeather(city);
});


cityInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    searchBtn.click();
  }

});