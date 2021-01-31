function search (event){
  event.preventDefault();
  let cityInput = document.querySelector("#searcher");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
  let apiKey="6dd93c3c2cfec70598d31537cca13e7f";

  let city= cityInput.value;
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
let units="metric";
let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", search);

function showTemperature(response){
 celsiusTemperatureMax=response.data.main.temp_max;
 celsiusTemperatureMin=response.data.main.temp_min;
 let tempMax = Math.round (celsiusTemperatureMax);
 let tempMin = Math.round (celsiusTemperatureMin);
 let h2 =document.querySelector("#h2temp");
 h2.innerHTML= tempMax + "C";
 let h3 =document.querySelector("#h3temp");
 h3.innerHTML= tempMin + "C";
 let h1 = document.querySelector("h1");
 h1.innerHTML = response.data.name;
 let windElement=document.querySelector("#wind");
 windElement.innerHTML= Math.round(response.data.wind.speed);
 let humidityElement=document.querySelector("#humidity");
 humidityElement.innerHTML=Math.round(response.data.main.humidity);
 let descriptElement=document.querySelector("#descript");
 descriptElement.innerHTML=response.data.weather[0].description;
 let iconElement=document.querySelector("#icon");
 iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 iconElement.setAttribute("alt", response.data.weather[0].description);
}

//function showPollution(event){
//let latitude= position.coords.latitude;
//let longitude=position.coords.longitude;
//let apiKey="6dd93c3c2cfec70598d31537cca13e7f";
//let url=`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
//}
//let qualityElement=document.querySelector("#airPollution");
//qualityElement.innerHTML=showPollution();





function handlePosition(position){
let latitude= position.coords.latitude;
let longitude=position.coords.longitude;
let apiKey="6dd93c3c2cfec70598d31537cca13e7f";
let url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(url).then(showTemperature);
}

function retrievePosition(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationer=document.querySelector("#marker");
locationer.addEventListener("click",retrievePosition);

function showFahrenheit(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperatureMax=(celsiusTemperatureMax*9)/5+32;
  let fahrenheitTemperatureMin=(celsiusTemperatureMin*9)/5+32;
  let temperatureElementMax=document.querySelector("#h2temp");
  temperatureElementMax.innerHTML= Math.round(fahrenheitTemperatureMax)+`F`;
  let temperatureElementMin=document.querySelector("#h3temp");
  temperatureElementMin.innerHTML= Math.round(fahrenheitTemperatureMin)+`F`;
}
let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",showFahrenheit);

function showCelsius(event){
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElementMax=document.querySelector("#h2temp");
  temperatureElementMax.innerHTML= Math.round(celsiusTemperatureMax)+`C`;
  let temperatureElementMin=document.querySelector("#h3temp");
  temperatureElementMin.innerHTML= Math.round(celsiusTemperatureMin)+`C`; 
}
let celsiusTemperatureMax=null;
let celsiusTemperatureMin=null;

let celsiusLink= document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);
