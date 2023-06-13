import React from 'react';
import {useParams} from "react-router-dom";

function ProfileMovie() {
    const { id } = useParams();

    return (
        <>
            <h2>ProfileMovie/{[id]}</h2>
        </>
    );
};

export default ProfileMovie;