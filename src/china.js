function search (event){
  event.preventDefault();
  let cityInput = document.querySelector("#searcher");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
  let apiKey="6dd93c3c2cfec70598d31537cca13e7f";
  let units="metric";
  let city= cityInput.value;
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", search);




function showTemperature(response){
 let tempMax = Math.round (response.data.main.temp_max);
 let tempMin = Math.round (response.data.main.temp_min);
 let h2 =document.querySelector("#h2temp");
 h2.innerHTML= tempMax;
 let h3 =document.querySelector("#h3temp");
 h3.innerHTML= tempMin;
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
  console.log(response.data.weather[0].description);
}

function handlePosition(position){
let latitude= position.coords.latitude;
let longitude=position.coords.longitude;
let apiKey="6dd93c3c2cfec70598d31537cca13e7f";
let url=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
axios.get(url).then(showTemperature);
}

function retrievePosition(event){
event.preventDefault();
navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationer=document.querySelector("#marker");
locationer.addEventListener("click",retrievePosition);