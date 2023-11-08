import { useLoaderData } from 'react-router-dom';

export async function loader({ params }) {
    return await fetchBallotById(params.ballotId);
}

const fetchBallotById = async id => {
    const response = await fetch("http://localhost:3000/polls/" + id);
    const json = await response.json();
    return json; 
}

const renderResponses = responses => {
    return responses.map(r => (
        <div id='responses' key={r.pubId}>
            <h3>{r.content}</h3>
            <p>Votes: {r.votes}</p>
        </div>));
}

export default function Ballot() {

    const ballot = useLoaderData();

    return (
        <div id='ballot'>
            <h1>{ballot.title}</h1>
            {renderResponses(ballot.responses)}
        </div>
    );
}
