import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { fetchBallotById } from '../utils';
import ShowBallot from '../components/showBallot';

export async function loader({ params }) {
    return await fetchBallotById(params.ballotId);
}

export default function Ballot() {
    const ballot = useLoaderData();

    return (
        <ShowBallot ballot={ballot} />
    );
}
