import React from 'react';
import {Link} from "react-router-dom";
import "./HighlightPoster.css"

function HighlightPoster({ movieData }) {
    return (
        <>
        { movieData &&
            <Link
                className="highLightPoster"
                to={`/profile_movie/${movieData.id}`}
            >
                <figure>
                    <img
                        src={`https://www.themoviedb.org/t/p/original/${movieData.poster_path}`}
                        alt={`The poster for ${movieData.title}`}/>
                </figure>
                <p>{movieData.title.toUpperCase()}</p>
            </Link>
        }
        </>
    );
}

export default HighlightPoster;