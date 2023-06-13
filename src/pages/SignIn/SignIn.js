import React from 'react';
import { useForm } from 'react-hook-form';

import Button from "../../components/Button/Button";
import {Link, useNavigate} from "react-router-dom";

function SignIn() {
    const { register, handleSubmit, watch } = useForm();
    const navigate = useNavigate();

    //This is necessary to make sure the Submit button is disabled if username & password are not filled.
    const watchUsername = watch('username');
    const watchPassword = watch('password');

    function onFormSubmit(data) {
        console.log(data);
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
            </article>
        </>
    );
};

export default SignIn;