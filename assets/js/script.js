var userFormEl = document.querySelector("#user-form");
var cityValue = document.querySelector("#city");
var weatherCurrent =document.querySelector("#currentWeather");
var titleCity = document.querySelector("#weatherCity");
var currentCityTitle = document.getElementById("weatherCity");
var temperature = document.getElementById("tempNow");
var windMPH = document.getElementById("wind");
var currentHumidity = document.getElementById("humidity");
var currentUVI = document.getElementById("uvi");
var getFutureOne = document.getElementById("futureOne");
var futureForecast = document.getElementById("forecast");
var oneDayForward = moment().add(1, 'day')
var twoDayForward = moment().add(2, 'day')
var threeDayForward = moment().add(3, 'day')
var fourDayForward = moment().add(4, 'day')
var fiveDayForward = moment().add(5, 'day')
var date1 = oneDayForward.format('M/D/YYYY'); 
var date2 = twoDayForward.format('M/D/YYYY'); 
var date3 = threeDayForward.format('M/D/YYYY'); 
var date4 = fourDayForward.format('M/D/YYYY'); 
var date5 = fiveDayForward.format('M/D/YYYY'); 
var prevCity = document.getElementById("newBtns")
var arrayDates = [date1, date2, date3, date4, date5];
var saveData =[];

var fetchData = JSON.parse(localStorage.getItem("nameCity"));
console.log(fetchData);

if (fetchData ) {
    saveData= fetchData
}
console.log(saveData)

var getCity = function(event) {
    event.preventDefault();

    var cityInput = cityValue.value.trim();
    saveData.push(cityInput)

    localStorage.setItem("nameCity", JSON.stringify(saveData))
    if (cityInput) {
        getCoord(cityInput);
        lastElement = saveData.slice(-1);
        previousCityBtn()
        cityValue.value="";
        cityName = cityInput;
        futureForecast.textContent= "";
    } else {
        alert("Please enter a city");
    }
    
};

var getCoord = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=f67d51a12eea7f50c464b5f88467b045";
    cityName = city

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
    document.getElementById("forecast").innerHTML = ""
    console.log(daily)
    for (i=0; i< daily.length - 3; i++) {
        var oneFuture = document.createElement("div");
        oneFuture.classList = "bg-dark text-white mr-3 p-2 d-flex flex-column";
        var date = document.createElement("h4");
        var oneTemp = document.createElement("span");
        var oneWind = document.createElement("span");
        var oneHumidity = document.createElement("span");
        var icons = document.createElement("span")
        icons.textContent =""

        if (daily[i].weather[0].main === "Clouds") {
            icons.innerHTML ="<i class='wi wi-cloud'></i> "
            icons.classList= "gray"
        } else if (daily[i].weather[0].main === "Clear") {
            icons.innerHTML ="<i class='wi wi-day-sunny'></i> "
            icons.classList= "yellow"
        } else if (daily[i].weather[0].main === "Rain") {
            icons.innerHTML ="<i class='wi wi-rain'></i> "
            icons.classList= "blue"
        } else if (daily[i].weather[0].main === "Snow") {
            icons.innerHTML ="<i class='wi wi-snow'></i> "
            icons.classList= "blue"
        } 

        date.textContent = arrayDates[i];
        
        oneTemp.textContent = "Max Temp: " + daily[i].temp.max + "°F";
        oneWind.textContent = "Wind: " + daily[i].wind_speed + "MPH";
        oneHumidity.textContent = "Humidity: " + daily[i].humidity + "%";
        oneFuture.appendChild(date);
        oneFuture.appendChild(icons);
        oneFuture.appendChild(oneTemp);
        oneFuture.appendChild(oneWind);
        oneFuture.appendChild(oneHumidity);
        futureForecast.appendChild(oneFuture);
    }
}

var storageDataCity = function() {
    for (i = 0; i < saveData.length; i++) {
        var createPrevCity = document.createElement("btn");
        createPrevCity.textContent = saveData[i];
        createPrevCity.setAttribute("type", "submit")
        createPrevCity.classList= "mt-3 btn btn-secondary d-flex justify-content-center"
        createPrevCity.setAttribute("id", saveData[i])
        createPrevCity.addEventListener("click", function(e) {
            if (e.target.tagName.toLowerCase() === 'btn') {
                console.log(e.target.id)
                getCoord(e.target.id)
            } else {
                console.log("button")
            }
        });
        prevCity.appendChild(createPrevCity);

    }

}

var previousCityBtn = function() {
    if ( saveData.length === 0) {
        console.log("no button")      
    }
    else {
        var createPrevCity = document.createElement("btn");

        createPrevCity.textContent = lastElement;
        createPrevCity.setAttribute("type", "submit")
        createPrevCity.classList= "mt-3 btn btn-secondary d-flex justify-content-center"
    
        createPrevCity.setAttribute("id", lastElement)
        
        createPrevCity.addEventListener("click", function(e) {
            if (e.target.tagName.toLowerCase() === 'btn') {
                console.log(e.target.id)
                getCoord(e.target.id)

            } else {
                console.log("button")
            }
        });
        prevCity.appendChild(createPrevCity); 
    } 
}

storageDataCity()
userFormEl.addEventListener("submit", getCity);



