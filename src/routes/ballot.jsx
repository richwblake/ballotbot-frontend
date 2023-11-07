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
    return responses.map(r => <p key={r.pubId}>{r.content}</p>);
}

export default function Ballot() {

    const ballot = useLoaderData();
    console.log(ballot);

    return (
        <div>
            <h1>{ballot.title}</h1>
            {renderResponses(ballot.responses)}
        </div>
    );
}
