
// selects search button and input
var search = document.querySelector('.search-btn');
var Searchcity = document.getElementById('city');

// saves the input to local storage
function setLastSearch(city) {
    lastSeach = {
        lastCity: city
    }

    localStorage.setItem('lastSearch', JSON.stringify(lastSeach))
}

// gets searched city from local and adds a button with city name
// adds functionality to the lasted search buttons
function getLastSearch() {
    var lastCitySearch = JSON.parse(localStorage.getItem("lastSearch")) 
    if(lastCitySearch.lastCity !== '') {
       $('.last-search-section').append(`<button class="last-search">${lastCitySearch.lastCity}</button>`) 
        var lastSearchBtn = $('.last-search')
        for (let i = 0; i < lastSearchBtn.length; i++) {
            lastSearchBtn[i].addEventListener('click', (e) => {
            e.preventDefault()
            var preCity = lastSearchBtn[i].textContent
            getCityCoordinates(preCity)
            getDay(preCity)
            setLastSearch(preCity)
            })     
        }
    }
}

// getting and setting current weather data from current weather API
function getCurrWeather(lat, lon) {
    currWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=43d8ab20052afee7eb5ccc2b3db69764&units=imperial'

    fetch(currWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        var currTemp = $('.curr-temp1')
        var currWind = $('.curr-wind1')
        var currHum = $('.curr-hum1')
        var currIconText = $('#currIcon')
        currTemp[0].textContent = 'Temp: '+ data.main.temp
        currWind[0].textContent = 'Wind: '+ data.wind.speed
        currHum[0].textContent = 'Humidity: '+ data.main.humidity
        currIconText[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`) 

        })
}

// getting and setting 5-day-forecast data from  5-day-forecast API
function getWeather(lat, lon) {
    weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=43d8ab20052afee7eb5ccc2b3db69764&units=imperial'

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        var temp2 = $('.temp2')
        var wind2 = $('.wind2')
        var hum2 = $('.hum2')
        var temp3 = $('.temp3')
        var wind3 = $('.wind3')
        var hum3 = $('.hum3')
        var temp4 = $('.temp4')
        var wind4 = $('.wind4')
        var hum4 = $('.hum4')
        var temp5 = $('.temp5')
        var wind5 = $('.wind5')
        var hum5 = $('.hum5')
        var temp6 = $('.temp6')
        var wind6 = $('.wind6')
        var hum6 = $('.hum6')
        var icon1 = $('#card1icon')
        var icon2 = $('#card2icon')
        var icon3 = $('#card3icon')
        var icon4 = $('#card4icon')
        var icon5 = $('#card5icon')
        temp2[0].textContent = 'Temp: '+ data.list[2].main.temp
        wind2[0].textContent = 'Wind: '+ data.list[2].wind.speed
        hum2[0].textContent = 'Humidity: '+ data.list[2].main.humidity
        temp3[0].textContent = 'Temp: '+ data.list[10].main.temp
        wind3[0].textContent = 'Wind: '+ data.list[10].wind.speed
        hum3[0].textContent = 'Humidity: '+ data.list[10].main.humidity
        temp4[0].textContent = 'Temp: '+ data.list[18].main.temp
        wind4[0].textContent = 'Wind: '+ data.list[18].wind.speed
        hum4[0].textContent = 'Humidity: '+ data.list[18].main.humidity
        temp5[0].textContent = 'Temp: '+ data.list[26].main.temp
        wind5[0].textContent = 'Wind: '+ data.list[26].wind.speed
        hum5[0].textContent = 'Humidity: '+ data.list[26].main.humidity
        temp6[0].textContent = 'Temp: '+ data.list[34].main.temp
        wind6[0].textContent = 'Wind: '+ data.list[34].wind.speed
        hum6[0].textContent = 'Humidity: '+ data.list[34].main.humidity

        icon1[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`)
        icon2[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[10].weather[0].icon}@2x.png`)
        icon3[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[18].weather[0].icon}@2x.png`)
        icon4[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[26].weather[0].icon}@2x.png`)
        icon5[0].setAttribute('src', `https://openweathermap.org/img/wn/${data.list[34].weather[0].icon}@2x.png`)

        })  
}

// getting the lattitude and longitude from the city that is input
function getCityCoordinates (city) {
    requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city +'&limit=1&appid=43d8ab20052afee7eb5ccc2b3db69764';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        }) 
        .then(function (data) {
            console.log(data)
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeather(lat, lon);
            getCurrWeather(lat, lon)
        })
}

// gets and sets the correct date using dayjs
function getDay(city) {
    var date = dayjs().format('MM/DD/YYYY')
    var currDay = $('.current-title')
    currDay[0].textContent = city+ ' ' + date

    var nextFiveDays = $('h4')
    for(let i = 0; i < nextFiveDays.length; i++) {
        nextFiveDays[i].textContent = dayjs().add([i], 'day')
    }
}

// removes the class of none from weather information
function removeNone() {
    $('#currWeather').removeClass('none')
    $('#allCards').removeClass('none')
}

// runs all functions once the search button is pressed
search.addEventListener('click', (e) => {
    e.preventDefault()
    getCityCoordinates(Searchcity.value.toUpperCase())
    getDay(Searchcity.value.toUpperCase() )
    setLastSearch(Searchcity.value.toUpperCase())
    getLastSearch()
    removeNone()
}) 

// gets the last searched city from local storage
function init() {
    getLastSearch()
}

init()