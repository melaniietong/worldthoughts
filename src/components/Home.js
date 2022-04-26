import React, { useState, useEffect } from 'react';

import Button from './Buttons/Button';
import OptionGroup from './Buttons/OptionGroup';

export default function Home({ socket }) {
    const [poll, setPoll] = useState([Math.floor(Math.random() * 5) + 1]);
    const [displayPoll, setDisplayPoll] = useState([]);
    const pollData = displayPoll[0];

    const getRandomPoll = async() => {
        try {
            const response = await fetch("http://localhost:4000/polls/random");
            const jsonData = await response.json();
            const pollId = jsonData[0].poll_id;

            if (poll.includes(pollId)) {
                getRandomPoll();
            } else {
                setPoll(history => [pollId, ...history]);
                if (poll.length > 5) {
                    poll.pop();
                }
            };
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:4000/polls/${poll[0]}`)
            .then(response => response.json())
            .then(json => setDisplayPoll(json))
    }, [poll])

    return (
        <div className='flex col h-100 w-100 v-center gap-32 main-container'>
            <div className='
                flex col w-100 border-r-10 bg-white pb-20 pl-25 gap-32 pr-25 pt-20
            '>
                <h1 className="bubble pos-rel bg-blue-300 text-white border-r-10 pb-15 pl-25 pr-25 pt-15">{pollData && pollData.question}</h1>
                <p className='hint pl-25 text-gray-100'>Select <strong>{pollData && pollData.is_single ? "one" : "one or more"}</strong> from below.</p>
                {pollData && <OptionGroup 
                    socket = {socket}
                    pollId = {pollData && pollData.poll_id} 
                    isSingle = {pollData && pollData.is_single} 
                />}
            </div>
            <Button 
                text = "Random Question"
                event = {getRandomPoll}
                isBasic = {true}
                isSmall = {true}
            />
        </div>
    );
};