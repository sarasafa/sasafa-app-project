function search (event){
  event.preventDefault();
  let cityInput = document.querySelector("#searcher");
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityInput.value;
  let apiKey="6dd93c3c2cfec70598d31537cca13e7f";
  let units="metric";
  let city= cityInput.value;
  console.log (city);
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

let location=document.querySelector("#marker");
location.addEventListener("click",retrievePosition);