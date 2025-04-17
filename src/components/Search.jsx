import '../css/Search.css';

function Search({search, setSearch}) {
    return (
        <div className="search-engine">
            <input 
                type="text" 
                className="city-search" 
                placeholder="Enter City Name" 
                name="search" 
                value={search} 
                onChange={(event) => setSearch(event.target.value)}
            />
        </div>
    )
}

export default Search;