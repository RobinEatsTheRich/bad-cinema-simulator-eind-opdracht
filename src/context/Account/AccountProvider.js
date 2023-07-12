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

    const [tmdbKey, setTmdbKey] = useState(
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDcwYTI1MTAyNjdmNWQzZGE0ODVlMzdlMWJlYjhkMCIsInN1YiI6IjY0OTJlMDEzZjlhYTQ3MDBjOGRlOTllZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53KPFs3yCEm27xFMZ4_TjSZCZCPaQtaxTbvTdby1ELQ"
    );
    const [rapidKey, setRapidKey] = useState(
        "600a11d05emshc158f5b200c285cp1d59cfjsn9cc360e4d455"
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

    useEffect(()=>{

        let localData =
            JSON.parse(localStorage.getItem('accountData'));
        if (localData && !accountData.auth){
            console.log("I should be logged in!")
            console.log(localData)
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