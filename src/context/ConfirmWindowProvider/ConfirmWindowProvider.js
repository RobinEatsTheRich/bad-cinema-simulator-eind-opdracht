import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";

export const confirmContext = createContext(null);

function ConfirmWindowContextProvider({ children }) {

    const [confirmWindow, setConfirmWindow] = useState(<></>);
    const navigate = useNavigate();

    function PlaceConfirmWindow(movie) {
        setConfirmWindow(
            <>
                <article className="confirmWindow">
                    <h2>Watch this movie?</h2>
                    <figure>
                        <img src="https://cdn.marvel.com/content/1x/across_the_spider-verse.jpg"
                             alt="The poster for Across the spider-verse"/>
                    </figure>
                    <Button
                        onClick={() => setConfirmWindow(<></>)}
                    >
                        <img src="" alt="X"/>
                    </Button>
                    <Button
                        onClick={() => navigate(`/cinema/11`)}
                    >
                        Okay!
                    </Button>
                </article>
                <div className="shadow"/>
            </>
        );
    }

    const data = {
        confirmWindow,
        setConfirmWindow,
        PlaceConfirmWindow
    }

    return (
        <confirmContext.Provider value={data}>
            {children}
        </confirmContext.Provider>
    )
}

export default ConfirmWindowContextProvider;