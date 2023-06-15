import React from 'react';
import {useForm} from "react-hook-form";
import Button from "../Button/Button";
function AccountWindow ( ){
    const { register, handleSubmit } = useForm();

    function onFormSubmit(data) {
        console.log(data);
    }


    return(
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
                <Button
                    buttonType="submit"
                    onSubmit={handleSubmit}
                >Okay!</Button>
            </form>
        </article>
    );
}
export default AccountWindow;