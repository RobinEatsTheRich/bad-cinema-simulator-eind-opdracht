import React from 'react';
import {useParams} from "react-router-dom";

function Cinema() {
    const { id } = useParams();

    return (
        <>
            <h2>Cinema/{[id]}</h2>
        </>
    );
};

export default Cinema;