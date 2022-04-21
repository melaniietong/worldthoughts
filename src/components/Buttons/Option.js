import React, { useState, useEffect }  from 'react';

import '../../styles/_import';

/* ======== PROPS ====================================
    - text      String
    - isSingle  Boolean [true (radio), false (checkbox)]
    - groupName Number
    - optionId  Number
    - event     Function
    - isResult  Boolean [true (result), false (option)]
=================================================== */

export default function Option({ text, isSingle, pollId, optionId, event, isResult }) {
    const [resultTotal, setResultTotal] = useState();
    const [optionTotal, setOptionTotal] = useState();

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
    }, [isResult, pollId, optionId]); 

    let percent = (parseInt(optionTotal)/parseInt(resultTotal)*100).toFixed(2);

    return (
        <>
            <input 
                id = {text}
                type = {isSingle ? "radio" : "checkbox"}
                name = {pollId}
                value = {optionId}
                onChange = {e => event(e, e.target.value, pollId, isSingle)}
            />
            <label htmlFor={text} className="flex v-center h-start w-100 row gap-8 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20">
                <p className={isResult ? "option-text" : ""}>{text}</p>
                {isResult ? 
                    <div className='percent w-100'>
                        <div className="pa-5 bg-gray-100 text-gray-200" style={{width:`${percent}%`}}>{percent}%</div>
                    </div>
                    : 
                    <></>
                }
            </label>
        </>
    );
};