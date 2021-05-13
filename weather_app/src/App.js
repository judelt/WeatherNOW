import axios from "axios";
import classnames from "classnames";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons'

const api = {
  key: "b81405fabcf783e25e2cc3bedd1e9d3e",
  base: "https://api.openweathermap.org/data/2.5"
}

const dateBuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherType, setWeatherType] = useState("");
  const [temp, setTemp] = useState();

  const search = (e) => {
    if (e.key === "Enter") {
      // https://openweathermap.org/current
      axios.get(`${api.base}/weather?q=${query}&appid=${api.key}`)
        .then((res) => {
          setWeather(res.data);
          console.log('weather', res.data);
          setWeatherType(res.data.weather[0].description);
          console.log('w type', res.data.weather[0].description)
          setTemp(Math.round(res.data.main.temp - 273.15));
          setQuery("");
      });
    }
  }
  const weatherClass = classnames("app", {
    "extreme-warm": temp >= 30,
    "warm": temp < 30 && temp >= 20,
    "medium": temp < 20 && temp >= 12,
    "cold": temp < 12 && temp >= -10,
    "very-cold": temp < -10 && temp >= -20,
    "extreme-cold": temp < -20,
  });

  return (
    <div className={weatherClass}>
     <main>
      <div className="search-box">
        <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            
        />
      </div>
      
      { weather.main ? (
        <>
        <div className="location-box">
          <div className="location">{ weather.name }, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
        <div className="temp">
          {Math.round(temp)}°C
        </div>
          
        <div className="weather animate"> 
        { weatherType === 'overcast clouds' && temp < 0 && (
          <FontAwesomeIcon icon={faSnowflake} />
        )}
        {weatherType === 'broken clouds' && (
          <FontAwesomeIcon icon={faCloud} />
        )} 
        { weatherType === 'overcast clouds' && temp >= 0 && (
          <FontAwesomeIcon icon={faCloudRain} />
        )}        
        {(weatherType === 'scattered clouds' ||  weatherType === 'few clouds') && (
          <FontAwesomeIcon icon={faCloudSun} />
        )}
  
        {weatherType === 'clear sky' && (
          <FontAwesomeIcon icon={faSun} />
        )} 
       
          
        </div>
          </div>
        </>
      ) : ("")}
        
     </main>
    </div>
  );
}

export default App;
