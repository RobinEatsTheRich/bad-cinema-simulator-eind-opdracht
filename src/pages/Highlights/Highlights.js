import React from 'react';

//import components
import HighlightPoster from "../../components/HighlightPoster/HighlightPoster";
import NavBar from "../../components/NavBar/NavBar";

function Highlights() {

    return (
        <>
            <NavBar/>
            <h3>NOW IN CINEMAS</h3>
            <article className="postersContainer">
                <HighlightPoster/>
                <HighlightPoster/>
                <HighlightPoster/>
                <HighlightPoster/>
                <HighlightPoster/>
                <HighlightPoster/>
                <HighlightPoster/>
                <HighlightPoster/>

            </article>
        </>
    );
};

export default Highlights;