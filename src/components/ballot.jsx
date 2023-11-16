import { useState, useRef, useEffect } from 'react';
import ClipboardButton from './clipboardButton';
import { calculateExpiry, formatTimeLeft } from '../utils';

export default function Ballot({ ballot }) {

    const [secondsLeft, setSecondsLeft] = useState(calculateExpiry(ballot));
    let intervalRef = useRef();

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

    const renderResponses = () => {
        return ballot.responses.map(r => (
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
            {renderResponses()}
        </div>
    );
}
