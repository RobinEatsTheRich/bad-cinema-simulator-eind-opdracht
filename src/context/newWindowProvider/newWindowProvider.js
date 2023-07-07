import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";

export const newWindowContext = createContext(null);

function NewWindowContextProvider({ children }) {

    const [confirmWindow, setConfirmWindow] = useState(<></>);
    const navigate = useNavigate();

    function PlaceConfirmWindow( movieData ) {
        console.log("hey I'm doing something")
        setConfirmWindow(
            <>
                <article className="confirmWindow">
                    <h2>Watch this movie?</h2>
                    <figure>
                        <img src={`https://www.themoviedb.org/t/p/original/${movieData.poster_path}`}
                             alt={`The poster for ${movieData.original_title}`}/>
                    </figure>
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
        <newWindowContext.Provider value={data}>
            {children}
        </newWindowContext.Provider>
    )
}

export default NewWindowContextProvider;