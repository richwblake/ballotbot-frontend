import { useLoaderData } from 'react-router-dom';
import ShowBallot from '../components/showBallot';
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

    return (
        <ShowBallot ballot={ballot} />
    );
}
