function refreshWeather(response) {
  let temperatureValue = document.querySelector("#weather_temperature");
  let temperature = response.data.temperature.current;
  let city = document.querySelector("#city");
  let weatherConditions = document.querySelector("#weather_description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind_speed");
  let dateElement = document.querySelector("#date");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather_icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather_icon_image" />`;
  city.innerHTML = response.data.city;
  dateElement.innerHTML = formatDate(date);
  weatherConditions.innerHTML = response.data.condition.description;
  temperatureValue.innerHTML = Math.round(temperature);
  humidity.innerHTML = `${response.data.temperature.humidity} %`;
  windSpeed.innerHTML = `${response.data.wind.speed} km/h`;

  getForecast(response.data.city);
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

// Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "o3ce43a0d26f03dc03af17ba46t837db";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showForecast);
}

function showForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast_day">
            <div class="forecast_date">${formatDay(day.time)}</div>
            <img class="forecast_icons" src="${day.condition.icon_url}"/>
            <div class="forecast_temperatures">
              <div class="forecast_temperature_max">${Math.round(
                day.temperature.maximum
              )}°</div>
              <div class="forecast_temperature_min">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>
          `;
    }
  });
  let forecast = document.querySelector("#forecast");
  forecast.innerHTML = forecastHtml;
}
let searchForm = document.querySelector("#search_form");
searchForm.addEventListener("submit", handleSearchSubmit);

searchCity("Dornbirn");
