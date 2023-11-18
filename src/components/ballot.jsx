import { useState, useRef, useEffect } from 'react';
import ClipboardButton from './clipboardButton';
import { calculateExpiry, formatTimeLeft } from '../utils';

export default function Ballot({ ballot }) {

    const [secondsLeft, setSecondsLeft] = useState(calculateExpiry(ballot));
    const [winners, setWinners] = useState([]);
    let intervalRef = useRef();

    const findAndSetWinnerIds = () => {
        let maxVotes = ballot.responses[0].votes;
        let currentWinners = [];
        ballot.responses.forEach(r => {
            if (r.votes > maxVotes) {
                currentWinners = [r];
                maxVotes = r.votes;
            } else if (r.votes === maxVotes) {
                currentWinners.push(r);
            }
        });
        setWinners(currentWinners);
    };

    const renderResponses = () => {
        const winMsg = winners.length === 1 ? "(Winner!)" : "(Tie!)";
        return ballot.responses.map(r => {
            const respIsWinner = winners.find(w => w.pubId === r.pubId);

            return (<div className={`responses ${respIsWinner ? "winner" : ""}`} key={r.pubId}>
                <h2 className='response-title'>{r.content}</h2>
                <p>Votes: {r.votes + " " + (respIsWinner ? winMsg : "")}</p>
            </div>)});
    }

    useEffect(() => {
        intervalRef.current = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (secondsLeft <= 0) {
            setSecondsLeft(0);
            findAndSetWinnerIds();
            clearInterval(intervalRef.current);
        }
    }, [secondsLeft]);

    return (
        <div id='ballot'>
            <h1>{ballot.title}</h1>
            <ClipboardButton />
            <p id='time-left'>{formatTimeLeft(secondsLeft)}</p>
            {renderResponses()}
        </div>
    );
}
