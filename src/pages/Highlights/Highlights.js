//Import Packages
import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import "./Highlights.css"

//Import Components
import HighlightPoster from "../../components/HighlightPoster/HighlightPoster";
import NavBar from "../../components/NavBar/NavBar";

//Import Context
import {AccountContext} from "../../context/Account/AccountProvider";



function Highlights() {

    const { tmdbKey } = useContext(AccountContext)
    const [ popularMovieData, setPopularMovieData ] = useState([])

    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${tmdbKey}`
            }
        }
        async function fetchHighlightData() {
            try {
                const result = await axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc', fetchOptions);
                setPopularMovieData(result.data.results);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchHighlightData();
    }, []);

    return (
        <>
            <NavBar/>
            <h3>NOW IN CINEMAS</h3>
            <article className="postersContainer">
                <HighlightPoster movieData={popularMovieData[0]}/>
                <HighlightPoster movieData={popularMovieData[1]}/>
                <HighlightPoster movieData={popularMovieData[2]}/>
                <HighlightPoster movieData={popularMovieData[3]}/>
                <HighlightPoster movieData={popularMovieData[4]}/>
                <HighlightPoster movieData={popularMovieData[5]}/>
                <HighlightPoster movieData={popularMovieData[6]}/>
                <HighlightPoster movieData={popularMovieData[7]}/>

            </article>
        </>
    );
}

export default Highlights;