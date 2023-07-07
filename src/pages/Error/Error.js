import React from 'react';
import {Link} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

function Error() {

    return (
        <>
            <NavBar/>
            <div className="pageFrame">
                <h1 className="errorMessage">4 0 4</h1>
                <p>Nothing of value was found here...</p>
                <p>click <Link
                    to="/highlights"
                    className="accentText"
                >here <
                /Link>
                    to go back to the home page.</p>
            </div>
        </>
    );
};

export default Error;