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
                </div>
            )}
        </div>
    )
}

export default Weather;