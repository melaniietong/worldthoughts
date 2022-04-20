import React from 'react';

import '../../styles/_import';

/* ======== PROPS ====================================
    - text      String
    - isSingle  Boolean [true (radio), false (checkbox)]
    - groupName Number
=================================================== */

export default function Option({ text, isSingle, groupName }) {
    return (
        <>
            <input id={text} type={isSingle ? "radio" : "checkbox"} name={groupName} value={text} />
            <label for={text} className="flex v-start w-100 row border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20"><p>{text}</p></label>
        </>
    );
};