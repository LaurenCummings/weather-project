import '../css/Weather.css';
import { useState, useEffect } from 'react';
import Search from '../components/Search';

function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(query) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=b52da9ffc8aa39c3ecd767f91efb29e5`);

            const data = await response.json();

            if (data) {
                setWeatherData(data);
                setLoading(false);
            }            

        } catch(e) {
            setLoading(false);
            console.log(e);
        }
    }

    function handleSearch() {
        fetchWeatherData(search);
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString('en-us', {
            weekday : 'long',
            month : 'long',
            day : 'numeric',
            year : 'numeric'
        })
    }

    useEffect(() => {
        fetchWeatherData('bangalore');
    },[]);

    return (
        <div>
            <Search 
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <div className="city-name">
                        <h2>
                            {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div>{weatherData?.main?.temp}</div>
                    <p className="description">
                        {weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ''}
                    </p>
                    <div className="weather-info">
                        <div>
                            <div>
                                <p className="wind">{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="humidity">{weatherData?.main?.humidity}</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather;