let search = document.getElementById('searchCity');
let mainCard = document.getElementById('main')
let searchCard = document.getElementById('searchCard')

search.addEventListener('submit', e => {
    e.preventDefault();
    mainCard.style.display = 'none'
    searchCard.style.display = 'inline-block'
        // console.log()
    let cityName = e.target.elements.cityName.value
    fetch('/cityname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cityName
            }),
        })
        .then(response => response.json())
        .then(data => generateSearch(data))
})

$(document).ready(function() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var {
            latitude,
            longitude,
            // accuracy
        } = pos.coords;
        console.log(pos)
            // console.log('Your current position is:');
        console.log(`Latitude : ${latitude}`);
        console.log(`Longitude: ${longitude}`);
        // console.log(`More or less ${accuracy} meters.`);

        fetch('/default', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    longitude,
                    latitude
                }),
            })
            .then(response => response.json())
            .then(data => generateHtml(data))
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
})

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

function generateHtml(data) {
    document.getElementById('main').innerHTML = `
      <div class="card" style="background-image: url(${data.photo});">
        <div class="style">
            <!--<img src="${data.photo}" class="card-img-top" alt="...">-->
            <div class="card-body">
                <h5 class="card-title">
                ${data.city},
                ${data.country} <img src="" alt="" class="icon"></h5>
                <!--<p class="card-text">The Heart of Canada</p>-->
            </div>
            <img alt="Weather Icon" class="weather-icon" src="http://openweathermap.org/img/wn/${data.icon}@2x.png">
            <p class="weather-data"><i class="fas fa-temperature-low"></i>
                <span class="text-space">${data.temperature}℃</span> / <span class="text-space"><i class="fas fa-tint"></i> ${data.humidity}%</span> / ${data.description}
            </p>
        </div>
    </div>
      `
};

function generateSearch(searchData) {
    document.getElementById('searchCard').innerHTML = `
      <div class="card" style="background-image: url(${searchData.photo});">
        <div class="style">
            <div class="card-body">
                <h5 class="card-title">
                ${searchData.city}, ${searchData.country}</h5>
            </div>
            <img alt="Weather Icon" class="weather-icon" src="http://openweathermap.org/img/wn/${searchData.icon}@2x.png">
            <p class="weather-data"><i class="fas fa-temperature-low"></i>
                <span class="text-space">${searchData.temperature}℃</span> / <span class="text-space"><i class="fas fa-tint"></i> ${searchData.humidity}%</span> / ${searchData.description}
            </p>
        </div>
    </div>
      `
};