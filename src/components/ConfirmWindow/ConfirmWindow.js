import React from 'react';
import {useNavigate} from "react-router-dom";

import Button from "../Button/Button";

function ConfirmWindow() {
    const navigate = useNavigate();

    return (
        <>
            <article className="confirmWindow">
                <figure>
                    <img src="https://cdn.marvel.com/content/1x/across_the_spider-verse.jpg" alt="The poster for Across the spider-verse"/>
                </figure>
                <Button
                    onClick={()=>!ConfirmWindow}
                >
                    <img src="" alt="X"/>
                </Button>
                <Button
                    onClick={()=>navigate(`/cinema/11`)}
                >
                    <img src="" alt="X"/>
                </Button>
            </article>
            <div className="shadow"/>
        </>
    );
}
export default ConfirmWindow;