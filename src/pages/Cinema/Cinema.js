import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {AccountContext} from "../../context/Account/AccountProvider";
import axios from "axios";
import "./Cinema.css"

//Import SVG's
import exitSign from "../../assets/cinema art/exit-sign.svg"
import cinemaScene from "../../assets/cinema art/full-cinema.svg"
import bigThreeDeeGlasses from "../../assets/cinema art/vision obstructions/big3dGlasses.svg"
import bigHat from "../../assets/cinema art/vision obstructions/bigHat.svg"
import bigStache from "../../assets/cinema art/vision obstructions/bigStache.svg"
import bigSunGlasses from "../../assets/cinema art/vision obstructions/bigSunGlasses.svg"

//Import animations
import actionGif from "../../assets/screen-animations/action.gif"
import comedyGif from "../../assets/screen-animations/comedy.gif"
import dramaGif from "../../assets/screen-animations/drama.gif"
import fantasyGif from "../../assets/screen-animations/fantasy.gif"
import horrorGif from "../../assets/screen-animations/horror.gif"
import sciFiGif from "../../assets/screen-animations/sci-fi.gif"
import Button from "../../components/Button/Button";


function Cinema() {
    const { id } = useParams();
    const { tmdbKey, rapidKey, accountData } = useContext(AccountContext)
    const [ movieData, setMovieData ] = useState([])
    const [ reviewData, setReviewData ] = useState([
        //Temporary reviewData for when your RapidAPI Fetch limit is (almost) reached:

        // {
        //     "Title": "wow this sucks",
        //     "text": "whatever"
        // },
        // {
        //     "Title": "Actually I kinda like it?",
        //     "text": "whatever"
        // },
        // {
        //     "Title": "This truly changed my life",
        //     "text": "whatever"
        // },
        // {
        //     "Title": "bad",
        //     "text": "whatever"
        // },
        // {
        //     "Title": "I really hope the director is in therapy",
        //     "text": "whatever"
        // },
        // {
        //     "Title": "Did you hear that MUSIC tho",
        //     "text": "whatever"
        // },
        // {
        //     "Title": "Hm..",
        //     "text": "whatever"
        // },
        // {
        //     "Title": "No you guys it's good I swear",
        //     "text": "whatever"
        // }
    ])

    let elementNumber = 0;
    const [ screenGif, setScreenGif ] = useState(dramaGif);
    const [ screenObstruction, setScreenObstruction] = useState(<></>)
    const [ snackSound, setSnackSound] = useState("*Cough cough*")
    const [ soundButtonText, setSoundButtonText] = useState("make a horrible sound")
    const [ snackSoundElement, setSnackSoundElement ] = useState(<></>)

    //These are all the Reviews text bubbles
    const [ textBubble1, setTextBubble1 ] = useState(<></>)
    const [ textBubble2, setTextBubble2 ] = useState(<></>)
    const [ textBubble3, setTextBubble3 ] = useState(<></>)
    const [ textBubble4, setTextBubble4 ] = useState(<></>)

    //Fetch the data of the movie through the page ID
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


    //Fetch reviews from that movie from the IMDB id of the Moviedata.
    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            url: `https://cinema-api.p.rapidapi.com/get_reviews/${movieData.imdb_id}`,
            headers: {
                'X-RapidAPI-Key': rapidKey,
                'X-RapidAPI-Host': 'cinema-api.p.rapidapi.com'
            }
        }
        async function fetchReviewData() {
            try {
                const result = await axios.request(fetchOptions);
                setReviewData(result.data.data);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchReviewData();
    }, [ movieData ]);

    //This function checks what the first genre of the movie is, and plays one of my animations that fits it :)
    function decideFakeMovie(){
        if(Object.keys(movieData).length > 0) {
            switch (movieData.genres[0].name) {
                case ("Science Fiction"):
                    setScreenGif(sciFiGif);
                    break;
                case ("Adventure" || "Fantasy"):
                    setScreenGif(fantasyGif);
                    break;
                case ("Action" || "War" || "Crime"):
                    setScreenGif(actionGif);
                    break;
                case ("Horror" || "Thriller"):
                    setScreenGif(horrorGif);
                    break;
                case ("Comedy" || "Family"):
                    setScreenGif(comedyGif);
                    break;
                default:
                    setScreenGif(dramaGif);
                    break;
            }
        }
    }

    //This checks your Icon to make an obnoxious filter through which to view the cinema.
    //It is a Bad Cinema Simulator after all.
    function decideScreenObstruction(){
        switch (accountData.userData.iconId) {
            case "1":
                setScreenObstruction(
                    <img
                    className="bigThreeDeeGlasses"
                    src={bigThreeDeeGlasses}
                    alt="The screen is obstructed by big 3D glasses!"/>
                );
                break;
            case "2":
                setScreenObstruction(
                    <img
                        className="bigHat"
                        src={bigHat}
                        alt="The screen is obstructed by a baseball cap!"/>
                );
                break;
            case "3":
                setScreenObstruction(
                    <img
                        className="bigStache"
                        src={bigStache}
                        alt="The screen is obstructed by a majestic moustache!"/>
                );
                break;
            case "4":
                setScreenObstruction(
                    <img
                        className="bigSunGlasses"
                        src={bigSunGlasses}
                        alt="The screen is obstructed by a big pair of sunglasses!"/>
                );
                break;
            default:
                setScreenObstruction(<></>);
                break;
        }
    }

    //These two function looks at your favourite snack and allows the user to partake of its noisy goodness in the cinema.
    function decideSnack(){
        switch (accountData.userData.snackId) {
            case "1":
                setSnackSound("*Gulp gulp gulp*")
                setSoundButtonText("Take a gulp")
                break;
            case "2":
                setSnackSound("*Craunch crunch cronch*")
                setSoundButtonText("Have some nachos")
                break;
            case "3":
                setSnackSound("*SHLRRRRHRRHHRRRRRLP*")
                setSoundButtonText("Take a sip")
                break;
            case "4":
                setSnackSound("*Chomp chrump crump*")
                setSoundButtonText("Eat some popcorn")
                break;
            default:
                setSnackSound("*Cough cough*")
                setSoundButtonText("Take a gulp")
                break;
        }
    }
    function placeSnackSoundEffect(){
        setSnackSoundElement(
            <h2 className="snackSound">{snackSound}</h2>
        )
        setTimeout(()=>{
            setSnackSoundElement(
                setSnackSoundElement(<></>)
            )
        }, 3000)
    }

    //These get the party started at the right moment.
    useEffect(()=>{
        if(Object.keys(movieData).length > 0) {
            decideFakeMovie()
        }
    },[movieData])
    useEffect(()=>{
        decideScreenObstruction()
        decideSnack()
    },[accountData])

    //This makes sure the Heckler-texts are randomly positioned.
    function setCSSCords( id ){
        const randVertical = Math.floor(Math.random() * 15 + 50 )
        const randHorizontal = Math.floor(Math.random() * 62 + 10 )
        document.documentElement.style.setProperty(`--top${id}`, `${randVertical}%`)
        document.documentElement.style.setProperty(`--left${id}`, `${randHorizontal}%`)
    }

    //And this is the cycle deciding which review should go to which box.
    function setReview() {
        let randomHeckling = reviewData[Math.floor(Math.random() * reviewData.length)].Title
        setTimeout(()=>{
            if (elementNumber >= 4) {
                elementNumber = 0;
            } else {
                switch (elementNumber) {
                    case 0:
                        setCSSCords(1)
                        setTextBubble1(randomHeckling)
                        break;
                    case 1:
                        setCSSCords(2)
                        setTextBubble2(randomHeckling)
                        break;
                    case 2:
                        setCSSCords(3)
                        setTextBubble3(randomHeckling)
                        break;
                    case 3:
                        setCSSCords(4)
                        setTextBubble4(randomHeckling)
                        break;
                    default:
                        break;
                }
                elementNumber++
            }
        }, Math.random() * 20000 + 5000)
    }

    //Thank you Jordy for helping me out with this snippet that gets the cycle going!
    useEffect(() => {
        const randomMovieTime = 0;
        if (reviewData.length > 0){
            setInterval(() => {setReview()}, 4000)

        }
        // clear interval on unmount
        return () => {
            clearInterval(randomMovieTime)
        }
    }, [reviewData])



    return (
        <>
            { (Object.keys(reviewData).length > 0) &&
                <>
                    <div className="overlays">
                        <div className="movieTitle">
                            <p>Now Watching:</p>
                            <h3>{movieData.title}</h3>
                        </div>
                        <div className="buttonContainer">
                            {snackSoundElement}
                            <Button
                                onClick={placeSnackSoundEffect}
                            >
                                {soundButtonText}
                            </Button>

                        </div>
                        <div className="obstructedVision">
                            {screenObstruction}
                        </div>
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
                        <a href={`/profile_movie/${movieData.id}`}>
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
                        <img
                            className="screen"
                            src={screenGif}
                            alt="oops no movie"/>
                    </div>
    
                </>
            }
        </>
    );
}


export default Cinema;