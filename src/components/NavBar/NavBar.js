import React, {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link, useNavigate} from "react-router-dom";
import "./NavBar.css"


//import components
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import {AccountContext} from "../../context/Account/AccountProvider";
import axios from "axios";

//import images
import threeDeeGlasses from "../../assets/icons/Avatars/3dGlasses.svg";
import hat from "../../assets/icons/Avatars/hat.svg";
import stache from "../../assets/icons/Avatars/stache.svg";
import sunGlasses from "../../assets/icons/Avatars/sunGlasses.svg";
import blankIcon from "../../assets/icons/Avatars/blankIcon.svg";
import beer from "../../assets/icons/Snacks/beer.svg";
import nachos from "../../assets/icons/Snacks/nachos.svg";
import milkshake from "../../assets/icons/Snacks/milkshake.svg";
import popcorn from "../../assets/icons/Snacks/popcorn.svg";
import blankSnack from "../../assets/icons/Snacks/blankSnack.svg";



function NavBar() {
    const {register, handleSubmit, watch } = useForm();
    const [ activeIcon, setActiveIcon ] = useState(blankIcon);
    const { accountData, setAccountData, noviKey, logOut } = useContext(AccountContext);
    const navigate = useNavigate();

    const watchQuery = watch('searchQuery');

    useEffect(()=>{
        switch (accountData.userData.iconId){
            case "1":
                setActiveIcon(threeDeeGlasses)
                break;
            case "2":
                setActiveIcon(hat)
                break;
            case "3":
                setActiveIcon(stache)
                break;
            case "4":
                setActiveIcon(sunGlasses)
                break;
            default:
                setActiveIcon(blankIcon)
                break;
        }
    },[accountData])

    function onSearchSubmit(data){
        navigate(`/searching/${data.searchQuery}`)
    }

    function onAccountPageSubmit(data){
        localStorage.removeItem('accountData')
        console.log(data)
        setAccountData({
            ...accountData,
            auth: true,
            userData: {
                alias: data.username,
                iconId: data.icon,
                snackId: data.snack,
            }
        })
    }
    useEffect(() =>{
        if(accountData.auth) {
            localStorage.setItem('accountData', JSON.stringify(accountData));
        }
    },[accountData])

    return (
        <>
            <nav>
                <div className="navCenterPiece">
                    <Logo/>
                    <form
                        className="searchBar"
                        onSubmit={handleSubmit(onSearchSubmit)}>
                        <input
                            type="text"
                            id="searchQueryInput"
                            {...register("searchQuery")}
                        />
                        <div className="separatorLine"/>
                        <Button
                            className="softButton"
                            buttonType="submit"
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
                    >{accountData.auth ? "Log Out"
                        : "Create Account"
                    }
                    </Button>
                    <a
                        href="#"
                        className="dropDownButton"
                    >
                        <h3>{accountData.userData.alias}</h3>
                        <img
                            className="profilePic"
                            src={activeIcon}
                            alt={`Profile Pic ${accountData.userData.iconId}`}/>
                    </a>

                    <article className="smallAccountWindow">
                        { accountData.auth &&
                            <form onSubmit={handleSubmit(onAccountPageSubmit)}
                                  className="signForm">
                                <div className="iconInput">
                                    <p className="bigText">Icon</p>
                                    <div className="options">
                                        <div className="iconRadioContainer">
                                            <img
                                                className="iconImage"
                                                src={threeDeeGlasses}
                                                alt="3D Glasses"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="icon1"
                                                defaultChecked={(accountData.userData.iconId === "1")}
                                                {...register("icon")}
                                                value="1"
                                            />
                                            <label
                                                className="iconRadioLabel"
                                                htmlFor="icon1"/>
                                        </div>
                                        <div className="iconRadioContainer">
                                            <img
                                                className="iconImage"
                                                src={hat}
                                                alt="hat"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="icon2"
                                                defaultChecked={(accountData.userData.iconId === "2")}
                                                {...register("icon")}
                                                value="2"
                                            />
                                            <label
                                                className="iconRadioLabel"
                                                htmlFor="icon2"/>
                                        </div>
                                        <div className="iconRadioContainer">
                                            <img
                                                className="iconImage"
                                                src={stache}
                                                alt="Moustache"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="icon3"
                                                defaultChecked={(accountData.userData.iconId === "3")}
                                                {...register("icon")}
                                                value="3"
                                            />
                                            <label
                                                className="iconRadioLabel"
                                                htmlFor="icon3"/>
                                        </div>
                                        <div className="iconRadioContainer">
                                            <img
                                                className="iconImage"
                                                src={sunGlasses}
                                                alt="Sunglasses"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="icon4"
                                                defaultChecked={(accountData.userData.iconId === "4")}
                                                {...register("icon")}
                                                value="4"
                                            />
                                            <label
                                                className="iconRadioLabel"
                                                htmlFor="icon4"/>
                                        </div>
                                        <div className="iconRadioContainer">
                                            <img
                                                className="iconImage"
                                                src={blankIcon}
                                                alt="Blank"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="icon5"
                                                defaultChecked={(accountData.userData.iconId === "5")}
                                                {...register("icon")}
                                                value="5"
                                            />
                                            <label
                                                className="iconRadioLabel"
                                                htmlFor="icon5"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="snackInput">
                                    <p className="bigText">Favourite Cinema Snack</p>
                                    <div className="options">
                                        <div className="snackRadioContainer">
                                            <img
                                                className="snackImage"
                                                src={beer}
                                                alt="beer"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="snack1"
                                                defaultChecked={(accountData.userData.snackId === "1")}
                                                {...register("snack")}
                                                value="1"
                                            />
                                            <label
                                                className="snackRadioLabel"
                                                htmlFor="snack1"/>
                                        </div>
                                        <div className="snackRadioContainer">
                                            <img
                                                className="snackImage"
                                                src={nachos}
                                                alt="Nachos"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="snack2"
                                                defaultChecked={(accountData.userData.snackId === "2")}
                                                {...register("snack")}
                                                value="2"
                                            />
                                            <label
                                                className="snackRadioLabel"
                                                htmlFor="snack2"/>
                                        </div>
                                        <div className="snackRadioContainer">
                                            <img
                                                className="snackImage"
                                                src={milkshake}
                                                alt="Milkshake"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="snack3"
                                                defaultChecked={(accountData.userData.snackId === "3")}
                                                {...register("snack")}
                                                value="3"
                                            />
                                            <label
                                                className="snackRadioLabel"
                                                htmlFor="snack3"/>
                                        </div>
                                        <div className="snackRadioContainer">
                                            <img
                                                className="snackImage"
                                                src={popcorn}
                                                alt="Popcorn"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="snack4"
                                                defaultChecked={(accountData.userData.snackId === "4")}
                                                {...register("snack")}
                                                value="4"
                                            />
                                            <label
                                                className="snackRadioLabel"
                                                htmlFor="snack4"/>
                                        </div>
                                        <div className="snackRadioContainer">
                                            <img
                                                className="snackImage"
                                                src={blankSnack}
                                                alt="blankSnack"/>

                                            <input
                                                className="radioIcon"
                                                type="radio"
                                                id="snack5"
                                                defaultChecked={(accountData.userData.snackId === "5")}
                                                {...register("snack")}
                                                value="5"
                                            />
                                            <label
                                                className="snackRadioLabel"
                                                htmlFor="snack5"/>
                                        </div>
                                    </div>
                                </div>
                                <label htmlFor="usernameInput">Alias
                                    <p className="smallText">(Must contain 6 characters)</p>
                                </label>
                                <input
                                    type="text"
                                    id="usernameInput"
                                    defaultValue={accountData.userData.alias}
                                    {...register("username")}
                                />
                                <Button
                                    buttonType="submit"
                                    onSubmit={handleSubmit}
                                >Okay!</Button>
                            </form>
                        }
                        {
                            !accountData.auth &&
                            <h3 className="errorMessage">Log in to edit account appearance</h3>
                        }
                    </article>
                </div>
            </nav>
        </>
    );
}
export default NavBar;