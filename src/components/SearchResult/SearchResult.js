//Import packages
import React, {useContext} from 'react';

//Import Context
import {confirmContext} from "../../context/ConfirmWindowProvider/ConfirmWindowProvider";

//Import Components
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";



function SearchResult({ result, queryType}) {

    const { PlaceConfirmWindow } = useContext(confirmContext)
    const navigate = useNavigate();

    if (queryType === "movie"){
        return (
            <article className="searchResult">
                <Button
                    onClick={() => {navigate(`/profile_movie/${result.id}`)}}
                >
                    <figure>
                        <img src={`https://www.themoviedb.org/t/p/w440_and_h660_face/${result.poster_path}`}
                             alt={`The poster for ${result.original_title}`}/>
                    </figure>
                    <div className="titleAndYear">
                        <h1>{result.original_title.toUpperCase()}</h1>
                        <p>{result.release_date.slice(0, 4)}</p>
                    </div>
                </Button>
                <Button
                    onClick={() => {PlaceConfirmWindow(result)}}
                    >
                    <img src="" alt="Watch Button"/>
                </Button>
            </article>
        );
    }
    else{
        return (
            <Button
                className="searchResult"
                onClick={() => {navigate(`/profile_movie/${result.id}`)}}
            >
                <img
                    src={`https://image.tmdb.org/t/p/original${result.profile_path}`}
                    alt={`A profile picture of ${result.name}`}
                />
                <h1>{result.name.toUpperCase()}</h1>
            </Button>
        );
    }
}

export default SearchResult;