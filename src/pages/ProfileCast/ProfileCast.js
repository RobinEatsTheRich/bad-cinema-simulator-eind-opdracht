//Import packages
import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

//Import Context
import {confirmContext} from "../../context/ConfirmWindowProvider/ConfirmWindowProvider";

//Import Components
import NavBar from "../../components/NavBar/NavBar";
import SearchResult from "../../components/SearchResult/SearchResult";
import axios from "axios";
import {AccountContext} from "../../context/Account/AccountProvider";



function ProfileCast() {
    const { id } = useParams();
    const { confirmWindow } = useContext(confirmContext)
    const { tmdbKey } = useContext(AccountContext)
    const [ castData, setCastData ] = useState([])
    const [ creditData, setCreditData ] = useState([])

    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${tmdbKey}`
            }
        }
        async function fetchCastData() {
            try {
                const result = await axios.get(`https://api.themoviedb.org/3/person/${id}?language=en-US`, fetchOptions);
                setCastData(result.data);
            } catch (e) {
                console.error(e);
            }
        }
        async function fetchCreditData() {
            try {
                const result = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`, fetchOptions);
                //Here I pull out all the movies that the cast member has directed, and add them to the list of all the movies they've acted in.
                //I do this so cast members who have both acted and directed can still show both, even if their role on it isn't immediately clear.
                //But then again, that's not why people are using my application, so I think it doesn't hurt.
                result.data.crew.map((movie) => {
                    if(movie.job === "Director"){
                            result.data.cast.push(movie)
                        }
                    }
                )
                //Sorting chronologically
                result.data.cast.sort(( a, b ) => (a.release_date < b.release_date))
                setCreditData(result.data.cast);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchCastData();
        void fetchCreditData();
    }, [tmdbKey, id]);

    return (
        <>
            <NavBar/>
            { castData.name && creditData &&
                <>
                    {confirmWindow}
                    <figure className="icon">
                        <img
                            src={`https://image.tmdb.org/t/p/original${castData.profile_path}`}
                            alt={`A profile picture of ${castData.name}`}/>
                    </figure>
                    {/*I'm using this strange classname because the layout is identical to similarly named classes, saving in complexity*/}
                    <div className="titleAndYear">
                        <h1>{castData.name}</h1>
                        <p>Stars in:</p>
                    </div>
                    <div className="searchResults">
                        {creditData.map((movie) =>
                            <SearchResult
                                result={movie}
                                queryType="movie"
                            />
                        )}
                    </div>

                </>
            }
        </>
    );
}

export default ProfileCast;