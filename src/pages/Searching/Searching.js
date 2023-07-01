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
    const { tmdbKey } = useContext(AccountContext)

    const [ searchData, setSearchData ] = useState([])
    const [ queryType, setQueryType ] = useState("movie")
    const [ renderElement, setRenderElement ] = useState(<></>)

    useEffect(() => {
        const fetchOptions = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${tmdbKey}`
            }
        }

        async function fetchData() {
            try {
                const result = await axios.get(`https://api.themoviedb.org/3/search/${queryType}?query=${id}&include_adult=false&language=en-US&page=1`, fetchOptions);
                //Sorting chronologically
                result.data.results.sort((a, b) => (a.popularity < b.popularity))
                setSearchData(result.data.results);
            } catch (e) {
                console.error(e);
            }
        }

        void fetchData();
    }, [tmdbKey, id, queryType]);

    useEffect(() => {
        console.log(searchData)
    }, [searchData]);

    useEffect(() => {
        setRenderElement(
            searchData.map((searchResult) =>
                <SearchResult
                    result={searchResult}
                    queryType={queryType}/>
            )
        )
    }, [searchData]);

    function toggleQueryType(){
        if (queryType === "movie"){
            return "person"
        } else{
            return "movie"
        }
    }
    function toggleButtonText(){
        if (queryType === "movie"){
            return "view Cast results"
        } else{
            return "view Movie results"
        }
    }

    return (
        <>
            <NavBar/>
            { searchData[0] &&
                <>
                    {confirmWindow}
                    <h3>SEARCH RESULTS FOR <strong>"{ id.toUpperCase() }"</strong></h3>
                    <Button
                        onClick={() =>
                        setQueryType(toggleQueryType())}
                        >
                        {toggleButtonText()}
                    </Button>
                    <article>
                        {renderElement}
                    </article>
                </>
            }
        </>
    );
}

export default Searching;