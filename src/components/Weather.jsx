import '../css/Weather.css';
import { useState } from 'react';
import Search from '../components/Search';

function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);

    async function fetchWeatherData(param) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=b52da9ffc8aa39c3ecd767f91efb29e5`);

            const data = await response.json();

            console.log(data, 'data');

        } catch(e) {
            console.log(e);
        }
    }

    function handleSearch() {
        fetchWeatherData(search);
    }

    return (
        <div>
            <Search 
                search={search}
                setSearch={setSearch}
                handleSearch={handleSearch}
            />
            Weather
        </div>
    )
}

export default Weather;