import React from 'react';
import './Button.css';

function Button ({ buttonType , isDisabled , onClick, children }){
    return(
        <button
            className="buttonComponent"
            type={buttonType ? buttonType :  "button"}
            disabled={isDisabled}
            onClick={onClick}
        >
            { children }
        </button>
    );
}
export default Button;