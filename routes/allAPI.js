require("dotenv").config();

var keys = require("./keys.js");

var weather = (keys.weather);

var youtube = (keys.youtube);

var axios = require("axios");


var apiInput = function(country, cb){

    var data = {};

    var queryUrl = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";

    axios.get(queryUrl).then(

        function (response) {
            data.name = response.data[0].name + ", " + response.data[0].alpha2Code;
            data.native = response.data[0].nativeName;
            data.capital = response.data[0].capital;
            data.region = response.data[0].region + ", " + response.data[0].subregion;
            data.demonym = response.data[0].demonym;
            data.population = response.data[0].population;
            data.currency = response.data[0].currencies[0].name + ", " + response.data[0].currencies[0].symbol + ", " + response.data[0].currencies[0].code;
            data.language = response.data[0].languages[0].name + ", " + response.data[0].languages[0].nativeName;

            //console.log(response.data[0].name);
            
            var location = response.data[0].capital + "," + response.data[0].name;
            console.log('\n\n ',location,'\n\n', weather, youtube)

            var query = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + weather.id;
            axios.get(query).then(
                function (response) {
                    data.capitalWeather = response.data.name + ", " + response.data.sys.country;
                    data.wind = response.data.wind.speed;
                    data.humidity = response.data.main.humidity;
                    data.temp = response.data.main.temp;
                    data.tempMax = response.data.main.temp_max;
                    data.temMin = response.data.main.temp_min;
                    data.clouds = response.data.clouds.all;
                    data.sky = response.data.weather[0].description;
                    console.log(response.data.name + ", " + response.data.sys.country);
                    

                    var URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + country + "tourism&h&key=" + youtube.id;
                
                    axios.get(URL).then(
                        function (response) {
                            data.video = "https://www.youtube.com/embed/" + response.data.items[0].id.videoId;
                            console.log("https://www.youtube.com/embed/" + response.data.items[0].id.videoId);
                            cb(data)
                        },
                
                    ).catch(err => console.log(err))
                })

        },
    ).catch(err => {
        console.log(err)
    })


}

module.exports = apiInput