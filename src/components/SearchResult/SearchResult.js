//Import packages
import React, {useContext} from 'react';
import "./SearchResult.css"

//Import Context
import {newWindowContext} from "../../context/newWindowProvider/newWindowProvider";

//Import Components
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";



function SearchResult({ result, queryType}) {

    const { PlaceConfirmWindow } = useContext(newWindowContext)
    const navigate = useNavigate();

    if (queryType === "movie"){
        return (
            <article className="searchResult">
                <a
                    className="movieLink"
                    href={`/profile_movie/${result.id}`}
                >
                    <figure className= {result.poster_path ? "searchPoster" : "noPoster"}
                    >
                        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${result.poster_path}`}
                             alt={`No picture available :V`}
                        />
                    </figure>
                    <div className="titleAndYear">
                        <h1>{result.title.toUpperCase()}</h1>
                        <h2>{result.release_date.slice(0, 4)}</h2>
                    </div>
                </a>
                <Button
                    className="searchResultWatchButton"
                    onClick={() => {PlaceConfirmWindow(result)}}
                    >
                    <img src="" alt="Watch Button"/>
                </Button>
            </article>
        );
    }
    else{
        return (
            <a
                className="castSearchResult"
                href={`/profile_cast/${result.id}`}
            >
                <figure className= {result.profile_path ? "searchPoster" : "noPoster"}>
                    <img
                        src={`https://image.tmdb.org/t/p/original${result.profile_path}`}
                        alt={`A profile picture of ${result.name}`}
                    />
                </figure>
                <h1>{result.name.toUpperCase()}</h1>
            </a>
        );
    }
}

export default SearchResult;