var userFormEl = document.querySelector("#user-form");
var cityValue = document.querySelector("#city")

var getCity = function(event) {
    event.preventDefault();

    var cityInput = cityValue.value.trim();
    if (cityInput) {
        getWeatherData(cityInput);

        cityValue.value="";
    } else {
        alert("Please enter a city");
    }
}

var getWeatherData = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f67d51a12eea7f50c464b5f88467b045"
    console.log(apiUrl)

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data.main.temp);
               displayWeather(data.main.temp);     
            });
        } else {
            alert("Error");
        }
    });
};

var displayWeather = function(temp) {
    console.log("temp");
}

userFormEl.addEventListener("submit", getCity);


// dynamically add city name, date, wind, humidity, uv index in div and