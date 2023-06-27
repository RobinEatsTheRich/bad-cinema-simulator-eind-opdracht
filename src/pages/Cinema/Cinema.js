import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AccountContext} from "../../context/Account/AccountProvider";
import axios from "axios";

function Cinema() {
    const { id } = useParams();
    const { tmdbKey, rapidKey } = useContext(AccountContext)
    const [ movieData, setMovieData ] = useState([])
    const [ reviewData, setReviewData ] = useState([])

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
        const fetchOptionsRapid = {
            method: 'GET',
            url: `https://cinema-api.p.rapidapi.com/get_reviews/tt0118715`,
            headers: {
                'X-RapidAPI-Key': rapidKey,
                'X-RapidAPI-Host': 'cinema-api.p.rapidapi.com'
            }
        }
        async function fetchReviewData() {
            try {
                const result = await axios.request(fetchOptionsRapid);
                console.log(result)
                setReviewData(result.data.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchMovieData();
        void fetchReviewData()
    }, [tmdbKey, rapidKey, id]);

    useEffect(() => {
        console.log("Movie Data:")
        console.log(movieData)

        console.log("Review Data:")
        console.log(reviewData)
    }, [reviewData]);


    return (
        <>
            { movieData.original_title &&
            <>
                <h2>Now watching: {movieData.original_title}</h2>

            </>
            }
        </>
    );
};

export default Cinema;