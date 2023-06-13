//Import Packages
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';

//Import Pages
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Highlights from "./pages/Highlights/Highlights";
import Searching from "./pages/Searching/Searching";
import ProfileCast from "./pages/ProfileCast/ProfileCast";
import ProfileMovie from "./pages/ProfileMovie/ProfileMovie";
import Cinema from "./pages/Cinema/Cinema";
import Error from "./pages/Error/Error";

//Import Components
import NavBar from "./components/NavBar/NavBar";



function App() {
  return (
    <>
        <NavBar/>

        <Routes>
            <Route
                path="/"
                element={<SignIn/>}
            />
            <Route
                path="/sign_up"
                element={<SignUp/>}
            />
            <Route
                path="/highlights"
                element={<Highlights/>}
            />
            <Route
                path="/searching/:id"
                element={<Searching/>}
            />
            <Route
                path="/profile_cast/:id"
                element={<ProfileCast/>}
            />
            <Route
                path="/profile_movie/:id"
                element={<ProfileMovie/>}
            />
            <Route
                path="/cinema/:id"
                element={<Cinema/>}
            />
            <Route
                path="/*"
                element={<Error/>}
            />
        </Routes>
    </>
  );
}

export default App;
