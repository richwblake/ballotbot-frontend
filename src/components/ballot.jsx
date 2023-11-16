import { useState, useRef, useEffect } from 'react';
import ClipboardButton from './clipboardButton';
import { formatTimeLeft } from '../utils';

export default function Ballot({ ballot }) {

    const [secondsLeft, setSecondsLeft] = useState(ballot.exp_s - ballot.seconds_since_creation);
    let intervalRef = useRef();

    // const debug = {
    //     ballot_created: new Date(ballot.created_utc),
    //     now: new Date(),
    // };
    // console.log("Ballot created at: " + debug.ballot_created);
    // console.log("Right now: " + debug.now);
    // console.log("Time since creation in seconds: " + (debug.now - debug.ballot_created) / 1000);

    useEffect(() => {
        intervalRef.current = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    const renderResponses = responses => {
        return responses.map(r => (
            <div className='responses' key={r.pubId}>
                <h2 className='response-title'>{r.content}</h2>
                <p>Votes: {r.votes}</p>
            </div>));
    }

    return (
        <div id='ballot'>
            <h1>{ballot.title}</h1>
            <ClipboardButton />
            <p id='time-left'>{formatTimeLeft(secondsLeft)}</p>
            {renderResponses(ballot.responses)}
        </div>
    );
}
