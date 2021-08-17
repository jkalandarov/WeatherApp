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

//   //Milan
//   var city = "Milan"
//   const milan_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appKey + '&units=metric';
  
//   //Retrieving data from API URL
//   $.get(milan_url, (data, status)=>{
//     const weatherData = data;
//     const temp = weatherData.main.temp;
//     const feel = weatherData.main.feels_like;
//     const condition = weatherData.weather[0].description;
//     const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
    
//     $('#milan_temp').text("Current temperature: " + temp + "°C");
//     $('#milan_feel').text("Feels like: " + feel + "°C");
//     //$('#barcelona-weather').text("Weather condition: " + condition);
//     $('#milan-weather-icon').attr('src', icon);
//   })

//   //Brussels
//   var city = "Brussels"
//   const brussels_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appKey + '&units=metric';
  
//   //Retrieving data from API URL
//   $.get(brussels_url, (data, status)=>{
//     const weatherData = data;
//     const temp = weatherData.main.temp;
//     const feel = weatherData.main.feels_like;
//     const condition = weatherData.weather[0].description;
//     const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
    
//     $('#brussels_temp').text("Current temperature: " + temp + "°C");
//     $('#brussels_feel').text("Feels like: " + feel + "°C");
//     //$('#barcelona-weather').text("Weather condition: " + condition);
//     $('#brussels-weather-icon').attr('src', icon);
//   })

//   //Frankfurt
//   var city = "Frankfurt"
//   const frankfurt_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appKey + '&units=metric';
  
//   //Retrieving data from API URL
//   $.get(frankfurt_url, (data, status)=>{
//     const weatherData = data;
//     const temp = weatherData.main.temp;
//     const feel = weatherData.main.feels_like;
//     const condition = weatherData.weather[0].description;
//     const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
    
//     $('#frankfurt_temp').text("Current temperature: " + temp + "°C");
//     $('#frankfurt_feel').text("Feels like: " + feel + "°C");
//     //$('#barcelona-weather').text("Weather condition: " + condition);
//     $('#frankfurt-weather-icon').attr('src', icon);
//   })

//   //London
//   var city = "London"
//   const london_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + appKey + '&units=metric';
  
//   //Retrieving data from API URL
//   $.get(london_url, (data, status)=>{
//     const weatherData = data;
//     const temp = weatherData.main.temp;
//     const feel = weatherData.main.feels_like;
//     const condition = weatherData.weather[0].description;
//     const icon = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"
    
//     $('#london_temp').text("Current temperature: " + temp + "°C");
//     $('#london_feel').text("Feels like: " + feel + "°C");
//     //$('#barcelona-weather').text("Weather condition: " + condition);
//     $('#london-weather-icon').attr('src', icon);
//   })
  
// });