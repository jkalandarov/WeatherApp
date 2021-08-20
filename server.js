const express = require('express');
const path = require('path')
const https = require('https');
const app = express();
const axios = require('axios');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const getPhotoUrl =(city) => {
    var photo_key = "l7AecR2HkYSgN5McYcdDHt-9JLpMM6WN3mijUtR-lJQ"
    var photo_url = `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${photo_key}&page=1&per_page=1`
    return photo_url
}

const getWeather = async (lon, lat) => {
    let weather_key = "f2a12517c2c9fb2178d509a1d040dba5"
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`

    //Fetching data from OpenWeatherMap
    // await https.get(weather_url, (response) => {
    //     response.on('data', (data) => {
    //         const weather_json = JSON.parse(data);
    //         // console.log(weather_json)
            // let photo = getPhoto(weather_json.name)
            // let weather = {
            //         city: weather_json.name,
            //         country: weather_json.sys.country,
            //         temperature: Math.round(weather_json.main.temp),
            //         humidity: weather_json.main.humidity,
            //         icon: weather_json.weather[0].icon,
            //         photo: photo
            //     }
    //             return { weather }
    //         }
    //     )
    // })

    const {data: weather_json} = await axios(weather_url)
    const photo = await axios(getPhotoUrl(weather_json.name)).then(res => {
        if(res.data.total != 0) {
            return res.data.results[0].urls.small
        } else {
            return 'http://beepeers.com/assets/images/commerces/default-image.jpg'

        }
    })

    console.log('axios-------------------------------------------')

    let weather = {
            city: weather_json.name,
            country: weather_json.sys.country,
            temperature: Math.round(weather_json.main.temp),
            humidity: weather_json.main.humidity,
            icon: weather_json.weather[0].icon,
            photo: photo
        }

    return weather;
}

app.get("/", (req, res) => {
    res.render("weather");
})

app.post("/default", async (req, res) => {
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;

    // return
    let data = await getWeather(longitude, latitude)

    console.log(data)
    return res.json(data);
})


app.listen(3001, () => {
    console.log("Server started listening on port 3001");
})