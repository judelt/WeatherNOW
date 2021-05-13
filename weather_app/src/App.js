import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun } from '@fortawesome/free-solid-svg-icons'

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
  const [query, seQuery] = useState('');
  const [weather, setWeather] = useState({});


  return (
    <div className="App medium-cold">
     <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
         
        </div>
        <div className="location-box">
          <div className="location">New York City, US</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            15°
          </div>
          
          <div className="weather">
            <FontAwesomeIcon icon={faSun} />
          </div>
        </div>
     </main>
    </div>
  );
}

export default App;
