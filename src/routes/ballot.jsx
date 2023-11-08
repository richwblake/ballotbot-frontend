import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export async function loader({ params }) {
    return await fetchBallotById(params.ballotId);
}

const fetchBallotById = async id => {
    const response = await fetch("http://localhost:3000/polls/" + id);
    const json = await response.json();
    return json; 
}


export default function Ballot() {
    const ballot = useLoaderData();
    const [secondsLeft, setSecondsLeft] = useState(ballot.exp_s - ballot.seconds_since_creation);

    const decrease = () => setSecondsLeft(prev => prev - 1);
    let intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(decrease, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    const renderResponses = responses => {
        return responses.map(r => (
            <div id='responses' key={r.pubId}>
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
            <p><i>{formatTimeLeft()}</i></p>
            {renderResponses(ballot.responses)}
        </div>
    );
}
