function refreshWeather(response) {
  let temperatureValue = document.querySelector("#weather_temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city");
  let weatherConditions = document.querySelector("#weather_description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind_speed");
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);

  city.innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(date);
  weatherConditions.innerHTML = response.data.condition.description;
  temperatureValue.innerHTML = Math.round(temperature);
  humidity.innerHTML = `${response.data.temperature.humidity} %`;
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}h`;
}

function searchCity(city) {
  let apiKey = "o3ce43a0d26f03dc03af17ba46t837db";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search_input");
  searchCity(searchInput.value);
}

let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Dornbirn");
