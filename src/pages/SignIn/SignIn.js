import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';

import Button from "../../components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {AccountContext} from "../../context/Account/AccountProvider";

function SignIn() {
    const { accountData, setAccountData } = useContext(AccountContext)
    const { register, handleSubmit, watch } = useForm();
    const navigate = useNavigate();

    //This is necessary to make sure the Submit button is disabled if username & password are not filled.
    const watchUsername = watch('username');
    const watchPassword = watch('password');

    function onFormSubmit(data) {
        console.log(data);
        setAccountData({
            auth: true,
            userData: {
                alias: data.username,
                password: data.password,
                iconId: "",
                snackId: "",
                email: null
            }})
        console.log(accountData);
        navigate('/highlights')
    }

    return (
        <>
            <h2>SignIn</h2>

            <article>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor="usernameInput">Alias or Email</label>
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
                    <Button
                        buttonType="submit"
                        onSubmit={handleSubmit}
                        isDisabled={!watchPassword || !watchUsername}
                    >Okay!</Button>
                </form>
                <Link to="/">Create Account instead</Link>
                <Link to="/highlights">Continue as guest</Link>
            </article>
        </>
    );
};

export default SignIn;