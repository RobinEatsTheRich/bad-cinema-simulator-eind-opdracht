import React from 'react';
import {Link} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import "./Error.css"

function Error() {

    return (
        <>
            <NavBar/>
            <main className="pageFrame">
                <h1 className="errorMessage">404</h1>
                <p>Nothing of value was found here...</p>
                <p>click <Link
                    to="/highlights"
                    className="softButton"
                >here <
                /Link>
                    to go back to the home page.</p>
            </main>
        </>
    );
};

export default Error;