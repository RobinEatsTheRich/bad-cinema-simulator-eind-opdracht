import React from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from "react-router-dom";


//import components
import Logo from "../Logo/Logo";
//import AccountWindow from "../AccountWindow/AccountWindow";



function NavBar() {
    //These are necessities for the packages.
    const {register, handleSubmit, watch } = useForm();
    const watchQuery = watch('searchQuery');
    const navigate = useNavigate();

    function onFormSubmit(data){
        navigate(`/searching/${data.searchQuery}`)
    }

    return (
        <nav>
            <div className="navCenterpiece">
                <Logo/>
                <form
                    className="searchBar"
                    onSubmit={handleSubmit(onFormSubmit)}>
                    <input
                        type="text"
                        id="searchQueryInput"
                        {...register("searchQuery")}
                    />
                    <div className="separator"/>
                    <button
                        type="submit"
                        disabled={!watchQuery}
                    >
                        <img src="../assets/looking_glass.png" alt="Search"/>
                    </button>
                </form>
            </div>
            <div className="navAccountThings">
                <Link to="/">Log Out</Link>
                <button
                    type="button"
                    //onClick={AccountWindow}
                >
                    <h3>MovieHater</h3>
                    <img src="" alt="Profile Pic"/>
                </button>
            </div>
        </nav>
    );
}
export default NavBar;