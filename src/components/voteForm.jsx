import { calculateExpiry, formatTimeLeft } from '../utils';
import { useState, useRef, useEffect } from 'react';
import { Form } from 'react-router-dom';
import ClipboardButton from '../components/clipboardButton';
import Ballot from '../components/ballot';

export default function VoteForm({ ballot }) {    
    const [secondsLeft, setSecondsLeft] = useState(calculateExpiry(ballot));

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

    useEffect(() => {
        if (secondsLeft <= 0) {
            setSecondsLeft(0);
            clearInterval(intervalRef.current);
        }
    }, [secondsLeft]);


    const renderChoices = () => {
        return ballot.responses.map(r => (
            <div className='responses' key={r.pubId}>
                <input className="responses-radio" value={r.pubId} type='radio' name='picked' /><span>{r.content}</span>
            </div>));
    };

    const renderFormOrShowBallot = () => {
        if (secondsLeft > 0) {
            return (
                <Form method='post' id='ballot'>
                    <h1>{ballot.title}</h1>
                    <ClipboardButton />
                    <p id='time-left'>{formatTimeLeft(secondsLeft)}</p>
                    {renderChoices()}
                    <button type='submit' id='vote-btn'>Cast Vote</button>
                </Form>
            );
        } else {
            return <Ballot ballot={ballot} />;
        }
    };

    return (
        renderFormOrShowBallot()
    );
}
