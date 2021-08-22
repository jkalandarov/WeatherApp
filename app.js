// $(document).ready(()=>{

//   var appKey = 'f2a12517c2c9fb2178d509a1d040dba5';

//   //Barcelona
//   var city = "Barcelona"
//   const barcelona_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appKey + '&units=metric';

//   //Retrieving data from API URL
//   $.get(barcelona_url, (data, status)=>{
//     const weatherData = data;
//     const temp = weatherData.main.temp;
//     const feel = weatherData.main.feels_like;
//     const condition = weatherData.weather[0].description;
//     const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
    
//     $('#barcelona-temp').text("Current temperature: " + temp + "°C");
//     $('#barcelona-feel').text("Feels like: " + feel + "°C");
//     //$('#barcelona-weather').text("Weather condition: " + condition);
//     $('#barcelona-weather-icon').attr('src', icon);
//   })
  
// });

let search = document.querySelector('input')
let mainCard = document.getElementById('main')
let searchCard = document.getElementById('searchCard')

search.addEventListener('submit', ()=>{
    mainCard.style.display = 'none'
    searchCard.style.display = 'inline-block'
    console.log("Event triggered")
})