var searchFormEl = document.querySelector('.search-form');
var searchInputEl = document.querySelector('.search-input');

var apiKey = '932f9b8978de351c303b867edf8f5b07'

// getting previous result
// var previousWeather = JSON.parse(localStorage.getItem('weather'));
// var previousForecast = JSON.parse(localStorage.getItem('forecast'));

var searchHistoryArr = JSON.parse(localStorage.getItem('previousSearch')) || [];

function generateButtons(){
    var btnGroup = document.querySelector('.btn-group-vertical');
    searchHistoryArr.reverse().forEach(function(city){
        var cityBtn = document.createElement('button');
        cityBtn.textContent = city;
        cityBtn.classList.add('btn');
        cityBtn.addEventListener('click', handleSearchCitySubmit);
        btnGroup.append(cityBtn);
    })
}

function handleSearchCitySubmit(event) {
    event.preventDefault();
    console.log('works');

    var searchInputVal = this.textContent;

    getParams(searchInputVal)
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    console.log('works');

    var searchInputVal = document.querySelector('.search-input').value;

    if (!searchInputVal) {
        return window.alert('Please enter a City to search for.')
    } 

    getParams(searchInputVal)
}


function getParams(query){
    console.log(query);

    if (searchHistoryArr.length <= 4) {
        searchHistoryArr.push(query);
        localStorage.setItem('previousSearch', JSON.stringify(searchHistoryArr));
    }
    searchForecast(query); 
    searchCurrentWeather(query);
}

function searchCurrentWeather(query) {
    var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/weather' 

    weatherQueryUrl = weatherQueryUrl + '?&q=' + query + '&units=imperial' + '&appid=' + apiKey;

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
    var weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast' 

    weatherQueryUrl = weatherQueryUrl + '?&q=' + query + '&units=imperial' + '&appid=' + apiKey;

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
    console.log(weatherRes);
    var cityTitleEl = document.querySelector('.city-title');
    var dateTitleEl = document.querySelector('.date-title');
    var weatherIconEl = document.querySelector('.weather-icon');
    var weatherTempEl = document.querySelector('.weather-temp');
    var weatherHumidityEl = document.querySelector('.weather-humidity');
    var weatherWindEl = document.querySelector('.weather-wind');
    var weatherUVEl = document.querySelector('.weather-uv');

    cityTitleEl.textContent = weatherRes.name;
    dateTitleEl.textContent = moment.unix(weatherRes.dt).format('l');
    console.log (dateTitleEl);
    weatherIconEl.textContent = weatherRes.weather.icon;
    weatherTempEl.textContent = 'Temperature: ' + weatherRes.main.temp + ' F°';
    weatherHumidityEl.textContent = 'Humidity: ' + weatherRes.main.humidity + ' %';
    weatherWindEl.textContent = 'wind speed: ' + weatherRes.wind.speed + ' MPH';
    weatherUVEl.textContent = 'UV Index: ' + weatherRes.main.temp;
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

    forecastDate1.textContent = moment.unix(forecastRes.list[0].dt).format('l');
    forecastIcon1.innerHTML = `<img src='https://openweathermap.org/img/w/${forecastRes.list[0].weather[0].icon}.png'>`;
    forecastTemp1.textContent = 'Temp: ' + forecastRes.list[0].main.temp + ' F°';
    forecastHumidity1.textContent = 'Humidity: ' + forecastRes.list[0].main.humidity + ' %';
    forecastDate2.textContent = moment.unix(forecastRes.list[1].dt).format('l');
    forecastIcon2.textContent = forecastRes.list[1].weather[0].icon;
    forecastTemp2.textContent = 'Temp: ' + forecastRes.list[1].main.temp + ' F°';
    forecastHumidity2.textContent = 'Humidity: ' + forecastRes.list[1].main.humidity + ' %';
    forecastDate3.textContent = moment.unix(forecastRes.list[2].dt).format('l');
    forecastIcon3.textContent = forecastRes.list[2].weather[0].icon;
    forecastTemp3.textContent = 'Temp: ' + forecastRes.list[2].main.temp + ' F°';
    forecastHumidity3.textContent = 'Humidity: ' + forecastRes.list[2].main.humidity + ' %';
    forecastDate4.textContent = moment.unix(forecastRes.list[3].dt).format('l');
    forecastIcon4.textContent = forecastRes.list[3].weather[0].icon;
    forecastTemp4.textContent = 'Temp: ' + forecastRes.list[3].main.temp + ' F°';
    forecastHumidity4.textContent = 'Humidity: ' + forecastRes.list[3].main.humidity + ' %';
    forecastDate5.textContent = moment.unix(forecastRes.list[4].dt).format('l');
    forecastIcon5.textContent = forecastRes.list[4].weather[0].icon;
    forecastTemp5.textContent = 'Temp: ' + forecastRes.list[4].main.temp + ' F°';
    forecastHumidity5.textContent = 'Humidity: ' + forecastRes.list[4].main.humidity + ' %';
}

generateButtons()

searchFormEl.addEventListener('click', handleSearchFormSubmit); //enter still works?

