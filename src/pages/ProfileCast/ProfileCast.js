//Import packages
import React, {useContext} from 'react';
import {useParams} from "react-router-dom";

//Import Context
import {confirmContext} from "../../context/ConfirmWindowProvider/ConfirmWindowProvider";

//Import Components
import NavBar from "../../components/NavBar/NavBar";



function ProfileCast() {
    const { confirmWindow } = useContext(confirmContext)
    const { id } = useParams();

    return (
        <>
            <NavBar/>
            {confirmWindow}
            <h2>ProfileCast/{[id]}</h2>
        </>
    );
};

export default ProfileCast;