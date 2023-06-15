import React from 'react';
import {useParams} from "react-router-dom";

import SearchResult from "../../components/SearchResult/SearchResult";

function Searching() {
    const { id } = useParams();

    return (
        <>
            <h3>SEARCH RESULTS FOR <strong>"{ id.toUpperCase() }"</strong></h3>

            <SearchResult result={id}/>
            <SearchResult result={id}/>
        </>
    );
};

export default Searching;