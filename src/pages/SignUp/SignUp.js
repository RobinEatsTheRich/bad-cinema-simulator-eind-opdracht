import React, {useContext} from 'react';
import { useForm } from 'react-hook-form';

import Button from "../../components/Button/Button";
import {Link, useNavigate} from "react-router-dom";
import {AccountContext} from "../../context/Account/AccountProvider";

function SignUp() {
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
                iconId: data.icon,
                snackId: data.snack,
                email: (
                    data.password ? data.password
                        : null
                )
            }})
        console.log(accountData);
        navigate('/highlights')
    }

    return (
        <>
            <h2>SignUp</h2>

            <article>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor="iconInput">Icon
                        <input
                            type="radio"
                            id="iconInput"
                            {...register("icon")}
                            value="0"
                        />
                        <input
                            type="radio"
                            id="iconInput"
                            {...register("icon")}
                            value="1"
                        />
                        <input
                            type="radio"
                            id="iconInput"
                            {...register("icon")}
                            value="2"
                        />
                        <input
                            type="radio"
                            id="iconInput"
                            {...register("icon")}
                            value="3"
                        />
                        <input
                            type="radio"
                            checked={true}
                            id="iconInput"
                            {...register("icon")}
                            value="4"
                        />
                    </label>
                    <label htmlFor="snackInput">Favorite Cinema Snack
                        <input
                            type="radio"
                            id="usernameInput"
                            {...register("snack")}
                            value="0"
                        />
                        <input
                            type="radio"
                            id="usernameInput"
                            {...register("snack")}
                            value="1"
                        />
                        <input
                            type="radio"
                            id="usernameInput"
                            {...register("snack")}
                            value="2"
                        />
                        <input
                            type="radio"
                            id="usernameInput"
                            {...register("snack")}
                            value="3"
                        />
                        <input
                            type="radio"
                            checked={true}
                            id="usernameInput"
                            {...register("snack")}
                            value="4"
                        />
                    </label>
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
                    <label htmlFor="emailInput">Email <p className="smallText">(Optional)</p></label>
                    <input
                        type="text"
                        id="emailInput"
                        {...register("email")}
                    />
                    <Button
                        buttonType="submit"
                        onSubmit={handleSubmit}
                        isDisabled={!watchPassword || !watchUsername}
                    >Okay!</Button>
                </form>
                <Link to="/sign_in">Log in instead</Link>
            </article>
        </>
    );
};

export default SignUp;