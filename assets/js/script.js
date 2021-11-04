var userFormEl = document.querySelector("#user-form");
var cityValue = document.querySelector("#city");
var weatherCurrent =document.querySelector("#currentWeather");
var titleCity = document.querySelector("#weatherCity");
var currentCityTitle = document.getElementById("weatherCity");
var temperature = document.getElementById("tempNow");
var windMPH = document.getElementById("wind");
var currentHumidity = document.getElementById("humidity");
var currentUVI = document.getElementById("uvi");
var cityName = ""

var getFutureOne = document.getElementById("futureOne");
var futureForecast = document.getElementById("forecast")



var getCity = function(event) {
    event.preventDefault();

    var cityInput = cityValue.value.trim();
    if (cityInput) {
        getCoord(cityInput);

        cityValue.value="";
        cityName = cityInput;
        futureForecast.textContent= "";
    } else {
        alert("Please enter a city");
    }
};

var getCoord = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f67d51a12eea7f50c464b5f88467b045";

    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
               getData(data.coord.lat, data.coord.lon)    
            });
        } else {
            alert("Error");
        }
    });
};

var getData = function(lat, lon) {
    var dataApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&units=imperial&appid=f67d51a12eea7f50c464b5f88467b045";

    fetch(dataApiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                displayData(data.current.temp, data.current.humidity, data.current.wind_speed, data.current.uvi);
                displayForecast(data.daily);
            });
        } else {
            alert("Error");
        }
    });
};

var displayData = function(temp, humidity, windSpeed, uvi) {
    currentCityTitle.textContent = "Current City: " + cityName + " (" + moment().format("M/D/YYYY") +")";
    temperature.textContent = "Temp: " + temp + "°F";
    windMPH.textContent = "Wind: " + windSpeed + "MPH";
    currentHumidity.textContent = "Humdity: " + humidity + "%";
    currentUVI.textContent= "UV Index: " + uvi;
    if (uvi <= 2) {
        currentUVI.classList = "text-success"
    }
    else if (uvi <=5) {
        currentUVI.classList = "text-warning"
    }
    else if (uvi > 5) {
        currentUVI.classList = "text-danger"
    }
};

var displayForecast = function(daily) {
    for (i=0; i< daily.length - 3; i++) {
        console.log(daily[i])
        var oneFuture = document.createElement("div");
        oneFuture.classList = "bg-info text-white mr-3 p-2 d-flex flex-column";
        var oneTemp = document.createElement("span");
        var oneWind = document.createElement("span");
        var oneHumidity = document.createElement("span");
        oneTemp.textContent = "Max Temp: " + daily[i].temp.max;
        oneWind.textContent = "Wind: " + daily[i].wind_speed + "MPH";
        oneHumidity.textContent = "Humidity: " + daily[i].humidity + "%";

        oneFuture.appendChild(oneTemp);
        oneFuture.appendChild(oneWind);
        oneFuture.appendChild(oneHumidity);
        futureForecast.appendChild(oneFuture);



    }
}

userFormEl.addEventListener("submit", getCity);



// dynamically add city name, date, wind, humidity, uv index in div and
//uv index from different api call

//test