import React from 'react';
import {Link} from "react-router-dom";

function HighlightPoster() {
    return (
        <Link to="/profile_movie/11">
            <figure>
                <img src="https://cdn.marvel.com/content/1x/across_the_spider-verse.jpg" alt="The poster for Across the spider-verse"/>
            </figure>
            <p>SPIDER-MAN: ACROSS THE SPIDER-VERSE</p>
        </Link>
    );
}

export default HighlightPoster;