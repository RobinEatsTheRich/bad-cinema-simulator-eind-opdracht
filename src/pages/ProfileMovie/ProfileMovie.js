//Import packages
import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

//Import Context
import {confirmContext} from "../../context/ConfirmWindowProvider/ConfirmWindowProvider";

//Import components
import Button from "../../components/Button/Button";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import {AccountContext} from "../../context/Account/AccountProvider";



function ProfileMovie() {
    const { id } = useParams();
    const { confirmWindow, PlaceConfirmWindow } = useContext(confirmContext)
    const { apiKey } = useContext(AccountContext)
    const [ movieData, setMovieData ] = useState([])
    const [ castData, setCastData ] = useState([])

    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        }
        async function fetchMovieData() {
            try {
                const result = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, fetchOptions);
                setMovieData(result.data);
            } catch (e) {
                console.error(e);
            }
        }
        async function fetchCastData() {
            try {
                const result = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, fetchOptions);
                setCastData(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchMovieData();
        void fetchCastData();
    }, [apiKey, id]);

    return (
        <>
            <NavBar/>
            { movieData.poster_path && castData.cast &&
                <>
                    {confirmWindow}
                    <img src={`https://www.themoviedb.org/t/p/original/${movieData.poster_path}`}
                         alt={`The poster for ${movieData.original_title}`}/>
                    <article>
                        <div className="titleAndYear">
                            <h1>{movieData.original_title.toUpperCase()}</h1>
                            <p>{movieData.release_date.slice(0, 4)}</p>
                        </div>
                        <div className="castField">
                            <p>Directed by:</p>
                            <ul>
                                {castData.crew.map((castMember) =>
                                    {
                                        if(castMember.job === "Director"){
                                            return(
                                            <li
                                                key={`cast_${castMember.id}`}
                                            >
                                                <Link to={`/profile_cast/${castMember.id}`}>
                                                    {castMember.name}
                                                </Link>
                                            </li>
                                            )
                                        }
                                    }
                                )}
                            </ul>
                        </div>
                        <div className="castField">
                            <p>Cast:</p>
                            <ul>
                                {castData.cast.map((castMember) =>
                                    <li
                                    key={`cast_${castMember.id}`}
                                    >
                                        <Link to={`/profile_cast/${castMember.id}`}>
                                            {castMember.name}
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <Button
                            onClick={() => {PlaceConfirmWindow(movieData)}}
                        >
                            <img src="" alt="Watch Button"/>
                        </Button>
                    </article>
                </>
            }
        </>
    );
}

export default ProfileMovie;