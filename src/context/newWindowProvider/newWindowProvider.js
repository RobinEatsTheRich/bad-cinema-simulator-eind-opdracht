import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";
import"./newWindowProvider.css"

export const newWindowContext = createContext(null);

function NewWindowContextProvider({ children }) {

    const [confirmWindow, setConfirmWindow] = useState(<></>);
    const navigate = useNavigate();

    function PlaceConfirmWindow( movieData ) {
        console.log("hey I'm doing something")
        setConfirmWindow(
            <div className="confirmWindowContainer">
                <article className="confirmWindow">
                    <h2 className="formHeader" >Watch this movie?</h2>
                    <figure className= {movieData.poster_path ? "searchPoster" : "noPoster"}>
                        <img src={`https://www.themoviedb.org/t/p/original/${movieData.poster_path}`}
                             alt={`${movieData.title}`}/>
                    </figure>
                    <div className="buttonRow">
                        <Button
                            onClick={() => setConfirmWindow(<></>)}
                        >
                            <img src="" alt="X"/>
                        </Button>
                        <Button
                            onClick={() => navigate(`/cinema/${movieData.id}`)}
                        >
                            Okay!
                        </Button>
                    </div>
                </article>
                <div className="shadow"/>
            </div>
        );
    }

    const data = {
        confirmWindow,
        setConfirmWindow,
        PlaceConfirmWindow
    }

    return (
        <newWindowContext.Provider value={data}>
            {children}
        </newWindowContext.Provider>
    )
}

export default NewWindowContextProvider;