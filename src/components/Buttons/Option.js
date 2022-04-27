import React, { useState, useEffect }  from 'react';

import '../../styles/_import';

/* ======== PROPS ====================================
    - socket    Socket
    - text      String
    - isSingle  Boolean [true (radio), false (checkbox)]
    - pollId    Number
    - optionId  Number
    - event     Function
    - isResult  Boolean [true (result), false (option)]
=================================================== */

export default function Option({ socket, text, isSingle, pollId, optionId, event, isResult }) {
    const [resultTotal, setResultTotal] = useState();
    const [optionTotal, setOptionTotal] = useState();
    const [refresh, setRefresh] = useState(1);

    // Client receives a call from server to update display
    socket.on("updateNow", () => { setRefresh(refresh * -1); });

    useEffect(() => {
        if (isResult) {
            // Get total answers for poll
            fetch(`http://localhost:4000/answers?poll_id=${pollId}`)
                .then(response => response.json())
                .then(json => setResultTotal(json[0].count))
            // Get total answers for an option
            fetch(`http://localhost:4000/answers?option_id=${optionId}`)
                .then(response => response.json())
                .then(json => setOptionTotal(json[0].count))
        }
    }, [isResult, pollId, optionId, refresh]); 

    let percent = (parseInt(optionTotal)/parseInt(resultTotal)*100).toFixed(2);

    if (isResult) {
        return (
            <div className={`flex v-center h-start w-100 row gap-8 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb`}>
                <div className="option-text">{text}</div>
                <div className='percent w-100'>
                    <div 
                        className = {"pa-5 text-gray-200 bg-gray-100"}
                        style = {{width:`${percent}%`}}
                    >
                        {percent}% — {optionTotal} votes
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <input 
                    id = {text}
                    type = {isSingle ? "radio" : "checkbox"}
                    name = {pollId}
                    value = {optionId}
                    onChange = {e => event(e, e.target.value, pollId, isSingle)}
                    className="poll"
                />
                <label htmlFor={text} className={`flex v-center h-start w-100 row gap-8 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb`}>
                    {text}
                </label>
            </>
        );
    }
};