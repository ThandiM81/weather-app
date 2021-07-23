let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${date} ${month}`;

let h3 = document.querySelector("h3");
h3.innerHTML = `Last updated: ${hours}:${minutes}`;

function showTemperature(response) {
  let iconDisplay = response.data.weather[0].icon;
  iconDisplay.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconDisplay}@2x.png`
  );

  let temperature = Math.round(response.data.main.temp);
  let h4 = document.querySelector("#tempDisplay");
  h4.innerHTML = `${temperature}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  let description = response.data.weather[0].description;
  let currentDescriptor = document.querySelector("#current-description");
  currentDescriptor.innerHTML = `${description}`;

  let precipitation = Math.round(response.data.main.temp);
  let currentPrec = document.querySelector("#rain");
  currentPrec.innerHTML = `Precipitation: ${precipitation}%`;

  let humidity = Math.round(response.data.main.humidity);
  let currentHumid = document.querySelector("#humid");
  currentHumid.innerHTML = `Humidity: ${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Windspeed: ${wind} km/h`;
}
function showPlace(position) {
  let apiKey = "c0e5a5c3b664f47b5456256e176f47e9";
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPlace);
}
let button = document.querySelector("#current-location");
button.addEventListener("click", showPosition);

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-entry");
  city.innerHTML = `${city.value}`;

  let apiKey = "c0e5a5c3b664f47b5456256e176f47e9";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}
let button1 = document.querySelector("#search-city");
button1.addEventListener("click", search);
