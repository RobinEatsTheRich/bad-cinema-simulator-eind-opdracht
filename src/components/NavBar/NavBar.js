import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from "react-router-dom";
import "./NavBar.css"


//import components
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import {AccountContext} from "../../context/Account/AccountProvider";



function NavBar() {
    const {register, handleSubmit, watch } = useForm();
    const { accountWindow, setAccountWindow } = useState(<></>);
    const { accountData, logOut } = useContext(AccountContext);
    const navigate = useNavigate();

    const watchQuery = watch('searchQuery');


    function onFormSubmit(data){
        navigate(`/searching/${data.searchQuery}`)
    }

    function onAccountPageSubmit(data){
        console.log(data)
    }

    const accountWindowContent = (
        <>
            <article className="smallAccountWindow">
                <form onSubmit={handleSubmit(onAccountPageSubmit)}
                      className="signUpForm">
                    <label htmlFor="iconInput"
                           className="iconInput">
                        Icon
                        <div className="options">
                            <input
                                className="radioIcon"
                                type="radio"
                                id="iconInput"
                                {...register("icon")}
                                value="0"
                            />
                            <input
                                className="radioIcon"
                                type="radio"
                                id="iconInput"
                                {...register("icon")}
                                value="1"
                            />
                            <input
                                className="radioIcon"
                                type="radio"
                                id="iconInput"
                                {...register("icon")}
                                value="2"
                            />
                            <input
                                className="radioIcon"
                                type="radio"
                                id="iconInput"
                                {...register("icon")}
                                value="3"
                            />
                            <input
                                className="radioIcon"
                                type="radio"
                                checked={true}
                                id="iconInput"
                                {...register("icon")}
                                value="4"
                            />
                        </div>
                    </label>
                    <label htmlFor="snackInput"
                           className="snackInput">Favorite Cinema Snack
                        <div className="options">
                            <input
                                className="radioIcon"
                                type="radio"
                                id="snackInput"
                                {...register("snack")}
                                value="0"
                            />
                            <input
                                className="radioIcon"
                                type="radio"
                                id="snackInput"
                                {...register("snack")}
                                value="1"
                            />
                            <input
                                className="radioIcon"
                                type="radio"
                                id="snackInput"
                                {...register("snack")}
                                value="2"
                            />
                            <input
                                className="radioIcon"
                                type="radio"
                                id="snackInput"
                                {...register("snack")}
                                value="3"
                            />
                            <input
                                className="radioIcon"
                                type="radio"
                                checked={true}
                                id="snackInput"
                                {...register("snack")}
                                value="4"
                            />
                        </div>
                    </label>
                    <label htmlFor="usernameInput">Alias
                        <p className="smallText">(Must contain 6 characters)</p>
                    </label>
                    <input
                        type="text"
                        id="usernameInput"
                        {...register("username")}
                    />
                    <Button
                        buttonType="submit"
                        onSubmit={handleSubmit}
                    >Okay!</Button>
                </form>
            </article>
        </>
    );

    return (
        <>
            <nav>
                <div className="navCenterPiece">
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
                    <button
                        className="softButton"
                        type="button"
                        onClick={logOut}
                    >Log Out</button>
                    <button
                        type="button"
                        //onclick={() => {setAccountWindow(accountWindowContent)}}
                    >
                        <h3>{accountData.userData.alias}</h3>
                        <img src="" alt={`Profile Pic ${accountData.userData.iconId}`}/>
                    </button>
                </div>
            </nav>
            {accountWindow}
        </>
    );
}
export default NavBar;