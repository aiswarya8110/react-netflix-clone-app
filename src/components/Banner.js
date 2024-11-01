import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import './Banner.css';

// Truncates description text not more than 150 words
function truncate(str,n){
    return str?.length > n ? `${str.substring(0, n)}...` : str; 
}

function Banner(){
    const [movie, setMovie] = useState();

    useEffect(()=>{
        async function fetchData(){
        const response = await axios.get(requests.fetchNetflixOriginals);
        setMovie(response.data.results[Math.floor(Math.random() * response.data.results.length)])
        }
        fetchData();
    },[])

    return( 
    <header className="banner" 
    style={{backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
    backgroundSize:"cover",
    backgroundPosition: "center center"}}
    >
        <div className="banner__contents">
            <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>
            <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
        </div>
        <div className="banner--fadeBottom"></div>
    </header>
    )
}

export default Banner;