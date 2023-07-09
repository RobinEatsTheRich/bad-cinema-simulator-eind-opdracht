import React from 'react';
import {Link} from "react-router-dom";
import "./Logo.css"
function Logo() {


    return (
        <Link to="/highlights"
        className="logo">
            <h1 className="logoText" >BCS</h1>
            <p>Bad Cinema Simulator</p>
        </Link>
    );
}
export default Logo;