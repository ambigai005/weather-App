let apikey = "4db381495b65e58b135481a538b91a19"

let weather = document.getElementById("weather-data")

let city = document.getElementById("city-input")
let suggestion=document.getElementById("suggestions")
let form1 = document.querySelector("form")

form1.addEventListener("submit",(event)=>{
          event.preventDefault()

let cityValue = city.value
getWeatherData(cityValue)
transition()

})
function transition(){
  let transition = document.querySelector(".weather-container")
  transition.classList.add('weather')
} 

async function searchCity(){
   let city=document.getElementById("city-input").value.trim();

    if(city.length<2){
      suggestion.innerHTML="";
      suggestion.style.display="none";
      return;
    }
    try{
      let response =await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=5&appid=${apikey}`)
      let cities = await response.json();
      
      suggestion.innerHTML=""
      suggestion.style.display=cities.length?"block":"none"

      cities.forEach(city=>{
        let cityOption=document.createElement("div")
        cityOption.classList.add("suggestion-item")
        cityOption.textContent=`${city.name},${city.country}`
        cityOption.onclick=function(){
          document.getElementById("city-input").value=city.name;
          suggestion.style.display="none"
        }
        suggestion.appendChild(cityOption)
      })
   
    }
    catch(error){
        console.error("Error fetching city suggestions:",error);
        
    }
}
 async function getWeatherData(cityValue){
         try{
       const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`)
       
       
        
    if(!response.ok){
        throw new Error("Network response was not ok")
    }

    let data=await response.json()
    let temperature=Math.round(data.main.temp)
    let description=data.weather[0].description

    let icon=data.weather[0].icon

    let details=[`Feels like:${Math.round(data.main.feels_like)}`,
      `Humidity:${data.main.humidity}%`,
      `wind speed:${data.wind.speed} m/s`,
    ]
    weather.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`
    weather.querySelector(".temperature").textContent=`${temperature}°C`
    weather.querySelector(".description").textContent=`${description}`
    weather.querySelector(".details").innerHTML=details.map((detail)=>`<div>${detail}</div>`).join("")
  
  }
       catch(error){
        weather.querySelector(".icon").innerHTML=""
        weather.querySelector(".temperature").textContent=""
        weather.querySelector(".description").textContent="Error!!! Please try again later"
        weather.querySelector(".details").innerHTML=""
       }



}