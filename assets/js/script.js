var searchFormEl = document.querySelector('.search-form');
var searchInputEl = document.querySelector('.search-input');

var apiKey = '932f9b8978de351c303b867edf8f5b07'

// getting previous result
JSON.parse(localStorage.getItem('weather'));
JSON.parse(localStorage.getItem('forecast'));

//search history - query selector for button, text content = ?
// localStorage.getItem('weather', WeatherRes);
// localStorage.getItem('forecast', WeatherRes);

function handleSearchFormSubmit(event) {
    event.preventDefault();
    console.log('works');

    var searchInputVal = document.querySelector('.search-input').value;

    if (!searchInputVal) {
        window.alert('Please enter a City to search for.')
    }

    getParams()
}


function getParams(query){
    // var searchParamsArr = document.location.search.split('&');
    var query = searchInputEl.value;
    console.log(query);
    searchForecast(query); 
    searchCurrentWeather(query);
}

function searchCurrentWeather(query) {
    var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/weather' //?q={city name}&appid={API key}

    weatherQueryUrl = weatherQueryUrl + '?&q=' + query + '&appid=' + apiKey;

    fetch(weatherQueryUrl)
    .then(function (response) {
        console.log(response.ok);
        if(!response.ok) {
            window.alert('We are unable to connect to your forecast.');
            throw response.json();
        }

        return response.json()
    })

    .then(function (weatherRes) {
        printCurrentWeather(weatherRes);
    })
}


function searchForecast(query) {
    var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast' //?q={city name}&appid={API key}

    weatherQueryUrl = weatherQueryUrl + '?&q=' + query + '&appid=' + apiKey;

    fetch(weatherQueryUrl)
    .then(function (response) {
        console.log(response.ok);
        if(!response.ok) {
            window.alert('We are unable to connect to your forecast.');
            throw response.json();
        }

        return response.json()
})
    .then (function (forecastRes) {
    
        printForecast(forecastRes);
    
    })
}


function printCurrentWeather(weatherRes) {
    var cityTitleEl = document.querySelector('.city-title');
    var dateTitleEl = document.querySelector('.date-title');
    var weatherIconEl = document.querySelector('.weather-icon');
    var weatherTempEl = document.querySelector('.weather-temp');
    var weatherHumidityEl = document.querySelector('.weather-humidity');
    var weatherWindEl = document.querySelector('.weather-wind');
    var weatherUVEl = document.querySelector('.weather-uv');

    console.log(weatherRes);

    localStorage.setItem('weather', JSON.stringify(weatherRes)); //json parse for the weatherRes?

    cityTitleEl.append(weatherRes.name);
    dateTitleEl.append(weatherRes.dt);
    weatherIconEl.append(weatherRes.weather.icon);
    weatherTempEl.append(weatherRes.main.temp);
    weatherHumidityEl.append(weatherRes.main.humidity);
    weatherWindEl.append(weatherRes.wind.speed);
    weatherUVEl.append(weatherRes.main.temp);
}

function printForecast(forecastRes) {
    var forecastDate1 = document.querySelector('.forecast-date-1');
    var forecastIcon1 = document.querySelector('.forecast-icon-1');
    var forecastTemp1 = document.querySelector('.forecast-temp-1');
    var forecastHumidity1 = document.querySelector('.forecast-humidity-1');
    var forecastDate2 = document.querySelector('.forecast-date-2');
    var forecastIcon2 = document.querySelector('.forecast-icon-2');
    var forecastTemp2 = document.querySelector('.forecast-temp-2');
    var forecastHumidity2 = document.querySelector('.forecast-humidity-2');
    var forecastDate3 = document.querySelector('.forecast-date-3');
    var forecastIcon3 = document.querySelector('.forecast-icon-3');
    var forecastTemp3 = document.querySelector('.forecast-temp-3');
    var forecastHumidity3 = document.querySelector('.forecast-humidity-3');
    var forecastDate4 = document.querySelector('.forecast-date-4');
    var forecastIcon4 = document.querySelector('.forecast-icon-4');
    var forecastTemp4 = document.querySelector('.forecast-temp-4');
    var forecastHumidity4 = document.querySelector('.forecast-humidity-4');
    var forecastDate5 = document.querySelector('.forecast-date-5');
    var forecastIcon5 = document.querySelector('.forecast-icon-5');
    var forecastTemp5 = document.querySelector('.forecast-temp-5');
    var forecastHumidity5 = document.querySelector('.forecast-humidity-5');
    

    console.log(forecastRes);

    localStorage.setItem('forecast', JSON.stringify(forecastRes)); //json parse for the weatherRes?

    forecastDate1.append();
    forecastIcon1.append( );
    forecastTemp1.append();
    forecastDate1.append();
    forecastHumidity1.append();
    forecastDate2.append();
    forecastIcon2.append();
    forecastTemp2.append();
    forecastHumidity2.append();
    forecastDate3.append();
    forecastIcon3.append();
    forecastTemp3.append();
    forecastHumidity3.append();
    forecastDate4.append();
    forecastIcon4.append();
    forecastTemp4.append();
    forecastHumidity4.append();
    forecastDate5.append();
    forecastIcon5.append();
    forecastTemp5.append();
    forecastHumidity5.append();
}



searchFormEl.addEventListener('click', handleSearchFormSubmit); //enter still works?
// .addEventListener('click', handleSearchFormSubmit);

