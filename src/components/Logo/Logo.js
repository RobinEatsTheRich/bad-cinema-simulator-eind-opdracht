import React from 'react';
import {Link} from "react-router-dom";
function Logo() {


    return (
        <Link to="/highlights">
            <h2>B C S</h2>
            <p>Bad Cinema Simulator</p>
        </Link>
    );
}
export default Logo;