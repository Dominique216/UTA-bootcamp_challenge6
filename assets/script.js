

var search = document.querySelector('.search-btn');
var city = document.getElementById('city');

function setLastSearch() {
    lastSeach = {
        lastCity: city.value.toUpperCase()
    }

    localStorage.setItem('lastSearch', JSON.stringify(lastSeach))
}

function getLastSearch() {
    var lastCitySearch = JSON.parse(localStorage.getItem("lastSearch"))
    $('.last-search-section').append(`<button class="last-search">${lastCitySearch.lastCity}</button>`)

}


function getCurrWeather(lat, lon) {
    currWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=43d8ab20052afee7eb5ccc2b3db69764&units=imperial'

    fetch(currWeatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var currtempinfo = data.main.temp
            var currwindinfo = data.wind.speed
            var currhuminfo = data.main.humidity

        var currTemp = $('.curr-temp1')
        var currWind = $('.curr-wind1')
        var currHum = $('.curr-hum1')

        currTemp[0].textContent = 'Temp: '+ currtempinfo
        currWind[0].textContent = 'Wind: '+ currwindinfo
        currHum[0].textContent = 'Humidity: '+ currhuminfo
        })
}


function getWeather(lat, lon) {
    weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=43d8ab20052afee7eb5ccc2b3db69764&units=imperial'

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var temp1info = data.list[2].main.temp
            var wind1info = data.list[2].wind.speed
            var hum1info = data.list[2].main.humidity
            var temp2info = data.list[10].main.temp
            var wind2info = data.list[10].wind.speed
            var hum2info =data.list[10].main.humidity
            var temp3info = data.list[18].main.temp
            var wind3info = data.list[18].wind.speed
            var hum3info =data.list[18].main.humidity
            var temp4info = data.list[26].main.temp
            var wind4info = data.list[26].wind.speed
            var hum4info =data.list[26].main.humidity
            var temp5info = data.list[34].main.temp
            var wind5info = data.list[34].wind.speed
            var hum5info =data.list[34].main.humidity
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
        temp2[0].textContent = 'Temp: '+ temp1info
        wind2[0].textContent = 'Wind: '+ wind1info
        hum2[0].textContent = 'Humidity: '+ hum1info
        temp3[0].textContent = 'Temp: '+ temp2info
        wind3[0].textContent = 'Wind: '+ wind2info
        hum3[0].textContent = 'Humidity: '+ hum2info
        temp4[0].textContent = 'Temp: '+ temp3info
        wind4[0].textContent = 'Wind: '+ wind3info
        hum4[0].textContent = 'Humidity: '+ hum3info
        temp5[0].textContent = 'Temp: '+ temp4info
        wind5[0].textContent = 'Wind: '+ wind4info
        hum5[0].textContent = 'Humidity: '+ hum4info
        temp6[0].textContent = 'Temp: '+ temp5info
        wind6[0].textContent = 'Wind: '+ wind5info
        hum6[0].textContent = 'Humidity: '+ hum5info
        })
       
}

function getCityCoordinates () {
    requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city.value.toUpperCase() +'&limit=1&appid=43d8ab20052afee7eb5ccc2b3db69764';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        }) 
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeather(lat, lon);
            getCurrWeather(lat, lon)
        })
}

function getDay() {
    var date = dayjs().format('MM/DD/YYYY')
    var currDay = $('.current-title')
    currDay[0].textContent = city.value.toUpperCase() + ' ' + date

    var nextFiveDays = $('h4')
    for(let i = 0; i < nextFiveDays.length; i++) {
        nextFiveDays[i].textContent = dayjs().add([i], 'day')
    }
}

function removeNone() {
    $('#currWeather').removeClass('none')
    $('#allCards').removeClass('none')
}

search.addEventListener('click', (e) => {
    e.preventDefault()
    getCityCoordinates()
    getDay()
    setLastSearch()
    getLastSearch()
    removeNone()
}) 

function init() {
    getLastSearch()
}

init()