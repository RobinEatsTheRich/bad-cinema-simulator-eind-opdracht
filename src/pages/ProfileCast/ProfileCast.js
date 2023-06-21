//Import packages
import React, {useContext, useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";

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
    const { apiKey } = useContext(AccountContext)
    const [ castData, setCastData ] = useState([])
    const [ creditData, setCreditData ] = useState([])

    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
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
                {result.data.crew.map((movie) => {
                        if(movie.job === "Director"){
                            result.data.cast.push(movie)
                        }
                    }
                )}
                result.data.cast.sort(( a, b ) => (a.release_date < b.release_date))
                setCreditData(result.data.cast);
                console.log(result.data.cast)
            } catch (e) {
                console.error(e);
            }
        }

        void fetchCastData();
        void fetchCreditData();
    }, [apiKey, id]);

    return (
        <>
            <NavBar/>
            { castData.name && creditData &&
                <>
                    {confirmWindow}
                    <figure className="icon">
                        <img
                            src={`https://image.tmdb.org/t/p/original${castData.profile_path}`}
                            alt={`A picture of ${castData.name}`}/>
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
                                type="movie"
                            />
                        )}
                    </div>

                </>
            }
        </>
    );
};

export default ProfileCast;