//displaying day

let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentDate.getDay()];
let day = document.querySelector("#current-day");
day.innerHTML = currentDay;

//displaying current-time
let currentHour = currentDate.getHours();
let currentMinute = currentDate.getMinutes();
let time = document.querySelector("#current-time");

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
time.innerHTML = `${currentHour}:${currentMinute}`;

//week5 homework
function displayCityName(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");

  let currentCity = `${searchInput.value}`;
  let units = "metric";
  let apiKey = "e4c991b27b566dc4b5b311b6f8d9ac5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  console.log(response.data.name);
  let cityName = response.data.name;

  let city = document.querySelector("#current-city");
  city.innerHTML = cityName;

  let givenTemperature = temp;
  let celsiusTemperature = Math.round(givenTemperature);
  let fahrenheitTemperature = Math.round((givenTemperature * 9) / 5 + 32);

  let temperature = document.querySelector("#temperature-value");
  temperature.innerHTML = `${celsiusTemperature}`;

  function convertToCelsius() {
    let temperature = document.querySelector("#temperature-value");
    temperature.innerHTML = `${celsiusTemperature}`;
  }
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", convertToCelsius);

  function convertToFahrenheit() {
    let temperature = document.querySelector("#temperature-value");
    temperature.innerHTML = `${fahrenheitTemperature}`;
  }
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", convertToFahrenheit);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCityName);

//week 5 homework bonus location button

function getLocation(event) {
  navigator.geolocation.getCurrentPosition(logPosition);
}
function logPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "e4c991b27b566dc4b5b311b6f8d9ac5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayCurrentLocation);
}

function displayCurrentLocation(response) {
  console.log(response);
  console.log(response.data.name);
  console.log(response.data.main.temp);

  let currentLocation = response.data.name;
  console.log(currentLocation);

  let currentTemperature = Math.round(response.data.main.temp);
  console.log(currentTemperature);

  let city = document.querySelector("#current-city");
  city.innerHTML = currentLocation;

  let temp = document.querySelector("#temperature-value");
  temp.innerHTML = currentTemperature;
}

let button = document.querySelector("#location-button");
button.addEventListener("click", getLocation);
