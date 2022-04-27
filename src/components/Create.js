import React, { useState } from 'react';

import Button from './Buttons/Button';
import '../styles/_import';

export default function Create() {
  const [submission, setSubmission] = useState('');
  const [type, setType] = useState();
  const [options, setOptions] = useState(['', '', '', '', '']);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [success, setSuccess] = useState(false);

  // For each option input, add the input to the options state
  const createOption = (value, num) => {
    const prevOptions = [...options];
    prevOptions[num] = value;
    setOptions(prevOptions);
  };

  const submit = (e) => {
    e.preventDefault();
    let counter = 0;

    // Cleaning up user inputs
    const readySubmission = submission.trim();
    const readyOptions = [];
    for (const option in options) {
      readyOptions.push(options[option].trim());
    }

    // Submission error messages
    if (readySubmission === '') { setError1(true); } else { setError1(false); }
    if (!type) { setError2(true); } else { setError2(false); }
    for (const option in options) {
      if (options[option] === '') { counter += 1; }
    }
    if (counter >= 4) { setError3(true); } else { setError3(false); }

    // If all input requirements are met, then submit
    if (readySubmission && type && counter < 4) {
      fetch('http://localhost:4000/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: submission,
          isSingle: type,
        }),
      })
        .then(() => {
          for (const option in options) {
            if (options[option] !== '') {
              fetch('http://localhost:4000/options', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: options[option] }),
              });
            }
          }
        });
      setSuccess(true);
    }
  };

  return (
    <div className={`flex w-100 h-center pt-100 pb-50 bg-blue-100 ${success && "h-100"}`}>
      <div className="main-container flex col h-100 w-100 v-center">
        <div className={`flex col w-100 gap-32 pt-20 pb-20 pl-25 pr-25 border-r-10 bg-white ${success && "pb-50"}`}>
            <h1 className="bubble pos-rel pt-15 pb-15 pl-25 pr-25 border-r-10 bg-blue-300 text-white">
                {success ? "Thank you for your submission!" : "Submit a question. Get the world's thoughts on it."}
            </h1>
            {!success &&
              <form className="flex col gap-32 v-end pl-25 pr-25">
                <div className="flex col w-100 gap-8">
                  <label htmlFor="question" className="hint">Question</label>
                  <input
                    type="text"
                    id="question"
                    name="question"
                    value={submission}
                    placeholder="Mario or Luigi?"
                    onChange={(e) => setSubmission(e.target.value)}
                    maxLength="120"
                    className="w-100 bs-bb pt-20 pb-20 pl-25 pr-25 border-gray border-r-10"
                  />
                  {error1 && <div className="hint text-red">⚠️ Question can&apos;t be empty.</div>}
                </div>
                <div className="flex col w-100 gap-8">
                  <div className="hint">Type</div>
                  <div className="flex row gap-8">
                    <input
                      type="radio" id="single" name="type" value="true" onChange={(e) => setType(e.target.value)} className="poll" />
                    <label htmlFor="single" className="flex w-100 bs-bb h-center v-center pt-20 pb-20 pl-25 pr-25 border-gray border-r-10">
                      Single-select
                    </label>
                    <input type="radio" id="multi" name="type" value="false" onChange={(e) => setType(e.target.value)} className="poll" />
                    <label htmlFor="multi" className="flex w-100 bs-bb h-center v-center pt-20 pb-20 pl-25 pr-25 border-gray border-r-10">
                      Multi-select
                    </label>
                  </div>
                  {error2 && <div className="hint text-red">⚠️ Please select a type.</div>}
                </div>
                <div className="flex col w-100 gap-8">
                  <div className="hint">Provide at least two options</div>
                  <input
                    type="text"
                    id="1"
                    name="Options"
                    value={options[0]}
                    placeholder="Option 1"
                    onChange={(e) => createOption(e.target.value, 0)}
                    maxLength="120"
                    className="w-100 bs-bb pt-20 pb-20 pl-25 pr-25 border-gray border-r-10"
                  />
                  <input
                    type="text"
                    id="2"
                    name="Options"
                    value={options[1]}
                    placeholder="Option 2"
                    onChange={(e) => createOption(e.target.value, 1)}
                    maxLength="120"
                    className="w-100 bs-bb pt-20 pb-20 pl-25 pr-25 border-gray border-r-10"
                  />
                  <input
                    type="text"
                    id="3"
                    name="Options"
                    value={options[2]}
                    placeholder="Option 3"
                    onChange={(e) => createOption(e.target.value, 2)}
                    maxLength="120"
                    className="w-100 bs-bb pt-20 pb-20 pl-25 pr-25 border-gray border-r-10"
                  />
                  <input
                    type="text"
                    id="4"
                    name="Options"
                    value={options[3]}
                    placeholder="Option 4"
                    onChange={(e) => createOption(e.target.value, 3)}
                    maxLength="120"
                    className="w-100 bs-bb pt-20 pb-20 pl-25 pr-25 border-gray border-r-10"
                  />
                  <input
                    type="text"
                    id="5"
                    name="Options"
                    value={options[4]}
                    placeholder="Option 5"
                    onChange={(e) => createOption(e.target.value, 4)}
                    maxLength="120"
                    className="w-100 bs-bb pt-20 pb-20 pl-25 pr-25 border-gray border-r-10"
                  />
                  {error3 && <div className="hint text-red">⚠️ Please provide at least two options.</div>}
                </div>
                <Button
                  text="Submit"
                  event={submit}
                  isBasic={false}
                  isSmall={false}
                />
              </form>
            }
        </div>
      </div>
    </div>
  );
}
