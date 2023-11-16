import { useLoaderData, Form, redirect } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Ballot from '../components/ballot';
import VoteForm from '../components/voteForm';
import ClipboardButton from '../components/clipboardButton';
import { fetchBallotById, formatTimeLeft } from '../utils';

export async function loader({ params }) {
    return await fetchBallotById(params.ballotId);
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const voteInfo = Object.fromEntries(formData);
    
    if (!voteInfo.picked) {
        return null;
    }

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

export default function EditBallot() {
    const ballot = useLoaderData();

    return <VoteForm ballot={ballot} />;
}
