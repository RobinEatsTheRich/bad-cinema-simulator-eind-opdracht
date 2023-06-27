//Import packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';

//Import Context
import ConfirmWindowContextProvider from "./context/ConfirmWindowProvider/ConfirmWindowProvider";
import AccountContextProvider from "./context/Account/AccountProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <Router>
        <AccountContextProvider>
            <ConfirmWindowContextProvider>
                <App/>
            </ConfirmWindowContextProvider>
        </AccountContextProvider>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
