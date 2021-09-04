const express = require('express');
const path = require('path')
const mysql = require('mysql2');
const app = express();
const axios = require('axios');
require('dotenv').config()

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const cityDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'weather_db'
  })
  
//   cityDB.connect()

const getPhotoUrl = (city) => {
    var photo_key = process.env.PHOTO_KEY
    var photo_url = `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${photo_key}&page=1&per_page=1`
    
    return photo_url
}

let db_data ='';

const getWeatherByCoordinates = async(lon, lat) => {
    let weather_key = process.env.WEATHER_KEY
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`

    const { data: weather_json } = await axios(weather_url)
    const photo = await axios(getPhotoUrl(weather_json.name)).then(res => {
        if (res.data.total != 0) {
            return res.data.results[0].urls.small
        } else {
            return 'https://www.plantemoran.com/-/media/images/insights-images/2018/04/thinking-about-becoming-a-smart-city.jpg?h=704&w=1100&hash=D5677DCC5CE6DF0C080CFAB8CC3EB10E'

        }
    })

    let weather = {
        city: weather_json.name,
        country: weather_json.sys.country,
        temperature: Math.round(weather_json.main.temp),
        humidity: weather_json.main.humidity,
        icon: weather_json.weather[0].icon,
        photo: photo,
        description: weather_json.weather[0].description
    }

    return weather;
}

const getWeatherByCityName = async(city) => {
    let weather_key = "f2a12517c2c9fb2178d509a1d040dba5"
    let weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather_key}&units=metric`

    const { data: weather_json } = await axios(weather_url)
    const photo = await axios(getPhotoUrl(weather_json.name)).then(res => {
        if (res.data.total != 0) {
            return res.data.results[0].urls.small
        } else {
            return 'https://www.plantemoran.com/-/media/images/insights-images/2018/04/thinking-about-becoming-a-smart-city.jpg?h=704&w=1100&hash=D5677DCC5CE6DF0C080CFAB8CC3EB10E'

        }
    })

    let weather = {
        city: weather_json.name,
        country: weather_json.sys.country,
        temperature: Math.round(weather_json.main.temp),
        humidity: weather_json.main.humidity,
        icon: weather_json.weather[0].icon,
        photo: photo,
        description: weather_json.weather[0].description,
        mostSearched: {}
    }

    //Creating query variables
    const updateQuery = `UPDATE city SET search_times = search_times + 1 WHERE city_name = ?;`
    const insertQuery = `INSERT INTO city(city_name, search_times) VALUES ('${city}', 1);`;
    
    //Checking if searched city already exists in the db, if yes updating row, if not adding the city
    cityDB.query(`select * from city where city_name =? limit 1`,[city], function(err, rows, fields) {
        
        //console.log(!!rows.length)
        if(!!rows.length) {
            cityDB.query(updateQuery,[city], (err, rows)=>{
                if (err) throw err
                console.log("Successfully updated TABLE")
            })
            
        } else {
            cityDB.query(insertQuery,(err, rows)=>{
                if (err) throw err;
                console.log("Successfully inserted data");
            })
        }
        
        cityDB.query('SELECT * FROM city order by search_times desc limit 10;', (err, rows)=>{
            if (err) throw err;
            db_data = rows;
            weather.mostSearched = rows
            //console.log(weather)
        })
        
    })
     
    return weather;
}



app.get("/", (req, res) => {

    res.render("weather");
})

app.post('/cityname', async(req, res) => {
    let data = await getWeatherByCityName(req.body.cityName)
    console.log(data)
    return res.json(data);

})

app.post("/default", async(req, res) => {
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;

    let data = await getWeatherByCoordinates(longitude, latitude)

    return res.json(data);
})


app.listen(3001, () => {
    console.log("Server started listening on port 3001");
})