import React, { useState, useEffect } from 'react';

import Button from './Buttons/Button';
import OptionGroup from './Buttons/OptionGroup';
import '../styles/_import';

export default function Home({ socket }) {
  const [poll, setPoll] = useState([Math.floor(Math.random() * 5) + 1]); // Poll history
  const [displayPoll, setDisplayPoll] = useState([]);
  const pollData = displayPoll[0];

  const getRandomPoll = async () => {
    try {
      const response = await fetch('http://localhost:4000/polls/random');
      const jsonData = await response.json();
      const pollId = jsonData[0].poll_id;

      // Checks if random poll is in poll history
      if (poll.includes(pollId)) {
        getRandomPoll();
      } else {
        setPoll((history) => [pollId, ...history]);
        if (poll.length > 5) {
          const newPoll = poll;
          newPoll.pop();
          setPoll(newPoll);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:4000/polls/${poll[0]}`)
      .then((response) => response.json())
      .then((json) => setDisplayPoll(json));
  }, [poll]);

  return (
    <div className="main-container flex col h-100 w-100 gap-32 v-center">
      <div className="flex col w-100 gap-32 pt-20 pb-20 pl-25 pr-25 border-r-10 bg-white">
        <h1 className="bubble pos-rel pt-15 pb-15 pl-25 pr-25 border-r-10 bg-blue-300 text-white">
          {pollData && pollData.question}
        </h1>
        <p className="hint pl-25 text-gray-200">
          Select <strong>{pollData && pollData.is_single ? 'one' : 'one or more'}</strong> from below.
        </p>
        {pollData && (
          <OptionGroup
            socket={socket}
            pollId={pollData && pollData.poll_id}
            isSingle={pollData && pollData.is_single}
          />
        )}
      </div>
      <Button
        text="Random Question"
        event={getRandomPoll}
        isBasic={true}
        isSmall={true}
      />
    </div>
  );
}
