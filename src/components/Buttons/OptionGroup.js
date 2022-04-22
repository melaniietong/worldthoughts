import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

import '../../styles/_import';
import Button from './Button';
import Option from './Option';

/* ======== PROPS ====================================
    - socket    Socket
    - pollId    Number
    - isSingle  Boolean [true (radio), false (checkbox)]
=================================================== */

const cookies = new Cookies();
let current;

export default function OptionGroup({ socket, pollId, isSingle }) {
    const [options, setOptions] = useState(); // State of the poll options being displayed
    const [selection, setSelection] = useState(); // State of user option selection
    const [userHistory, setUserHistory] = useState(); // State of if user answered the poll before
    const [display, setDisplay] = useState(true); // State to show results if user answered poll
    const [error, setError] = useState(false); // State for error message

    // After user submits votes, make call to server
    const sendUpdate = () => { socket.emit("updateCall"); };
    
    // Keeps track of current user's selection; to be submitted on submit
    const updateSelection = (e, value, id, isSingle) => {
        if (isSingle) { setSelection([value]); }
            else {
                if (current === id) {
                    e.target.checked ? setSelection(history => [...history, value]) : setSelection(selection.filter(e => e !== value));
                } else {
                    current = id; 
                    setSelection([value]);
                }  
            }
    };

    const submit = (e) => {
        e.preventDefault();
        if (selection.length > 0) {
            setError(false);
            try {
                selection.forEach(item => {
                    fetch("http://localhost:4000/answers", {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            poll_id: parseInt(pollId),
                            option_id: parseInt(item),
                            cookie: cookies.get('id'),
                        })
                    });
                });
                setSelection([]);
                setDisplay(true);
                sendUpdate();
            } catch (err) {
                console.error(err.message);
            }
        } else {
            setError(true);
        }
    };

    const resubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/answers?poll_id=${pollId}&cookie=${cookies.get('id')}`, {
            method: "DELETE"
        });
        setSelection([]);
        setDisplay(false);
        sendUpdate();
    };

    // Get poll data
    useEffect(() => {
        fetch(`http://localhost:4000/options?poll_id=${pollId}`)
            .then(response => response.json())
            .then(json => setOptions(json))
        setSelection([]);
    }, [pollId]);

    // Check if user already answered the poll
    useEffect(() => {
        fetch(`http://localhost:4000/answers/user?poll_id=${pollId}&cookie=${cookies.get('id')}`)
            .then(response => response.json())
            .then(json => setUserHistory(json))
    }, [pollId]);

    // Display results page if user answered the poll
    useEffect(() => {
        if (userHistory && userHistory.length > 0) { setDisplay(true) }
            else { setDisplay(false) }
    }, [userHistory, pollId]);

    return(
        <form className='flex col v-end gap-32'>
            <div className='flex col v-start w-100 gap-8'>
                {options && options.map(item => {
                    return <Option 
                        socket = {socket}
                        key = {item.option_id}
                        text = {item.title}
                        isSingle = {isSingle}
                        pollId = {pollId}
                        optionId = {item.option_id}
                        event = {updateSelection}
                        isResult = {display? true : false}
                        history = {userHistory}
                    />
                })}
            </div>
            <div className='flex row v-center'>
                {error && <div className='error pr-25 text-red'>⚠️ Please select an option first!</div>}
                <Button 
                    text = {display ? "Resubmit" : "Submit"}
                    isSmall = {false}
                    isBasic = {false}
                    event = {display ? resubmit : submit}/>
            </div>
        </form>
    ); 
};