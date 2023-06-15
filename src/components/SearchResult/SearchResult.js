import React from 'react';
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";

function SearchResult( result ) {
    const navigate = useNavigate();

    // if (id > 1){
        return (
            <Button className="searchResult">
                <figure>
                    <img src="" alt={`Poster for ${result}`}/>
                </figure>
                <div className="titleAndYear">
                    <h1>SPIDER-MAN: ACROSS THE SPIDER-VERSE</h1>
                    <p>2022</p>
                </div>
                <Button
                    onClick={()=>navigate(`/cinema/${result}`)}
                    >
                    <img src="" alt="Watch Button"/>
                </Button>
            </Button>
        );
    // }
    // else{
    //     return (
    //         <Button className="searchResult">
    //             <img src="" alt='Cast Star'/>
    //             <h1>EMILY BLUNT</h1>
    //         </Button>
    //     );
    // }
}

export default SearchResult;