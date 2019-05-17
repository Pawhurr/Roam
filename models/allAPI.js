require("dotenv").config();

var keys = require("./keys.js");

var weather = (keys.weather);

var youtube = (keys.youtube);

var axios = require("axios");

function apiInput() {

    var country = process.argv.slice(2).join(" ");

    var queryUrl = "https://restcountries.eu/rest/v2/name/" + country + "?fullText=true";

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data[0].name);
            console.log(response.data[0].flag);
            console.log(response.data[0].nativeName);
            console.log(response.data[0].alpha2Code);
            console.log("Region: " + response.data[0].region);
            console.log("Region: " + response.data[0].region);
            console.log("Subregion: " + response.data[0].subregion);
            console.log("Capital: " + response.data[0].capital);
            console.log("Calling Code: " + response.data[0].callingCodes);
            console.log("Area: " + response.data[0].area);
            console.log("Currency: " + response.data[0].currencies[0].name + ", symbol: " + response.data[0].currencies[0].symbol + ", code: " + response.data[0].currencies[0].code);
            console.log("Demonym: " + response.data[0].demonym);
            console.log("Time-Zone: " + response.data[0].timezones[0]);
            console.log("Population: " + response.data[0].population);
            console.log("language: " + response.data[0].languages[0].name + ", " + response.data[0].languages[0].nativeName);


            var location = response.data[0].capital + "," + response.data[0].name;

            var query = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&units=imperial&appid=" + weather.id;
            axios.get(query).then(
                function (response) {
                    console.log(response.data.name + ", " + response.data.sys.country);
                    console.log("Wind: " + response.data.wind.speed);
                    console.log("Humidity: " + response.data.main.humidity);
                    console.log("Temperature (F) " + response.data.main.temp);
                    console.log("Maximun Temp: " + response.data.main.temp_max);
                    console.log("Minimun Temp: " + response.data.main.temp_min);
                    console.log("Clouds: " + response.data.clouds.all + "%");
                    console.log("Sky: " + response.data.weather[0].description);
                   
                })
                 
        },
    ).catch(err => console.log(err))

    var URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + country + "tourism&h&key=" + youtube.id;

    axios.get(URL).then(
        function (response) {
            console.log("https://www.youtube.com/embed/" + response.data.items[0].id.videoId);

        },

    ).catch(err => console.log(err))
}
console.log(data);
apiInput();