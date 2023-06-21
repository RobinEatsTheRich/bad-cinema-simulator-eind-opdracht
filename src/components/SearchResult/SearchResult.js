//Import packages
import React, {useContext} from 'react';

//Import Context
import {confirmContext} from "../../context/ConfirmWindowProvider/ConfirmWindowProvider";

//Import Components
import Button from "../Button/Button";
import {useNavigate} from "react-router-dom";



function SearchResult() {

    const { PlaceConfirmWindow } = useContext(confirmContext)
    const navigate = useNavigate();


    // if (result === "movie"){
        return (
            <Button
                className="searchResult"
                onClick={() => {navigate(`/profile_movie/11`)}}
            >
                <figure>
                    <img src="" alt={`Poster for 11`}/>
                </figure>
                <div className="titleAndYear">
                    <h1>SPIDER-MAN: ACROSS THE SPIDER-VERSE</h1>
                    <p>2022</p>
                </div>
                <Button
                    onClick={() => {PlaceConfirmWindow()}}
                    >
                    <img src="" alt="Watch Button"/>
                </Button>
            </Button>
        );
    // }
    // else{
    //     return (
    //         <Button
    //             className="searchResult"
    //             onClick={navigate(`/profile_cast/:${result}`)}
    //         >
    //             <img src="" alt='Cast Star'/>
    //             <h1>EMILY BLUNT</h1>
    //         </Button>
    //     );
    // }
}

export default SearchResult;