import React, {createContext, useState} from 'react';

export const AccountContext = createContext(null);

function AccountContextProvider({ children }) {

    const [apiKey, setApiKey] = useState(
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDcwYTI1MTAyNjdmNWQzZGE0ODVlMzdlMWJlYjhkMCIsInN1YiI6IjY0OTJlMDEzZjlhYTQ3MDBjOGRlOTllZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.53KPFs3yCEm27xFMZ4_TjSZCZCPaQtaxTbvTdby1ELQ"
    );

    const data = {
        apiKey,
        setApiKey
    }

    return (
        <AccountContext.Provider value={data}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountContextProvider;