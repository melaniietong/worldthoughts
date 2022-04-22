import React from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';

import Create from './components/Create';
import Home from './components/Home';
import Nav from './components/Nav';

import './styles/_import';
import getRandomString from "./helpers/getRandomString";

const socket = io.connect("http://localhost:4000");
const cookies = new Cookies();

function App() {
    if (!cookies.get("id")) {
        cookies.set("id", getRandomString());
    }

    return (
        <BrowserRouter>
            <Nav />
            <div className="
                flex h-100 w-100 h-center bg-blue-100 pt-100
            ">
                <Routes>
                    <Route path="/" element={<Home socket={socket} />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;