import React, { useState, useEffect } from 'react';

import '../../styles/_import';

/* ======== PROPS ====================================
    - socket    Socket
    - text      String
    - event     Function
    - isResult  Boolean [true (result), false (option)]
    - isSingle  Boolean [true (radio), false (checkbox)]
    - pollId    Number
    - optionId  Number
=================================================== */

export default function Option({ socket, text, event, isResult, isSingle, pollId, optionId }) {
  const [resultTotal, setResultTotal] = useState();
  const [optionTotal, setOptionTotal] = useState();
  const [refresh, setRefresh] = useState(1);

  // Client receives a call from server to update display
  socket.on('updateNow', () => { setRefresh(refresh * -1); });

  useEffect(() => {
    if (isResult) {
      // Get total answers for poll
      fetch(`http://localhost:4000/answers?pollId=${pollId}`)
        .then((response) => response.json())
        .then((json) => setResultTotal(json[0].count));
      // Get total answers for an option
      fetch(`http://localhost:4000/answers?optionId=${optionId}`)
        .then((response) => response.json())
        .then((json) => setOptionTotal(json[0].count));
    }
  }, [isResult, pollId, optionId, refresh]);

  const percent = ((parseInt(optionTotal) / parseInt(resultTotal)) * 100).toFixed(2);

  if (isResult) {
    return (
      <div className="flex row w-100 bs-bb gap-8 v-center pt-20 pb-20 pl-25 pr-25 border-gray border-r-10">
        <div className="option-text">{text}</div>
        <div className="percent w-100">
          <div
            className="pa-5 bg-blue-100 text-gray-200"
            style={{ width: `${percent}%` }}
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
          id={text}
          type={isSingle ? 'radio' : 'checkbox'}
          name={pollId}
          value={optionId}
          onChange={(e) => event(e, e.target.value, pollId, isSingle)}
          className="poll"
        />
        <label htmlFor={text} className="flex w-100 bs-bb gap-8 v-center pt-20 pb-20 pl-25 pr-25 border-gray border-r-10">
          {text}
        </label>
      </>
    );
  }
}
