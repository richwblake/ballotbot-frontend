import { useLoaderData, Form, redirect } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import ShowBallot from '../components/showBallot';

export async function loader({ params }) {
    return await fetchBallotById(params.ballotId);
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const voteInfo = Object.fromEntries(formData);
    return updateResponsePatchRequest(params.ballotId, voteInfo.picked);
}

const updateResponsePatchRequest = async (ballotId, responseId) => {
    const patchBody = {
        response: {
            id: responseId,
        },
    };
    const patchObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(patchBody),
    };

    const response = await fetch(import.meta.env.VITE_API_ROOT + "/polls/" + ballotId, patchObject);

    return redirect("/" + ballotId);
}

const fetchBallotById = async id => {
    const response = await fetch(import.meta.env.VITE_API_ROOT + "/polls/" + id);
    const json = await response.json();
    return json; 
}


export default function VoteBallot() {

    const ballot = useLoaderData();
    const [secondsLeft, setSecondsLeft] = useState(ballot.exp_s - ballot.seconds_since_creation);
    const [ballotIsOpen, setBallotIsOpen] = useState(ballot.exp_s > ballot.seconds_since_creation);

    const decrease = () => {
        setSecondsLeft(prev => prev - 1);
    }
    let intervalRef = useRef();

    useEffect(() => {
        intervalRef.current = setInterval(decrease, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (secondsLeft <= 0) {
            setSecondsLeft(0);
            setBallotIsOpen(false);
            clearInterval(intervalRef.current);
        }
    }, [secondsLeft]);

    const renderChoices = () => {
        return ballot.responses.map(r => (
            <div className='responses' key={r.pubId}>
                <input className="responses-radio" value={r.pubId} type='radio' name='picked' /><span>{r.content}</span>
            </div>));
    };

    const formatTimeLeft = () => {
        if (secondsLeft <= 0) {
            return "Ballot closed!";
        }
        return `Ballot closes in ${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? "0" + secondsLeft % 60 : secondsLeft % 60}`;
    };

    const renderFormOrShowBallot = () => {
        if (ballotIsOpen) {
            return (
                <Form method='post' id='ballot'>
                    <h1>{ballot.title}</h1>
                    <p id='time-left'>{formatTimeLeft()}</p>
                    {renderChoices()}
                    <button type='submit' id='vote-btn'>Cast Vote</button>
                </Form>
            );
        } else {
            return <ShowBallot ballot={ballot} />
        }
    };

    return (
        renderFormOrShowBallot()
    );
}
