import React, { useState, useEffect }  from 'react';

export default function Create() {
    const [submission, setSubmission] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        console.log(submission)
        console.log(type)
    }, [submission, type]); 

    return (
        <div className='
                flex col w-100 border-r-10 bg-white pb-20 pl-25 gap-32 pr-25 pt-20
                main-container
        '> 
            <h1 className="bubble pos-rel bg-blue-300 text-white border-r-10 pb-15 pl-25 pr-25 pt-15">Submit a question. Get the world's thoughts on it.</h1>
            <form className='flex col gap-32 pl-25 pr-25'>
                <div className='flex col gap-8'>
                    <label htmlFor="question" className="hint">Question</label>
                    <input
                        type="text"
                        id="question"
                        name="question"
                        value={submission}
                        placeholder="Mario or Luigi?"
                        onChange={e => setSubmission(e.target.value)}
                        maxLength="120"
                        className='flex v-center h-start w-100 row gap-8 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb'
                    />
                </div>
                <div className='flex col gap-8'>
                    <div className='hint'>Type</div>
                    <div className='flex row gap-8'>
                        <>
                            <input type="radio" id="single" name="type" value="1" onChange={e => setType(e.target.value)} className="poll" />
                            <label htmlFor="single" className="hint flex v-center h-center w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb">Single-select</label>
                        </>
                        <>
                            <input type="radio" id="multi" name="type" value="2" onChange={e => setType(e.target.value)} className="poll" />
                            <label htmlFor="multi" className="hint flex v-center h-center w-100 border-1 border-gray border-r-10 pb-20 pl-25 pr-25 pt-20 bs-bb">Multi-select</label>
                        </>
                    </div>
                </div>
            </form>
        </div>
    );
};