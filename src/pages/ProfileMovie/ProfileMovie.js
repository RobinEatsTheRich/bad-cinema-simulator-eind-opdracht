//Import packages
import React, {useContext} from 'react';
import {Link, useParams} from "react-router-dom";

//Import Context
import {confirmContext} from "../../context/ConfirmWindowProvider/ConfirmWindowProvider";

//Import components
import Button from "../../components/Button/Button";
import NavBar from "../../components/NavBar/NavBar";



function ProfileMovie() {
    const { confirmWindow, PlaceConfirmWindow } = useContext(confirmContext)
    const { id } = useParams();

    return (
        <>
            <NavBar/>
            {confirmWindow}
            <img src="https://cdn.marvel.com/content/1x/across_the_spider-verse.jpg" alt="The Movie poster"/>
            <article>
                <div className="titleAndYear">
                    <h1>{id}: SPIDER-MAN: ACROSS THE SPIDER-VERSE</h1>
                    <p>2023</p>
                </div>
                <div className="castField">
                    <p>Directed by:</p>
                    <ul>
                        <li>
                            <Link to="/profile_cast/11">
                                Joaquim Dos Santos
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile_cast/11">
                                Justin K. Thompson
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="castField">
                    <p>Cast:</p>
                    <ul>
                        <li>
                            <Link to="/profile_cast/11">
                                Shameik Moore
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile_cast/11">
                                Hailee Steinfeld
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile_cast/11">
                                Brian Tyree Henry
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile_cast/11">
                                Luna Lauren Velez
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile_cast/11">
                                Jake Johnson
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile_cast/11">
                                Oscar Isaac
                            </Link>
                        </li>
                    </ul>
                </div>
                <Button
                    onClick={() => {PlaceConfirmWindow()}}
                >
                    <img src="" alt="Watch Button"/>
                </Button>
            </article>
        </>
    );
};

export default ProfileMovie;