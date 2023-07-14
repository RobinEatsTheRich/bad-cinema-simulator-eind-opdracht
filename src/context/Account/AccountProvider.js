import React, {createContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AccountContext = createContext(null);

function AccountContextProvider({ children }) {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState({
        auth: false,
        userData: {
            alias: "Guest",
            password: "",
            iconId: 5,
            snackId: 5,
            email: ""
        }
    })

    //Place your TMDB key here:
    const [tmdbKey, setTmdbKey] = useState(
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDcwYTI1MTAyNjdmNWQzZGE0ODVlMzdlMWJlYjhkMCIsInN1YiI6IjY0OTJlMDEzZjlhYTQ3MDBjOGRlOTllZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53KPFs3yCEm27xFMZ4_TjSZCZCPaQtaxTbvTdby1ELQ"
    );
    //and your Rapid key here:
    const [rapidKey, setRapidKey] = useState(
        "9ccf1862fdmshedf1c7d8aff5704p1644d4jsnd2bc1bc59d84"
    );

    function logOut(){
        setAccountData({
            auth: false,
            userData: {
                alias: "Guest",
                password: "",
                iconId: 5,
                snackId: 5,
                email: ""
            }
        })
        localStorage.removeItem('accountData');
        navigate("/")
    }

    //This makes sure your accountData is repaired if the user refreshes their page.
    useEffect(()=>{
        let localData =
            JSON.parse(localStorage.getItem('accountData'));
        if (localData && !accountData.auth){
            setAccountData(localData)
        }
    },[])

    const data = {
        accountData,
        setAccountData,
        tmdbKey,
        setTmdbKey,
        rapidKey,
        setRapidKey,
        logOut
    }

    return (
        <AccountContext.Provider value={data}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountContextProvider;