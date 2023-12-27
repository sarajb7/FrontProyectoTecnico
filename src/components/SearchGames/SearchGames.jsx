import React from 'react';
import { useState } from "react";
import './SearchGames.css'

const SearchGames = ({onSearch}) => {
    const[gamesFilter, setGamesFilter] = useState("");
    const handleSearch = (e) => {
      console.log(e.target.value)
        const value = e.target.value;
        setGamesFilter(value);
        onSearch(value);
    }

  return (
    <div className="search-div">
        <img className="search-img" src="data:image/webp;base64,UklGRl4BAABXRUJQVlA4WAoAAAAQAAAAFAAAFAAAQUxQSBIBAAANkHPb1rHXonds2zYqp7Nt21ab1qls27Zt49q2fcMXiYgJAABOX1dd0VtrzaugG5AFvNlzNw34GvWMKk/ibto4cEclcCw35JAsiu84EgDOjppeTDcEfiTIpH/0B2X3fn1qOiEecaCZ45g//B6A9Y9BOmfNwWazAJR3QHvNWPcQAMsPeu+FhT4AeGvwmJYCXgPAlpPQMR07LBLafZIKaQg6P3hO6NEseDhHVYkMEM99y1faWy4IIuX4OkWCo6SxLr2i6Zd6YWZ4p9Tg/ZeAo5jM5CQLSeBB1mBJeZTXfwJupz5w1RE6HHoN+PlVB/mdEYB7fUcfQPzv69fk5X9GQvfMx73bw+9GOAu0GTS/GS5CTdwAVlA4ICYAAADQAgCdASoVABUAPt1qrlEopiQiqAgBEBuJaQAAPaOgAP7xbjUAAA==" alt="lupa"></img>
        <input className="search-input" type="text" placeholder={('  Buscar juego')} value={gamesFilter} onChange={handleSearch} ></input>
        </div>
  )
}

export default SearchGames;