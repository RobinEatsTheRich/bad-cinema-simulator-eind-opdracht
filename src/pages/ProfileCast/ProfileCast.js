import React from 'react';
import {useParams} from "react-router-dom";

function ProfileCast() {
    const { id } = useParams();

    return (
        <>
            <h2>ProfileCast/{[id]}</h2>
        </>
    );
};

export default ProfileCast;