import { useLoaderData } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { fetchBallotById } from '../utils';
import Ballot from '../components/Ballot';

export async function loader({ params }) {
    return await fetchBallotById(params.ballotId);
}

export default function ShowBallot() {
    const ballot = useLoaderData();

    return (
        <Ballot ballot={ballot} />
    );
}
