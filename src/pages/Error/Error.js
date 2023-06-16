import React from 'react';
import {Link} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

function Error() {

    return (
        <>
            <NavBar/>
            <h1>4 0 4</h1>
            <p>Nothing of value was found here</p>
            <p>click <Link to="/highlights">here</Link> to go back to the home page.</p>
        </>
    );
};

export default Error;