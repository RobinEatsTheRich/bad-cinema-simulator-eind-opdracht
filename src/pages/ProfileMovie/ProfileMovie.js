//Import packages
import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import "./ProfileMovie.css"

//Import Context
import {newWindowContext} from "../../context/newWindowProvider/newWindowProvider";

//Import components
import Button from "../../components/Button/Button";
import NavBar from "../../components/NavBar/NavBar";
import axios from "axios";
import {AccountContext} from "../../context/Account/AccountProvider";



function ProfileMovie() {
    const { id } = useParams();
    const { confirmWindow, PlaceConfirmWindow } = useContext(newWindowContext)
    const { tmdbKey } = useContext(AccountContext)
    const [ movieData, setMovieData ] = useState([])
    const [ castData, setCastData ] = useState([])

    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${tmdbKey}`
            }
        }
        //This fetches some general info about the movie, like year, name, poster, stuff like that.
        async function fetchMovieData() {
            try {
                const result = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, fetchOptions);
                setMovieData(result.data);
            } catch (e) {
                console.error(e);
            }
        }
        //This fetches a list of all the people who worked on it.
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
    }, [tmdbKey, id]);

    useEffect(()=>{
        console.log(movieData)
    },[movieData])

    return (
        <>
            <NavBar/>
            { movieData.title && castData.cast &&
                <>
                    {confirmWindow}
                    <div className="pageNoFrameMovie">
                        <figure className="bigPoster">
                            <img src={`https://www.themoviedb.org/t/p/original/${movieData.poster_path}`}
                                 alt=""
                            />
                        </figure>
                        <article className="restOfPage">
                            <div className="titleAndYear">
                                <h1>{movieData.title.toUpperCase()}</h1>
                                <h2>{movieData.release_date.slice(0, 4)}</h2>
                            </div>

                            {/*//////////////--Here are the directors.--//////////////*/}
                            <div className="castField">
                                <h2>Directed by:</h2>
                                <ul className="castList">
                                    {castData.crew.map((castMember) =>
                                        {
                                            if(castMember.job === "Director"){
                                                return(
                                                <li
                                                    className="castListItem"
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

                            {/*//////////////--And here are the actors.--//////////////*/}
                            <div className="castField">
                                <h2>Cast:</h2>
                                <ul className="castList">
                                    {castData.cast.map((castMember) =>
                                        <li
                                            className="castListItem"
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
                                <img src="" alt="Watch"/>
                            </Button>
                        </article>
                    </div>
                </>
            }
        </>
    );
}

export default ProfileMovie;