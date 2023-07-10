import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AccountContext} from "../../context/Account/AccountProvider";
import axios from "axios";
import "./Cinema.css"

//Import SVG's
import exitSign from "../../assets/cinema art/exit-sign.svg"
import cinemaScene from "../../assets/cinema art/full-cinema.svg"




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
        },
        {
            "Title": "Did you hear that MUSIC tho",
            "text": "whatever"
        },
        {
            "Title": "Hm..",
            "text": "whatever"
        },
        {
            "Title": "No you guys it's good I swear",
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

    function setCSSCords( id ){
        const randVertical = Math.floor(Math.random() * 15 + 50 )
        const randHorizontal = Math.floor(Math.random() * 62 + 10 )
        document.documentElement.style.setProperty(`--top${id}`, `${randVertical}%`)
        document.documentElement.style.setProperty(`--left${id}`, `${randHorizontal}%`)
    }
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
                        setCSSCords(1)
                        setTextBubble1(randomHeckling)
                        break;
                    case 1:
                        console.log(elementNumber + " is:")
                        console.log(randomHeckling)
                        setCSSCords(2)
                        setTextBubble2(randomHeckling)
                        break;
                    case 2:
                        console.log(elementNumber + " is:")
                        console.log(randomHeckling)
                        setCSSCords(3)
                        setTextBubble3(randomHeckling)
                        break;
                    case 3:
                        console.log(elementNumber + " is:")
                        console.log(randomHeckling)
                        setCSSCords(4)
                        setTextBubble4(randomHeckling)
                        break;
                    default:
                        break;
                }
                elementNumber++
            }
        }, Math.random() * 20000 + 4000)
    }

    //Thank you Jordy for helping me out with this snippet!
    useEffect(() => {
        const randomMovieTile = setInterval(() => {setReview()}, 3000)

        // clear interval on unmount
        return () => {
            clearInterval(randomMovieTile)
        }
    }, [])



    return (
        <>
            { (Object.keys(reviewData).length > 0) &&
                <>
                    <div className="overlays">
                        <h2>Now watching: {movieData.original_title}</h2>
                        <div
                            className="heckleContainer1"
                            key={`${textBubble1}1`}
                        >
                            <p className="heckle1" >{textBubble1}</p>
                            <div className="speechLine"/>
                        </div>
                        <div
                            className="heckleContainer2"
                            key={`${textBubble2}2`}
                        >
                            <p className="heckle2" >{textBubble2}</p>
                            <div className="speechLine"/>
                        </div>
                        <div
                            className="heckleContainer3"
                            key={`${textBubble3}3`}
                        >
                            <p className="heckle3" >{textBubble3}</p>
                            <div className="speechLine"/>
                        </div>
                        <div
                            className="heckleContainer4"
                            key={`${textBubble4}4`}
                        >
                            <p className="heckle4" >{textBubble4}</p>
                            <div className="speechLine"/>
                        </div>
                        <a href="/highlights">
                            <img
                                className="exitSign"
                                src={exitSign}
                                alt="oops no exit :)"/>
                        </a>
                    </div>
                    <div className="cinemaArt">
                        <img
                            className="walls"
                            src={cinemaScene}
                            alt="oops no walls"/>
                    </div>
    
                </>
            }
        </>
    );
}


export default Cinema;