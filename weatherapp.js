const apikey = "11ff43d12baa67be810f06ae2f2cb115";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon")

async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    var data = await response.json();

    if (data.cod === "404") {
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "error";
        document.querySelector(".humidity").innerHTML = "error";
        document.querySelector(".wind").innerHTML= "error";
        document.querySelector(".weather").style.display = "block";
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp.toFixed(1) +`°C`;
    document.querySelector(".humidity").innerHTML = data.main.humidity+"%";
    document.querySelector(".wind").innerHTML= data.wind.speed+" Km/h";

    if(data.weather[0].main == "Clouds"){
        weathericon.src = "img/weatherapp/images/clouds.png";
    }
    else if(data.weather[0].main == "Clear"){
        weathericon.src = "img/weatherapp/images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weathericon.src = "img/weatherapp/images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weathericon.src = "img/weatherapp/images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weathericon.src = "img/weatherapp/images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
}
searchbtn.addEventListener("click", ()=>{
    console.log("Button clicked");
    checkweather(searchbox.value);
});
