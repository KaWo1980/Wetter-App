function refreshWeather(response) {
  let temperatureValue = document.querySelector("#weather_temperature");
  let temperature = response.data.temperature.current;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;

  temperatureValue.innerHTML = Math.round(temperature);
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
