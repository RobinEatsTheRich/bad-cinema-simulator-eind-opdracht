//Import packages
import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./SignUp.css";

//Import context
import {AccountContext} from "../../context/Account/AccountProvider";

//Import components
import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";

//Import art
import threeDeeGlasses from  "../../assets/icons/Avatars/3dGlasses.svg"
import blankIcon from  "../../assets/icons/Avatars/blankIcon.svg"
import hat from  "../../assets/icons/Avatars/hat.svg"
import stache from  "../../assets/icons/Avatars/stache.svg"
import sunGlasses from  "../../assets/icons/Avatars/sunGlasses.svg"
import beer from  "../../assets/icons/Snacks/beer.svg"
import blankSnack from  "../../assets/icons/Snacks/blankSnack.svg"
import milkshake from  "../../assets/icons/Snacks/milkshake.svg"
import nachos from  "../../assets/icons/Snacks/nachos.svg"
import popcorn from  "../../assets/icons/Snacks/popcorn.svg"


function SignUp() {
    const { register, handleSubmit, watch } = useForm();
    const { accountData, setAccountData } = useContext(AccountContext);
    const [ errorMessage, setErrorMessage ] = useState("");
    //This can stop our elements from being rendered on the mounting phase
    const [firstRender, toggleFirstRender] = useState(true);
    const [ canRegister, toggleCanRegister ] = useState(false);

    const watchUsername = watch('username');
    const watchPassword = watch('password');
    const watchEmail = watch('email');
    const navigate = useNavigate();

    //Boot up the NOVI Backend in case it's in sleepmode.
    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        }
        async function testBackend() {
            try {
                await axios.get('https://frontend-educational-backend.herokuapp.com/api/test/all', fetchOptions);
            } catch (e) {
                console.error(e);
                decodeError(e)
            }
        }

        void testBackend();
    }, []);

    //Check whether the entered account info can be accepted or not.
    useEffect( () => {
        if(firstRender)
            toggleFirstRender(false)
        else {
            if (
                watchUsername.length >= 6
                &&
                watchPassword.length >= 6
                && (
                    watchEmail === ""
                    ||
                    watchEmail.includes("@")
                )

            ) toggleCanRegister(true)
            else toggleCanRegister(false)
        }

    },[ watchUsername, watchPassword, watchEmail ])


    function onFormSubmit(data) {
        const postData = {
            "username": data.username,
            "password": data.password,
            "info": `${data.icon + data.snack}`,
            //Ethically I believe that websites always asking for emails is a sign of eroding personal agency, so I want entering your email to be optional.
            //If the person doesn't want to share this data, I just randomly generate a new email for them to satisfy the backend.
            "email" : (
                data.email ? data.email
                    : `${Math.floor(Math.random() * 9999)}@email.com`
            ),
            "role": ["user"]
        }

        //Register the account
        async function postToBackend() {
            try {
               const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', postData);
                console.log(result)
                void getToken();
            } catch (e) {
                console.error(e);
                decodeError(e)
            }
        }

        const postDataLogIn = {
            "username": data.username,
            "password": data.password
        }

        //And then get that sweet, sweet key.
        async function getToken() {
            try {
                const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',postDataLogIn);
                setAccountData({
                    auth: true,
                    userData: {
                        alias: result.data.username,
                        password: data.password,
                        iconId: data.icon,
                        snackId: data.snack,
                        email: result.data.email
                    }
                })
                navigate('/highlights')
            } catch (e) {
                console.error(e);
                decodeError(e)
            }
        }
        void postToBackend();
    }

    //Don't forget to store that info.
    useEffect(()=>{
        localStorage.setItem('accountData', JSON.stringify(accountData));
    },[accountData])


    function decodeError(e){
        e.response.data.message ?
            setErrorMessage(e.response.data.message)
            :
            //This used to say "Please check Email Validity" but then I got that error when it wasn't the email, so apparently it needed to be something else.
            setErrorMessage("Please check account info validity")
    }

    return (
        <>
            <Logo/>
            <article className="accountWindow">
                <h2 className="formHeader">Create Account</h2>
                <form onSubmit={handleSubmit(onFormSubmit)}
                className="signForm">

                    {/*//////////////--Choose an Icon--//////////////*/}
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
                                    {...register("icon")}
                                    value="5"
                                    defaultChecked={true}
                                />
                                <label
                                    className="iconRadioLabel"
                                    htmlFor="icon5"/>
                            </div>
                        </div>
                    </div>

                    {/*//////////////--Choose a Snack--//////////////*/}
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
                                    defaultChecked={true}
                                    {...register("snack")}
                                    value="5"
                                />
                                <label
                                    className="snackRadioLabel"
                                    htmlFor="snack5"/>
                            </div>
                        </div>
                    </div>
                    {/*//////////////--And then here's your run-of-the-mill usernames and passwords and such.--//////////////*/}
                    <label htmlFor="usernameInput">Alias
                        <p className="smallText">(Must contain 6 characters)</p>
                    </label>
                    <input
                        type="text"
                        id="usernameInput"
                        {...register("username")}
                    />
                    <label htmlFor="passwordInput">Password
                        <p className="smallText">(Must contain 6 characters)</p>
                    </label>
                    <input
                        type="password"
                        id="passwordInput"
                        {...register("password")}
                    />
                    <label htmlFor="emailInput">Email
                        <p className="smallText">(Optional)</p>
                    </label>
                    <input
                        type="text"
                        id="emailInput"
                        {...register("email")}
                    />
                    <p className="errorMessage">{errorMessage}</p>
                    {/*//////////////--And to go to Log-in, or refuse creating an account altogether...
                    or just to confirm your choices.--//////////////*/}
                    <div className="otherRoutes">
                        <Link
                            className="softButton"
                            to="/sign_in">
                            Log in instead</Link>
                        <Link
                            className="softButton"
                            to="/highlights">
                            Continue as guest</Link>
                    </div>
                    <Button
                        buttonType="submit"
                        onSubmit={handleSubmit}
                        isDisabled={!canRegister}
                    >Okay!</Button>
                </form>
            </article>
        </>
    );
};

export default SignUp;