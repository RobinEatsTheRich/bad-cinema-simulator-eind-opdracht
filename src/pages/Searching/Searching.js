//Import packages
import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

//Import context
import {confirmContext} from "../../context/ConfirmWindowProvider/ConfirmWindowProvider";
import {AccountContext} from "../../context/Account/AccountProvider";

//Import components
import NavBar from "../../components/NavBar/NavBar";
import SearchResult from "../../components/SearchResult/SearchResult";
import Button from "../../components/Button/Button";



function Searching() {
    const { id } = useParams();
    const { confirmWindow } = useContext(confirmContext)
    const { apiKey } = useContext(AccountContext)

    const [ searchData, setSearchData ] = useState([])
    const [ searchForMovie, toggleSearchForMovie ] = useState(true)

    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        }
        function queryType(){
            if (searchForMovie){
                return "movie"
            }else
                return "person"
        }

        async function fetchData() {
            try {
                const result = await axios.get(`https://api.themoviedb.org/3/search/${queryType}?query=${id}&include_adult=true&language=en-US&page=1`, fetchOptions);
                //Sorting chronologically
                console.log(result.data)
                //result.data.cast.sort((a, b) => (a.popularity < b.popularity))
                //setSearchData(result.data.results);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchData();
    }, [apiKey, id, searchForMovie]);

    React.useEffect(() => {
        console.log(searchData);
    }, [searchData]);

    function checkResultType(result){
        return(
            result.gender ? "cast" : "movie"
        )
    }

    return (
        <>
            <NavBar/>
            { searchData &&
                <>
                    {confirmWindow}
                    <h3>SEARCH RESULTS FOR <strong>"{ id.toUpperCase() }"</strong></h3>
                    <Button
                        onClick={toggleSearchForMovie(!searchForMovie)}>
                        Toggle Movie Search
                    </Button>

                    {searchData.map((result) =>
                        <SearchResult
                            result={result}
                            type={checkResultType(result)}
                        />
                    )}
                </>
            }
        </>
    );
}

export default Searching;