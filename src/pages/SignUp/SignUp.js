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
import logo from "../../components/Logo/Logo";


function SignUp() {
    const { register, handleSubmit, watch } = useForm();
    const { accountData, setAccountData, setNoviKey } = useContext(AccountContext);
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
                const result = await axios.get('https://frontend-educational-backend.herokuapp.com/api/test/all', fetchOptions);
            } catch (e) {
                console.error(e);
                decodeError(e)
            }
        }

        void testBackend();
    }, []);

    //Check whether the account can be accepted or not.
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
            "info": (data.icon + data.snack),
            //Ethically I believe that websites always asking for emails is a sign of eroding personal agency, so I want entering your email to be optional.
            //If the person doesn't want to share this data, I just randomly generate a new email for them to satisfy the backend.
            "email" : (
                data.email ? data.email
                    : `${Math.floor(Math.random() * 99999)}@email.com`
            ),
            "role": ["user"]
        }

        async function postToBackend() {
            try {
                const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', postData);
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
        async function getToken() {
            try {
                const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',postDataLogIn);
                setNoviKey(result.data.accessToken)
                setAccountData({
                    auth: true,
                    userData: {
                        alias: result.data.username,
                        password: data.password,
                        iconId: data.icon,
                        snackId: data.snack,
                        email: result.data.email
                    }})
                navigate('/highlights')
            } catch (e) {
                console.error(e);
                decodeError(e)
            }
        }
        void postToBackend();
    }

    function decodeError(e){
        e.response.data.message ?
            setErrorMessage(e.response.data.message)
            :
            setErrorMessage("Please check email validity")
    }

    return (
        <>
            <Logo/>
            <article className="accountWindow">
                <h2 className="formHeader">Create Account</h2>
                <form onSubmit={handleSubmit(onFormSubmit)}
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