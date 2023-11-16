import { useState, useRef, useEffect } from 'react';
import ClipboardButton from './clipboardButton';
import { fetchBallotById, formatTimeLeft } from '../utils';

export default function Ballot({ id }) {

    const [ballot, setBallot] = useState({ pubId: null, title: "", seconds_since_creation: null, exp_s: null, responses: [] });
    const [secondsLeft, setSecondsLeft] = useState(ballot.exp_s - ballot.seconds_since_creation);
    const [timeRunning, setTimeRunning] = useState(false);
    let intervalRef = useRef();


    // const debug = {
    //     ballot_created: new Date(ballot.created_utc),
    //     now: new Date(),
    // };
    // console.log("Ballot created at: " + debug.ballot_created);
    // console.log("Right now: " + debug.now);
    // console.log("Time since creation in seconds: " + (debug.now - debug.ballot_created) / 1000);

    useEffect(() => {
        async function fetchData() {
            setBallot(await fetchBallotById(id));
        }
        fetchData();

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        setSecondsLeft(ballot.exp_s - ballot.seconds_since_creation);
        if (!timeRunning) {
            intervalRef.current = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
            setTimeRunning(true)
        }
    }, [ballot]);


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
