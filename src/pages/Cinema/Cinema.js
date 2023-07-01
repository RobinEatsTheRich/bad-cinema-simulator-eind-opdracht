import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AccountContext} from "../../context/Account/AccountProvider";
import axios from "axios";

function Cinema() {
    const { id } = useParams();
    const { tmdbKey, rapidKey } = useContext(AccountContext)
    const [ movieData, setMovieData ] = useState([])
    const [ reviewData, setReviewData ] = useState([])

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
    // }, [movieData.imdb_id, rapidKey, id]);


    useEffect(() => {
        console.log(movieData)
        console.log("Review Data:")
        console.log(reviewData)
    }, [movieData, reviewData]);

    // function content() {
    //     return(
    //         <div className="review">
    //             <p>
    //                 {reviewData[
    //                     Math.floor(Math.random() * reviewData.length)
    //                     ].title}
    //             </p>
    //         </div>
    //     )
    // }
    // async function summonReviews() {
    //     let elementNumber = 0;
    //     async function sleepTimer(){
    //         await new Promise(r => setTimeout(r, (Math.random() * 10000 + 5000)));
    //     }
    //     while(elementNumber > 0) {
    //         void sleepTimer()
    //         if(elementNumber >= 4){
    //             elementNumber = 0;
    //         } else{
    //             switch (elementNumber) {
    //                 case 0:
    //                     setTextBubble1(content())
    //                     break;
    //                 case 1:
    //                     setTextBubble2(content())
    //                     break;
    //                 case 2:
    //                     setTextBubble3(content())
    //                     break;
    //                 case 3:
    //                     setTextBubble4(content())
    //                     break;
    //                 default:
    //                     break;
    //             }
    //             elementNumber++
    //         }
    //     }
    // }
    //
    // //getting the party started
    // useEffect(() => {
    //     void summonReviews();
    // },[]);

    return (
        <>
            { movieData.original_title &&
                <>
                    <h2>Now watching: {movieData.original_title}</h2>
                    {textBubble1}
                    {textBubble2}
                    {textBubble3}
                    {textBubble4}

                </>
            }
        </>
    );
}

export default Cinema;