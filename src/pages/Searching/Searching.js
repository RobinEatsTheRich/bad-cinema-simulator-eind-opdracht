import React from 'react';
import {useParams} from "react-router-dom";

function Searching() {
    const { id } = useParams();

    return (
        <>
            <h2>Searching/{[id]}</h2>
        </>
    );
};

export default Searching;