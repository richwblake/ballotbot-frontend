import { useState, useRef, useEffect } from 'react';
import ClipboardButton from './clipboardButton';

export default function ShowBallot({ ballot }) {
    const [secondsLeft, setSecondsLeft] = useState(ballot.exp_s - ballot.seconds_since_creation);

    const decrease = () => setSecondsLeft(prev => prev - 1);
    let intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(decrease, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    const renderResponses = responses => {
        return responses.map(r => (
            <div className='responses' key={r.pubId}>
                <h2 className='response-title'>{r.content}</h2>
                <p>Votes: {r.votes}</p>
            </div>));
    }

    const formatTimeLeft = () => {
        if (secondsLeft <= 0) {
            return "Ballot closed!";
        }
        return `Ballot closes in ${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? "0" + secondsLeft % 60 : secondsLeft % 60}`;
    };

    return (
        <div id='ballot'>
            <h1>{ballot.title}</h1>
            <ClipboardButton />
            <p id='time-left'>{formatTimeLeft()}</p>
            {renderResponses(ballot.responses)}
        </div>
    );
}
