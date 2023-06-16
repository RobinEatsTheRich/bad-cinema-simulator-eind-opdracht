import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button/Button";

export const confirmContext = createContext(null);

function ConfirmWindowContextProvider({children}) {

    const [confirmWindow, setConfirmWindow] = useState("Chuck");

    function PlaceConfirmWindow({movie}) {
        const navigate = useNavigate();
        setConfirmWindow("Balls")
        // setConfirmWindow(() =>
        //     {
        //         return (
        //             <>
        //                 <article className="confirmWindow">
        //                     <figure>
        //                         <img src="https://cdn.marvel.com/content/1x/across_the_spider-verse.jpg"
        //                              alt="The poster for Across the spider-verse"/>
        //                     </figure>
        //                     <Button
        //                         onClick={() => setConfirmWindow(<></>)}
        //                     >
        //                         <img src="" alt="X"/>
        //                     </Button>
        //                     <Button
        //                         onClick={() => navigate(`/cinema/11`)}
        //                     >
        //                         <img src="" alt="X"/>
        //                     </Button>
        //                 </article>
        //                 <div className="shadow"/>
        //             </>
        //         )
        //     }
        // );
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