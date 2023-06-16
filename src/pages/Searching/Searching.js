//Import packages
import React, {useContext}  from 'react';
import {useParams} from "react-router-dom";

//Import context
import {confirmContext} from "../../context/ConfirmWindowProvider/ConfirmWindowProvider";

//Import components
import SearchResult from "../../components/SearchResult/SearchResult";
import NavBar from "../../components/NavBar/NavBar";



function Searching() {
    const { confirmWindow } = useContext(confirmContext)
    const { id } = useParams();

    return (
        <>
            <NavBar/>
            {confirmWindow}
            <h3>SEARCH RESULTS FOR <strong>"{ id.toUpperCase() }"</strong></h3>

            <SearchResult result={id}/>
            <SearchResult result={id}/>
        </>
    );
};

export default Searching;