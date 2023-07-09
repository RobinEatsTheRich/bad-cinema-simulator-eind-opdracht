import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AccountContext} from "../../context/Account/AccountProvider";
import axios from "axios";

function Cinema() {
    const { id } = useParams();
    const { tmdbKey, rapidKey } = useContext(AccountContext)
    const [ movieData, setMovieData ] = useState([])
    const [ reviewData, setReviewData ] = useState([
        //Temporary reviewData since my limit for the site is almost reached
        {
            "Title": "wow this sucks",
            "text": "whatever"
        },
        {
            "Title": "Actually I kinda like it?",
            "text": "whatever"
        },
        {
            "Title": "This truly changed my life",
            "text": "whatever"
        },
        {
            "Title": "bad",
            "text": "whatever"
        },
        {
            "Title": "I really hope the director is in therapy",
            "text": "whatever"
        }
    ])
    let elementNumber = 0;

    //These are all the Reviews text bubbles
    const [ textBubble1, setTextBubble1 ] = useState(<></>)
    const [ textBubble2, setTextBubble2 ] = useState(<></>)
    const [ textBubble3, setTextBubble3 ] = useState(<></>)
    const [ textBubble4, setTextBubble4 ] = useState(<></>)


    useEffect(() => {
        const fetchOptionsTmdb = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${tmdbKey}`
            }
        }
        async function fetchMovieData() {
            try {
                const result = await axios.get(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, fetchOptionsTmdb);
                setMovieData(result.data);
            } catch (e) {
                console.error(e);
            }
        }
        void fetchMovieData();
    }, [tmdbKey, id]);

    //This useEffect fetches the REAL reviews
    // useEffect(() => {
    //     const fetchOptions = {
    //         method: 'GET',
    //         url: `https://cinema-api.p.rapidapi.com/get_reviews/${movieData.imdb_id}`,
    //         headers: {
    //             'X-RapidAPI-Key': rapidKey,
    //             'X-RapidAPI-Host': 'cinema-api.p.rapidapi.com'
    //         }
    //     }
    //     async function fetchReviewData() {
    //         try {
    //             const result = await axios.request(fetchOptions);
    //             setReviewData(result.data.data);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }
    //
    //     void fetchReviewData();
    // }, [movieData, rapidKey, id]);


    function setReview() {
        let randomHeckling = reviewData[Math.floor(Math.random() * reviewData.length)].Title

        setTimeout(()=>{
            if (elementNumber >= 4) {
                elementNumber = 0;
            } else {
                switch (elementNumber) {
                    case 0:
                        console.log(elementNumber + " is:")
                        console.log(randomHeckling)
                        setTextBubble1(randomHeckling)
                        break;
                    case 1:
                        console.log(elementNumber + " is:")
                        console.log(randomHeckling)
                        setTextBubble2(randomHeckling)
                        break;
                    case 2:
                        console.log(elementNumber + " is:")
                        console.log(randomHeckling)
                        setTextBubble3(randomHeckling)
                        break;
                    case 3:
                        console.log(elementNumber + " is:")
                        console.log(randomHeckling)
                        setTextBubble4(randomHeckling)
                        break;
                    default:
                        break;
                }
                elementNumber++
            }
        }, Math.random() * 20000 + 1000)
    }

    //Thank you Jordy for helping me out with this snippet!
    useEffect(() => {
        // interval for random movie tile every 10 seconds
        const randomMovieTile = setInterval(() => {setReview()}, 2000)

        // clear interval on unmount
        return () => {
            clearInterval(randomMovieTile)
        }
    }, [])



    return (
        <>
            { (Object.keys(reviewData).length > 0) &&
                <>
                    <h2>Now watching: {movieData.original_title}</h2>
                    <div className="heckleContainer">
                        <p>{textBubble1}</p>
                    </div>
                    <div className="heckleContainer">
                        <p>{textBubble2}</p>
                    </div>
                    <div className="heckleContainer">
                        <p>{textBubble3}</p>
                    </div>
                    <div className="heckleContainer">
                        <p>{textBubble4}</p>
                    </div>

                </>
            }
        </>
    );
}


export default Cinema;