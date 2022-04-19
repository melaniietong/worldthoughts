import React, { useState, useEffect } from 'react';

import Button from './Buttons/Button';

export default function Home() {
    const [poll, setPoll] = useState([Math.floor(Math.random() * 5) + 1]);
    const [displayPoll, setDisplayPoll] = useState([]);

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
        <div className='flex col w-100 v-center gap-32 pl-50 pr-50'>
            <div className='
                flex col w-100 border-10 bg-white pb-20 pl-25 pr-25 pt-20 mt-50
                main-container
            '>
                <div className="bubble pos-rel bg-gray border-10 pb-15 pl-25 pr-25 pt-15 mb-50">
                    <h1>{displayPoll[0] && JSON.stringify(displayPoll[0].question).slice(1, -1)}</h1>
                </div>
            </div>
            <Button 
                text = "Random Question"
                event = {getRandomPoll}
                isBasic = {true}
                isSmall = {false}
            />
        </div>
    );
};