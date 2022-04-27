import React, { useState }  from 'react';

import '../styles/_import';
import Button from './Buttons/Button';

export default function Create() {
    const [submission, setSubmission] = useState("");
    const [type, setType] = useState();
    const [options, setOptions] = useState(["", "", "", "", ""]);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);
    const [error3, setError3] = useState(false);
    const [success, setSuccess] = useState(false);

    const createOption = (value, num) => {
        let prevOptions = [...options];
        prevOptions[num] = value;
        setOptions(prevOptions);
    };

    const submit = (e) => {
        e.preventDefault();
        let counter = 0;

        // Cleaning up user inputs
        let readySubmission = submission.trim();
        let readyType = type.trim();
        let readyOptions = [];
        for (let option in options) { readyOptions.push(options[option].trim()); }

        // Submission error messages
        if (readySubmission === "") { setError1(true); }
            else { setError1(false) }
        if (readyType === "") { setError2(true); }
            else { setError2(false) }
        for (let option in options) {
            if (options[option] === "") { counter += 1; }
        }
        if (counter >= 4) { setError3(true); }
            else { setError3(false) }

        // If all input requirements are met, then submit
        if (readySubmission && readyType && counter < 4) { 
            fetch("http://localhost:4000/polls", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: submission,
                    is_single: type,
                })
            })
                .then(() => {
                    for (let option in options) {
                        if (options[option] !== "") {
                            fetch("http://localhost:4000/options", {
                                method: "POST",
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ title: options[option], })
                            });
                        };
                    };
                });
            setSuccess(true);
        };
    };

    if (success) {
        return (
            <div className='flex col h-100 w-100 border-r-10 bg-white pb-20 pl-25 gap-32 pr-25 pt-20 main-container'> 
                <h1 className="pos-rel bg-blue-300 text-white border-r-10 pb-15 pl-25 pr-25 pt-15 bubble">
                    Thank you for your submission!
                </h1>
            </div>
        );
    } else {
        return (
            <div className='flex col h-100 w-100 border-r-10 bg-white pb-20 pl-25 gap-32 pr-25 pt-20 main-container'> 
                <h1 className="pos-rel bg-blue-300 text-white border-r-10 pb-15 pl-25 pr-25 pt-15 bubble">
                    Submit a question. Get the world's thoughts on it.
                </h1>
                <form className='flex v-end col gap-32 pl-25 pr-25'>
                    <div className='flex w-100 col gap-8'>
                        <label htmlFor="question" className="hint">Question</label>
                        <input
                            type="text"
                            id="question"
                            name="question"
                            value={submission}
                            placeholder="Mario or Luigi?"
                            onChange={e => setSubmission(e.target.value)}
                            maxLength="120"
                            className='w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb'
                        />
                        {error1 && <div className='error pr-25 text-red'>⚠️ Question can't be empty.</div>}
                    </div>
                    <div className='flex w-100 col gap-8'>
                        <div className='hint'>Type</div>
                        <div className='flex row gap-8'>
                            <input type="radio" id="single" name="type" value="true" onChange={e => setType(e.target.value)} className="poll" />
                            <label htmlFor="single" className="hint flex v-center h-center w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb">Single-select</label>
                            <input type="radio" id="multi" name="type" value="false" onChange={e => setType(e.target.value)} className="poll" />
                            <label htmlFor="multi" className="hint flex v-center h-center w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb">Multi-select</label>
                        </div>
                        {error2 && <div className='error pr-25 text-red'>⚠️ Please select a type.</div>}
                    </div>
                    <div className='flex w-100 col gap-8'>
                        <div className='hint'>Provide at least two options</div>
                        <input
                            type="text"
                            id="1"
                            name="Options"
                            value={options[0]}
                            placeholder="Option 1"
                            onChange={e => createOption(e.target.value, 0)}
                            maxLength="120"
                            className='w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb'
                        />
                        <input
                            type="text"
                            id="2"
                            name="Options"
                            value={options[1]}
                            placeholder="Option 2"
                            onChange={e => createOption(e.target.value, 1)}
                            maxLength="120"
                            className='w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb'
                        />
                        <input
                            type="text"
                            id="3"
                            name="Options"
                            value={options[2]}
                            placeholder="Option 3"
                            onChange={e => createOption(e.target.value, 2)}
                            maxLength="120"
                            className='w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb'
                        />
                        <input
                            type="text"
                            id="4"
                            name="Options"
                            value={options[3]}
                            placeholder="Option 4"
                            onChange={e => createOption(e.target.value, 3)}
                            maxLength="120"
                            className='w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb'
                        />
                        <input
                            type="text"
                            id="5"
                            name="Options"
                            value={options[4]}
                            placeholder="Option 5"
                            onChange={e => createOption(e.target.value, 4)}
                            maxLength="120"
                            className='w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb'
                        />
                        {error3 && <div className='error pr-25 text-red'>⚠️ Please provide at least two options.</div>}
                    </div>
                    <Button 
                        text = {"Submit"}
                        isSmall = {false}
                        isBasic = {false}
                        event = {submit}
                    />
                </form>
            </div>
        );
    }
};