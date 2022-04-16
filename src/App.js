import React from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Create from './components/Create';
import Home from './components/Home';
import Nav from './components/Nav';

import './styles/_import';

const socket = io.connect("http://localhost:4000");

function App() {

    
    const yeet = () => {
        // After user submits votes, make call to server
        socket.emit("updateCall");
    };

    // Client receives a call from server to update display
    socket.on("updateNow", () => {
        console.log("2 I'm updated now!");
    });

    yeet();
    // ====================================================

    return (
        <div className="
            h-100 w-100 h-center v-center pos-fix 
            bg-blue-100
        ">
            <BrowserRouter>
                <Nav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;