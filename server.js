const express = require('express');
const path = require('path')
const app = express();
const axios = require('axios');
const mysql = require('mysql2');
const { resolve } = require('path');
require('dotenv').config()

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const cityDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'weather_db',
})
  
const knex = require('knex')({
client: 'mysql',
connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : process.env.DB_PASS,
    database : 'weather_db'
}
});
cityDB.connect()

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

const selectCitiesPromise = (city)=>{
    return new Promise((resolve, reject)=>{
        cityDB.query(`select * from city where city_name =? limit 1`,[city], (error, rows)=>{
            if(error){
                reject({
                    error: error,
                    data: null,
                })
            }else{
                resolve({
                    error: null,
                    data: rows,
                })
            }
        })
    })
}

const updateQueryPromise = (city)=>{
    return new Promise((resolve, reject)=>{
        cityDB.query(`UPDATE city SET search_times = search_times + 1 WHERE city_name = ?;`,[city], (error, rows)=>{
            if(error){
                reject({
                    error: error,
                    data: null,
                })
            }else{
                resolve({
                    error: null,
                    data: rows,
                })
            }
        })
    })
}

const insertQueryPromise = (city)=>{
    return new Promise((resolve, reject)=>{
        cityDB.query(`INSERT INTO city(city_name, search_times) VALUES (?, 1);`, [city], (error, rows)=>{
            if(error){
                reject({
                    error: error,
                    data: null,
                })
            }else{
                resolve({
                    error: null,
                    data: rows,
                })
            }
        })
    })
}

const mostSearchedPromise = ()=>{
    return new Promise((resolve, reject)=>{
        cityDB.query('SELECT * FROM city order by search_times desc limit 10;', (error, rows)=>{
            if(error){
                reject({
                    error: error,
                    data: null,
                })
            }else{
                resolve({
                    error: null,
                    data: rows,
                })
            }
        })
    })
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
        description: weather_json.weather[0].description
    }
    
    //Checking if searched city already exists in the db, if yes updating row, if not adding the city
    const {error, data} = await selectCitiesPromise(city)
    if(!error){
        //console.log('success!', data)
        if(!data.length){
            // no such city
            const insertQuery = await insertQueryPromise(city)
            
            if(insertQuery.error){
                return null;
            }
        }else{
            const updateQuery = await updateQueryPromise(city)
            if(updateQuery.error){
                return null;
            }
        }
    } else {
        console.error('error:', error)
        return null;
    }
    return weather;
}


app.get("/", async (req, res) => {
    const bestCities = await mostSearchedPromise();
    let topCityWeather = []
    for (let i = 0; i <bestCities.data.length; i++){
        topCityWeather.push(await getWeatherByCityName(bestCities.data[i].city_name))
    }
    console.log(topCityWeather);
    res.render("weather", {topCityWeather});
})

app.post('/cityname', async(req, res) => {
    let data = await getWeatherByCityName(req.body.cityName)
    // console.log(data)
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