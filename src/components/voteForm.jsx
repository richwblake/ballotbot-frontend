import { fetchBallotById, formatTimeLeft } from '../utils';
import { useState, useRef, useEffect } from 'react';
import { Form } from 'react-router-dom';
import ClipboardButton from '../components/clipboardButton';
import Ballot from '../components/ballot';

export default function VoteForm({ id }) {    

    const [ballot, setBallot] = useState({ pubId: null, title: "", seconds_since_creation: null, exp_s: null, responses: [] });
    const [secondsLeft, setSecondsLeft] = useState(ballot.exp_s - ballot.seconds_since_creation);
    const [timeRunning, setTimeRunning] = useState(false);

    let intervalRef = useRef();

    useEffect(() => {
        async function fetchData() {
            setBallot(await fetchBallotById(id));
        }
        fetchData();

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (secondsLeft <= 0) {
            setSecondsLeft(0);
            clearInterval(intervalRef.current);
        }
    }, [secondsLeft]);

    useEffect(() => {
        setSecondsLeft(ballot.exp_s - ballot.seconds_since_creation);
        if (!timeRunning) {
            intervalRef.current = setInterval(() => setSecondsLeft(prev => prev - 1), 1000);
            setTimeRunning(true);
        }
    }, [ballot]);

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
            return ballot.pubId ? <Ballot id={ballot.pubId} /> : "";
        }
    };

    return (
        renderFormOrShowBallot()
    );
}
