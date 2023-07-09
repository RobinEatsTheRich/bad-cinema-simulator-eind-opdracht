import React, {useContext, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from "react-router-dom";
import "./NavBar.css"


//import components
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import {AccountContext} from "../../context/Account/AccountProvider";
import axios from "axios";



function NavBar() {
    const {register, handleSubmit, watch } = useForm();
    const { openWindow, toggleOpenWindow } = useState(false);
    const { accountData, setAccountData, noviKey, logOut } = useContext(AccountContext);
    const navigate = useNavigate();

    const watchQuery = watch('searchQuery');


    function onFormSubmit(data){
        navigate(`/searching/${data.searchQuery}`)
    }

    function onAccountPageSubmit(data){
        console.log(data)
        const postDataLogIn = {
            "username" : data.username,
        }
        const postOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${noviKey}`,
            }
        }
        async function editAccount() {
            try {
                const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',postDataLogIn, postOptions);
                console.log(result)
                setAccountData({
                    auth: true,
                    userData: {
                        alias: result.data.username,
                        password: accountData.password,
                        iconId: data.icon,
                        snackId: data.snack,
                        email: accountData.email
                    }})
            } catch (e) {
                console.error(e);
            }
        }
        void editAccount();

    }


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
                        <div className="separatorLine"/>
                        <Button
                            className="softButton"
                            type="submit"
                            disabled={!watchQuery}
                        >
                            Search{/*<img src="../assets/looking_glass.png" alt="Search"/>*/}
                        </Button>
                    </form>
                </div>
                <div className="navAccountThings">
                    <Button
                        className="softButton"
                        onClick={logOut}
                    >Log Out</Button>
                    <a
                        href="#"
                        className="dropDownButton"
                    >
                        <h3>{accountData.userData.alias}</h3>
                        <img src="" alt={`Profile Pic ${accountData.userData.iconId}`}/>
                    </a>

                    <article className="smallAccountWindow">
                        <form onSubmit={handleSubmit(onAccountPageSubmit)}
                              className="signForm">
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
                </div>
            </nav>
        </>
    );
}
export default NavBar;