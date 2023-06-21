import React from 'react';
import {Link} from "react-router-dom";

function HighlightPoster({ movieData }) {
    return (
        <>
        { movieData &&
            <Link to={`/profile_movie/${movieData.id}`}>
                <figure>
                    <img
                        src={`https://www.themoviedb.org/t/p/original/${movieData.poster_path}`}
                        alt={`The poster for ${movieData.original_title}`}/>
                </figure>
                <p>{movieData.original_title.toUpperCase()}</p>
            </Link>
        }
        </>
    );
}

export default HighlightPoster;