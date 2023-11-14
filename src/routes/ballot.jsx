import { useLoaderData } from 'react-router-dom';
import ShowBallot from '../components/showBallot';
import { useEffect, useRef, useState } from 'react';

export async function loader({ params }) {
    return await fetchBallotById(params.ballotId);
}

const fetchBallotById = async id => {
    const response = await fetch(import.meta.env.VITE_API_ROOT + "/polls/" + id);
    const json = await response.json();
    return json; 
}


export default function Ballot() {
    const ballot = useLoaderData();

    return (
        <ShowBallot ballot={ballot} />
    );
}
