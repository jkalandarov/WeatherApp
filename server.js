const { response } = require('express');
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const https = require('https');
const request = require('request');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

let coordinates = {
    lon: 0,
    lat: 0
}

var city = "Toronto";
var api_key = "f2a12517c2c9fb2178d509a1d040dba5"
var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

var photo_key = "l7AecR2HkYSgN5McYcdDHt-9JLpMM6WN3mijUtR-lJQ"
var photo_url = `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${photo_key}&page=1&per_page=1`

app.get("/", (req, res)=>{

    var photo;

    https.get(photo_url, (response)=>{
        //console.log('StatusCode: ', response.statusCode)
        var final_data = "";
        
        response.on('data', (d)=>{
            final_data += d.toString()
        })
        //Concatenated big object data
        response.on('end', ()=>{
            const parsed_data = JSON.parse(final_data)
            photo = parsed_data.results[0].urls.small
            //console.log(photo)
        })

    })

    //Fetching data from OpenWeatherMap
    https.get(url, (response)=>{

        response.on('data', (data)=>{
            const weather_json = JSON.parse(data);

            var weather = {
                city: city,
                country: weather_json.sys.country,
                temperature: Math.round(weather_json.main.temp),
                humidity: weather_json.main.humidity,
                icon: weather_json.weather[0].icon,
                photo: photo
            }
            //console.log(weather.photo)
            var weather_data = {weather: weather}
            res.render("weather", weather_data);
        })
    })

    
})

app.post("/send_coordinates", (req, res)=>{

    coordinates.lon = req.body.longitude
    coordinates.lat = req.body.latitude

})

app.listen(3000, ()=>{
    console.log("Server started listening on port 3000");
})