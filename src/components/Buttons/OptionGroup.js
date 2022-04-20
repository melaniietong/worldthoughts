import React, { useState, useEffect } from 'react';

import '../../styles/_import';
import Option from './Option';

/* ======== PROPS ====================================
    - pollId    Number
    - isOption  Boolean [true (options), false (results)]
    - isSingle  Boolean [true (radio), false (checkbox)]
=================================================== */

export default function OptionGroup({ pollId, isOption, isSingle }) {
    const [options, setOptions] = useState();

    useEffect(() => {
        fetch(`http://localhost:4000/options?poll_id=${pollId}`)
            .then(response => response.json())
            .then(json => setOptions(json))
    }, [pollId]);

    return(
        <div className='flex col v-start gap-8'>
            {options && options.map(item => {
                return <Option 
                    key = {item.option_id}
                    text = {item.title}
                    isSingle = {isSingle}
                    groupName = {pollId}
                />
            })}
        </div>
    ); 
};