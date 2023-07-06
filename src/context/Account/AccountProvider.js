import React, {createContext, useState} from 'react';

export const AccountContext = createContext(null);

function AccountContextProvider({ children }) {

    const [accountData, setAccountData] = useState({
        auth: true,
        userData: {
            alias: "",
            password: "",
            iconId: "",
            snackId: "",
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

    const data = {
        accountData,
        setAccountData,
        tmdbKey,
        setTmdbKey,
        rapidKey,
        setRapidKey,
        noviKey,
        setNoviKey
    }

    return (
        <AccountContext.Provider value={data}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountContextProvider;