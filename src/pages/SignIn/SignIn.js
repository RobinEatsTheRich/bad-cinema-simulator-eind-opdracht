import React from 'react';
import { useForm } from 'react-hook-form';

import Button from "../../components/Button/Button";

function SignIn() {
    const { register, handleSubmit, watch } = useForm();

    //This is necessary to make sure the Submit button is disabled if username & password are not filled.
    const watchUsername = watch('username');
    const watchPassword = watch('password');

    function onFormSubmit(data) {
        console.log(data);
        console.log(watchPassword)
        console.log(watchUsername)
    }

    return (
        <>
            <h2>SignIn</h2>

            <article>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor="iconInput">Icon
                        <input
                            type="radio"
                            id="iconInput"
                            {...register("icon")}
                            value="moustache"
                        />
                        <input
                            type="radio"
                            id="iconInput"
                            {...register("icon")}
                            value="3dGlasses"
                        />
                        <input
                            type="radio"
                            id="iconInput"
                            {...register("icon")}
                            value="sunGlasses"
                        />
                        <input
                            type="radio"
                            id="iconInput"
                            {...register("icon")}
                            value="hat"
                        />
                        <input
                            type="radio"
                            checked={true}
                            id="iconInput"
                            {...register("icon")}
                            value="hat"
                        />
                    </label>
                    <label htmlFor="snackInput">Favorite Cinema Snack
                        <input
                            type="radio"
                            id="usernameInput"
                            {...register("snack")}
                            value="milkshake"
                        />
                        <input
                            type="radio"
                            id="usernameInput"
                            {...register("snack")}
                            value="popcorn"
                        />
                        <input
                            type="radio"
                            id="usernameInput"
                            {...register("snack")}
                            value="beer"
                        />
                        <input
                            type="radio"
                            id="usernameInput"
                            {...register("snack")}
                            value="nachos"
                        />
                        <input
                            type="radio"
                            checked={true}
                            id="usernameInput"
                            {...register("snack")}
                            value="none"
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
            </article>
        </>
    );
};

export default SignIn;