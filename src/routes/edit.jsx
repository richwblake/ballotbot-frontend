import { useLoaderData, Form, redirect } from 'react-router-dom';

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

    const response = await fetch("http://localhost:3000/polls/" + ballotId, patchObject);

    return redirect("/" + ballotId);
}

const fetchBallotById = async id => {
    const response = await fetch("http://localhost:3000/polls/" + id);
    const json = await response.json();
    return json; 
}

const renderResponses = responses => {
    return responses.map(r => (
        <div id='responses' key={r.pubId}>
            <input value={r.pubId} type='radio' name='picked' /><span>{r.content}</span>
            <p>Votes: {r.votes}</p>
        </div>));
}

export default function VoteBallot() {

    const ballot = useLoaderData();

    return (
        <Form method='post' id='ballot'>
            <h1>{ballot.title}</h1>
            {renderResponses(ballot.responses)}
            <button type='submit' id='vote-btn'>Cast Vote</button>
            <p><i>Vote Screen</i></p>
        </Form>
    );
}

