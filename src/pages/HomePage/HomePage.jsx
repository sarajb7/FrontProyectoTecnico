//import { Link } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";
import Navbar from "../../components/navbar/Navbar";
import Gallery from "../../components/Gallery/gallery"
import SearchGames from "../../components/SearchGames/SearchGames";

export default function HomePage(){

    const[games, setGames] = useState([])
    const[gamesFilter, setGamesFilter] = useState([]);

    useEffect(() =>{
        const getGames = async() =>{
            const {data} = await axios.get('http://localhost:5000/juegos')
            setGames(data)
            setGamesFilter(data)
        }
        
        getGames();
    }, [])

    const handleSearch = (filterText) => {
        const filteredGames = games.filter((game) => game.nombre.toLowerCase().includes(filterText.toLowerCase()));
        console.log(filteredGames);
        setGamesFilter(filteredGames)
    }

    return <>
        <div className="main-div-home">
            <Navbar/>
            <div className="search-div-home">
                <SearchGames onSearch={handleSearch}/>
            </div>
            <div className="games-gallery">
                <Gallery data = {gamesFilter}/>
            </div>

        </div>
    </>
}