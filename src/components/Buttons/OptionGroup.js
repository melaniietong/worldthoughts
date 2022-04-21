import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

import '../../styles/_import';
import Button from './Button';
import Option from './Option';

/* ======== PROPS ====================================
    - pollId    Number
    - isSingle  Boolean [true (radio), false (checkbox)]
=================================================== */

const cookies = new Cookies();
let current;

export default function OptionGroup({ pollId, isSingle }) {
    const [options, setOptions] = useState(); // State of the poll options being displayed
    const [selection, setSelection] = useState(); // State of user option selection
    const [userHistory, setUserHistory] = useState(); // State of if user answered the poll before
    const [display, setDisplay] = useState(true); // State to show results if user answered poll
    
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
        } catch (err) {
            console.error(err.message);
        }
    };

    // Get poll data
    useEffect(() => {
        fetch(`http://localhost:4000/options?poll_id=${pollId}`)
            .then(response => response.json())
            .then(json => setOptions(json))
    }, [pollId]);

    useEffect(() => {
        // Check if user already answered the poll
        fetch(`http://localhost:4000/answers/user?poll_id=${pollId}&cookie=${cookies.get('id')}`)
            .then(response => response.json())
            .then(json => setUserHistory(json))
    }, [pollId]);

    useEffect(() => {
        if (userHistory && userHistory.length > 0) { 
            setDisplay(true) 
        } else { 
            setDisplay(false) 
        }
    }, [userHistory, pollId]);

    return(
        <form className='flex col v-end gap-32'>
            <div className='flex col v-start w-100 gap-8'>
                {options && options.map(item => {
                    if (display) {
                        return <Option 
                            key = {item.option_id}
                            text = {item.title}
                            isSingle = {isSingle}
                            pollId = {pollId}
                            optionId = {item.option_id}
                            event = {updateSelection}
                            isResult = {true}
                        />
                    } else {
                        return <Option 
                            key = {item.option_id}
                            text = {item.title}
                            isSingle = {isSingle}
                            pollId = {pollId}
                            optionId = {item.option_id}
                            event = {updateSelection}
                            isResult = {false}
                        />
                    }
                })}
            </div>
            <Button text={display ? "Resubmit" : "Submit"} isSmall={false} isBasic={false} event={submit}/>
        </form>
    ); 
};