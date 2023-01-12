// add last-search class to the last search for css properties 

// weather API: will need to use list.weather.temp&humidity list.wind.speed, for each day that is gives 

// set the variable that you get and add the correct classes so it shows up the way you want it to



// add event listener on the search btn...need to store the input in the local storage so that is saves...need to create a get function that will get the last saved input and append a button with the textcont from thelocal storage and add a class of last search to the last-search-sectiion(so i=ll need a var that targets the last-searchsection so I can append the new button section to it)... need to render a function that will search the api call...need to use the geo api as well so I can get the location of the city that is enterd...then need to insert the coordiniates in the weather api to get the right location... looks at module 6 for instructions...once the api is called need to interate through the array/obj to find the info i want, then create avariable to hold that info. get the value of the info and set to text content. will need to append the forecast to the page for each day and add the necceary clases to each element that is created so that the info will be formatted correctly 

var search = document.querySelector('.search-btn');
var city = document.getElementById('city');
console.log(city)

function getWeather(lat, lon) {
    weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=43d8ab20052afee7eb5ccc2b3db69764&units=imperial'

    fetch(weatherUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            var temp1 = data.list[2].main.temp
            var wind1 = data.list[2].wind.speed
            var hum1 = data.list[2].main.humidity
            var temp2 = data.list[10].main.temp
            var wind2 = data.list[10].wind.speed
            var hum2 =data.list[10].main.humidity
            var temp3 = data.list[18].main.temp
            var wind3 = data.list[18].wind.speed
            var hum3 =data.list[18].main.humidity
            var temp4 = data.list[26].main.temp
            var wind4 = data.list[26].wind.speed
            var hum4 =data.list[26].main.humidity
            var temp5 = data.list[34].main.temp
            var wind5 = data.list[34].wind.speed
            var hum5 =data.list[34].main.humidity

        })
        
}

function getCityCoordinates () {
    requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city.value +'&limit=1&appid=43d8ab20052afee7eb5ccc2b3db69764';
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        }) 
        .then(function (data) {
            console.log(data)
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeather(lat, lon);
        })
}



search.addEventListener('click', (e) => {
    e.preventDefault()
    getCityCoordinates()
})