//Import Packages
import React, {useContext, useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";

//Import Context

import {AccountContext} from "../../context/Account/AccountProvider";
//Import Components
import Button from "../../components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../../components/Logo/Logo";



function SignIn() {
    const { accountData, setAccountData, setNoviKey } = useContext(AccountContext)
    const { register, handleSubmit, watch } = useForm();
    const [ errorMessage, setErrorMessage ] = useState("");
    //This can stop our elements from being rendered on the mounting phase
    const [firstRender, toggleFirstRender] = useState(true);
    const [ canRegister, toggleCanRegister ] = useState(false);

    const watchUsername = watch('username');
    const watchPassword = watch('password');
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

    function onFormSubmit(data) {
        const postData = {
            "username": data.username,
            "password": data.password
        }
        async function getToken() {
            try {
                const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signin',postData);
                setNoviKey(result.data.accessToken)
                console.log(result)
                setAccountData({
                    auth: true,
                    userData: {
                        alias: result.data.username,
                        password: data.password,
                        iconId: accountData.iconId,
                        snackId: accountData.iconId,
                        email: result.data.email
                    }})
                navigate('/highlights')
            } catch (e) {
                console.error(e);
                decodeError(e)
            }
        }
        void getToken()
    }

    //Check whether the account can be accepted or not.
    useEffect( () => {
        if(firstRender)
            toggleFirstRender(false)
        else {
            if (
                watchUsername.length >= 6
                &&
                watchPassword.length >= 6

            ) toggleCanRegister(true)
            else toggleCanRegister(false)
        }

    },[ watchUsername, watchPassword ])

    function decodeError(e){
        e.response.data.message ?
            setErrorMessage(e.response.data.message)
            :
            setErrorMessage("We couldn't find this account")
    }

    return (
        <>
            <Logo/>
            <article className="accountWindow">
                <h2 className="formHeader">SignIn</h2>
                <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className="signForm"
                >
                    <label htmlFor="usernameInput">Alias</label>
                    <input
                        type="text"
                        id="usernameInput"
                        {...register("username")}
                    />
                    <label htmlFor="passwordInput">Password</label>
                    <input
                        type="password"
                        id="passwordInput"
                        {...register("password")}
                    />
                    <p className="errorMessage">{errorMessage}</p>
                    <div className="otherRoutes">
                        <Link to="/">Create Account instead</Link>
                        <Link to="/highlights">Continue as guest</Link>
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

export default SignIn;