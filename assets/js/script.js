var searchFormEl = document.querySelector('.search-form');
var searchInputEl = document.querySelector('.search-input');

var apiKey = '932f9b8978de351c303b867edf8f5b07'

var searchHistoryArr = JSON.parse(localStorage.getItem('previousSearch')) || [];

function generateButtons(){
    var btnGroup = document.querySelector('.btn-group-vertical');
    btnGroup.innerHTML = "";
    searchHistoryArr.forEach(function(city){
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

    $('.card-vis-rule').show()

    var searchInputVal = this.textContent;

    getParams(searchInputVal)
}

function handleSearchFormSubmit(event) {
    event.preventDefault();
    console.log('works');

    $('.card-vis-rule').show();
    

    var searchInputVal = document.querySelector('.search-input').value;

//create modal for error 


//how to not have unhide with no input
    if (!searchInputVal) {
        return window.alert('Please enter a City to search for.')
    } 

    getParams(searchInputVal)
}


function getParams(query){
    console.log(query);

    if (searchHistoryArr.length >= 4) {
        searchHistoryArr.pop();
        searchHistoryArr.unshift(query);
        localStorage.setItem('previousSearch', JSON.stringify(searchHistoryArr));

        generateButtons();

        searchForecast(query); 
        searchCurrentWeather(query);
        return
    }

    searchHistoryArr.unshift(query);
    localStorage.setItem('previousSearch', JSON.stringify(searchHistoryArr));
    generateButtons();

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
        searchUV(weatherRes);
    
        function searchUV(weatherRes) {
            var uvQueryUrl = 'http://api.openweathermap.org/data/2.5/uv' //i?lat={lat}&lon={lon}&appid={API key}' 
        
            uvQueryUrl = uvQueryUrl + 'i?lat=' + weatherRes.coord.lat + '&lon=' + weatherRes.coord.lon + '&appid=' + apiKey;
        
            fetch(uvQueryUrl)
            .then(function (response) {
                console.log(response.ok);
                if(!response.ok) {
                    
                    throw response.json();
                }
        
                return response.json()
            })
        
            .then(function (uvRes) {
                printUV(uvRes);
            
            })
    }})
}

//another api call using lat/lon keys from coord object as parameters in url, print too uv index. create if/else statement for colored bar using logical comparison operators

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
    var countryTitleEl = document.querySelector('.country-title');
    var dateTitleEl = document.querySelector('.date-title');
    var weatherIconEl = document.querySelector('.weather-icon');
    var weatherTempEl = document.querySelector('.weather-temp');
    var weatherHumidityEl = document.querySelector('.weather-humidity');
    var weatherWindEl = document.querySelector('.weather-wind');

    cityTitleEl.textContent = weatherRes.name;
    countryTitleEl.textContent = weatherRes.sys.country;
    dateTitleEl.textContent = moment.unix(weatherRes.dt).format('l');
    weatherIconEl.innerHTML = `<img src='https://openweathermap.org/img/w/${weatherRes.weather[0].icon}.png'>`;
    weatherTempEl.textContent = 'Temperature: ' + weatherRes.main.temp + ' F°';
    weatherHumidityEl.textContent = 'Humidity: ' + weatherRes.main.humidity + ' %';
    weatherWindEl.textContent = 'wind speed: ' + weatherRes.wind.speed + ' MPH';

}

function printUV (uvRes) {
    console.log(uvRes);
    var weatherUVEl = document.querySelector('.weather-uv');
    weatherUVEl.textContent = 'UV Index: ' + uvRes.value;
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

    forecastDate1.textContent = moment.unix(forecastRes.list[5].dt).format('l');
    forecastIcon1.innerHTML = `<img src='https://openweathermap.org/img/w/${forecastRes.list[0].weather[0].icon}.png'>`;
    forecastTemp1.textContent = 'Temp: ' + forecastRes.list[5].main.temp + ' F°';
    forecastHumidity1.textContent = 'Humidity: ' + forecastRes.list[5].main.humidity + ' %';
    forecastDate2.textContent = moment.unix(forecastRes.list[13].dt).format('l');
    forecastIcon2.innerHTML = `<img src='https://openweathermap.org/img/w/${forecastRes.list[1].weather[0].icon}.png'>`
    forecastTemp2.textContent = 'Temp: ' + forecastRes.list[13].main.temp + ' F°';
    forecastHumidity2.textContent = 'Humidity: ' + forecastRes.list[13].main.humidity + ' %';
    forecastDate3.textContent = moment.unix(forecastRes.list[21].dt).format('l');
    forecastIcon3.innerHTML = `<img src='https://openweathermap.org/img/w/${forecastRes.list[2].weather[0].icon}.png'>`
    forecastTemp3.textContent = 'Temp: ' + forecastRes.list[21].main.temp + ' F°';
    forecastHumidity3.textContent = 'Humidity: ' + forecastRes.list[21].main.humidity + ' %';
    forecastDate4.textContent = moment.unix(forecastRes.list[29].dt).format('l');
    forecastIcon4.innerHTML = `<img src='https://openweathermap.org/img/w/${forecastRes.list[3].weather[0].icon}.png'>`
    forecastTemp4.textContent = 'Temp: ' + forecastRes.list[29].main.temp + ' F°';
    forecastHumidity4.textContent = 'Humidity: ' + forecastRes.list[29].main.humidity + ' %';
    forecastDate5.textContent = moment.unix(forecastRes.list[37].dt).format('l');
    forecastIcon5.innerHTML = `<img src='https://openweathermap.org/img/w/${forecastRes.list[4].weather[0].icon}.png'>`
    forecastTemp5.textContent = 'Temp: ' + forecastRes.list[37].main.temp + ' F°';
    forecastHumidity5.textContent = 'Humidity: ' + forecastRes.list[37].main.humidity + ' %';
}

generateButtons()

searchFormEl.addEventListener('click', handleSearchFormSubmit); 

