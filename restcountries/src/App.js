
import React, { useState, useEffect } from 'react'
import axios from 'axios';
function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('')

  const updateSearchCountry = (evt) => {
    setSearchCountry(evt.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])


  return (
    <div>
      <form>
        Search Countries: <input value={searchCountry} onChange={updateSearchCountry} />
      </form>
      <DisplayCountries countries={countries} search={searchCountry} />
    </div>
  );
}
const DisplayCountries = ({ countries, search }) => {
  if (search !== '') {
    const searchCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    if (searchCountries.length > 10)
      return (<p>Too many matches</p>)
    if (searchCountries.length === 1)
      return <DisplayCountryDetails country={searchCountries[0]} />
    const displayCountries = searchCountries.map(country => <li>{country.name}</li>)
    return <ul>{displayCountries}</ul>
  }
  return (<p>Type something in u dingus</p>)

}

const DisplayCountryDetails = ({ country, currentWeather }) => {
  const langList = country.languages
  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital of {country.name} is: {country.capital}</p>
      <p>Population : {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {langList.map(lang => <li>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt="country flag" height="200" ></img>

      <WeatherDisplay country={country} />
    </div>

  )
}

const WeatherDisplay = ({ country }) => {
  const [weather, setWeather] = useState('')
  const [icon, setIcon] = useState('')
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}&&units=metric`).then(response =>{
    console.log('what response' , response)  
    setWeather(response.data)
      
    }
    )
  }, [])
if(weather !== undefined && weather !== ''){
  return (
    <div>
      <h4>Weather of {country.capital}</h4>
      <p>{weather.weather[0].description} </p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=""></img>
      <p>Temperature: {weather.main.temp} C°</p>
    </div>

  )
}
return (<div></div>)
  
}
export default App;
