import React from 'react';
import {Link} from "react-router-dom";
function NavBar() {


    return (
        <nav>
            <Link to="/">Sign in</Link>
            <Link to="/sign_up">Sign up</Link>
            <Link to="/cinema/11">Cinema</Link>
            <Link to="/highlights">Highlights</Link>
            <Link to="/profile_cast/11">Cast Profile</Link>
            <Link to="/profile_movie/11">Movie Profile</Link>
            <Link to="/searching/11">Searching</Link>

        </nav>
    );
}
export default NavBar;