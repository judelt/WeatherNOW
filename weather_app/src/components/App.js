import axios from "axios";
import classnames from "classnames";
import { useState } from 'react';
import { dateBuilder, localTime, isNight } from "../helpers/helpers";

const api = {
  key: "b81405fabcf783e25e2cc3bedd1e9d3e",
  base: "https://api.openweathermap.org/data/2.5"
};


function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [weatherType, setWeatherType] = useState("");
  const [temp, setTemp] = useState();
  const [timezone, setTimezone] = useState();
  const [icon, setIcon] = useState("");

  const search = (e) => {
    if (e.key === "Enter") {
      // https://openweathermap.org/current
      axios.get(`${api.base}/weather?q=${query}&appid=${api.key}`)
        .then((res) => {
          setWeather(res.data);
          console.log('weather', res.data);
          setWeatherType(res.data.weather[0].description);
          // console.log('w type', res.data.weather[0].description)
          setTemp(Math.round(res.data.main.temp - 273.15));
          setTimezone(res.data.timezone)
          // console.log('timezone', res.data.timezone)
          setIcon(res.data.weather[0].icon)
          console.log('icon', res.data.weather[0].icon)
          setQuery("");
      }) 
    }
  }
  
  const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

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
      <header className="header">
      <h1>weather<span>NOW</span></h1>  
      </header>
      
      { weather.main ? (
          <>
        <div className="search-box">
          <input
              type="text"
              className="search-bar"
              placeholder="Search for city..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search} 
          />
        </div>
        <div className="location-box">
          <div className="location">{ weather.name }, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          
          <div className="temp">
            {Math.round(temp)}°C
          </div>
            
          <div className="weather animate">  
            <img src={ iconURL}></img>
          </div>
          
          <div className="date">
            {localTime(timezone)}
          </div>
              
        </div>
      </>
        ) : (
        <>
        <section className="question">
         <h1>What's the weather like in...?</h1>     
        </section> 
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search} 
          />
        </div>   
        </>
      )}
        
     </main>
    </div>
  );
}

export default App;
