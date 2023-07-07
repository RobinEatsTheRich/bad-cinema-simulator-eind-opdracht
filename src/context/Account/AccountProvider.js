import React, {createContext, useState} from 'react';
import {useNavigate} from "react-router-dom";

export const AccountContext = createContext(null);

function AccountContextProvider({ children }) {

    const navigate = useNavigate();
    const [accountData, setAccountData] = useState({
        auth: false,
        userData: {
            alias: "Guest",
            password: "",
            iconId: 4,
            snackId: 4,
            email: ""
        }
    })

    const [tmdbKey, setTmdbKey] = useState(
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDcwYTI1MTAyNjdmNWQzZGE0ODVlMzdlMWJlYjhkMCIsInN1YiI6IjY0OTJlMDEzZjlhYTQ3MDBjOGRlOTllZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53KPFs3yCEm27xFMZ4_TjSZCZCPaQtaxTbvTdby1ELQ"
    );
    const [rapidKey, setRapidKey] = useState(
        "600a11d05emshc158f5b200c285cp1d59cfjsn9cc360e4d455"
    );
    const [noviKey, setNoviKey] = useState(
        ""
    );

    function logOut(){
        setAccountData({
            auth: false,
            userData: {
                alias: "Guest",
                password: "",
                iconId: 4,
                snackId: 4,
                email: ""
            }
        })
        setNoviKey("")
        navigate("/")
    }

    const data = {
        accountData,
        setAccountData,
        tmdbKey,
        setTmdbKey,
        rapidKey,
        setRapidKey,
        noviKey,
        setNoviKey,
        logOut
    }

    return (
        <AccountContext.Provider value={data}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountContextProvider;