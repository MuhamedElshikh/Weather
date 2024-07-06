async function search(city) {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=51f60b4d6a6e4568b6f25823241006&q=${city}&days=3`
    );
    if (response.ok && response.status !== 400) {
        let data = await response.json();
        console.log(data);
        displayCurrent(data.location, data.current);
        displayAnother(data.forecast.forecastday);
    }
}

document.getElementById("Search").addEventListener("keyup", function(event) {
  search(event.target.value);
});

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(location, current) {
    if (current != null) {
        var lastUpdated = new Date(current.last_updated.replace(" ", "T"));
        let cartona = `
            <div class="weather-container col-md-4 col-12 mb-3">
                <div class="forecast-header  d-flex flex-nowrap justify-content-between">
                    <p class="mb-0" >${days[lastUpdated.getDay()]}</p>
                    <p class="mb-0" >${lastUpdated.getDate()} ${
          monthNames[lastUpdated.getMonth()]
        }</p>
                </div>
                <div class="weather-body">
                    <div class="location">${location.name}</div>
                    <div class="d-flex flex-column align-items-center">
                        <div class="temp">${current.temp_c}<sup>o</sup>C</div>
                        
                        
                            <img src="https:${
                              current.condition.icon
                            }" alt="" width=90>
                            
                        
                    </div>
                    <div class="condition">${current.condition.text}</div>
                    </div>
                    <div class="weather-footer">
                    <span class="p-2"><img class="p-2" src="./img/icon-umberella.png" alt="">${
                      current.humidity
                    }%</span>
                    <span class="p-2"><img class="p-2" src="./img/icon-wind.png" alt="">${
                      current.wind_kph
                    }km/h</span>
                    <span class="p-2"><img class="p-2" src="./img/icon-compass.png" alt="">${
                      current.wind_dir
                    }</span>
                </div>
            </div>`;
        document.getElementById("Weather").innerHTML = cartona;
    }
}

function displayAnother(forecastDays) {
    let cartona = "";
    for (let i = 1; i < forecastDays.length; i++) {
        let day = new Date(forecastDays[i].date.replace(" ", "T"));
        cartona += `
            <div  class="weather-container col-md-4 col-12 mb-3">
                <div class="weather-header  d-flex flex-nowrap justify-content-between">
                    <p class="mb-0 ps-2 pt-1" >${days[day.getDay()]}</p>
                </div>
                <div class="weather-body">
                    <div class="d-flex flex-column align-items-center">
                        <img src="https:${
                          forecastDays[i].day.condition.icon
                        }" alt="" width=48>
                    
                  <p class="max-temp">${forecastDays[i].day.maxtemp_c} °C</p>
                    <p class="min-temp">${forecastDays[i].day.mintemp_c} °C</p>
                    <p class="condition">${
                      forecastDays[i].day.condition.text
                    }</p>
                  </div>
                </div>
              </div>`;
    }
    document.getElementById("Weather").innerHTML += cartona;
}

search("cairo");