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


function SignUp() {
    const { register, handleSubmit, watch } = useForm();
    const { accountData, setAccountData } = useContext(AccountContext)
    const [ canRegister, toggleCanRegister ] = useState(false)
    const navigate = useNavigate();

    //This is necessary to make sure the Submit button is disabled if username & password are not filled.
    const watchUsername = watch('username');
    const watchPassword = watch('password');
    const watchEmail = watch('email');
    //This can stop our elements from being rendered on the mounting phase
    const [firstRender, toggleFirstRender] = useState(true);

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
                console.log(result);
            } catch (e) {
                console.error(e);
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

    useEffect( () => {
        console.log("canRegister is " + canRegister)
    },[ canRegister])


    function onFormSubmit(data) {
        const postData = {
            "username": data.username,
            "password" : data.password,
            "info": (data.icon + data.snack),
            "email" : (
                data.email ? data.email
                    : "@"
            ),
            "role": ["user"]
        }
        console.log(postData)

        const postOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer xxx.xxx.xxx",
            }
        }
        async function postToBackend() {
            try {
                const result = await axios.post('https://frontend-educational-backend.herokuapp.com/api/auth/signup', postData);
                console.log(result);
            } catch (e) {
                console.error(e);
            }
        }

        void postToBackend();




        setAccountData({
            auth: true,
            userData: {
                alias: data.username,
                password: data.password,
                iconId: data.icon,
                snackId: data.snack,
                email: (
                    data.password ? data.password
                        : null
                )
            }})

        //navigate('/highlights')
    }

    return (
        <>
            <Logo/>

            <h2>Create Account</h2>
            <article className="accountWindow">
                <form onSubmit={handleSubmit(onFormSubmit)}>
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
                    <Button
                        buttonType="submit"
                        onSubmit={handleSubmit}
                        isDisabled={!canRegister}
                    >Okay!</Button>
                </form>
                <Link to="/sign_in">Log in instead</Link>
                <Link to="/highlights">Continue as guest</Link>
            </article>
        </>
    );
};

export default SignUp;