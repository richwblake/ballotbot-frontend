import { Form, redirect } from 'react-router-dom';
import { useState } from 'react';

const postData = async postObject => {
    const response = await fetch('http://localhost:3000/polls', postObject);
    const json = await response.json();
    return json;
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const ballotInfo = Object.fromEntries(formData);
    console.log(ballotInfo);

    const postObj= {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: ballotInfo.title,
            exp_s: parseInt(ballotInfo.timer) * 60,
            responses: [
                {
                    content: ballotInfo.ans1,
                },
                {
                    content: ballotInfo.ans2,
                },
            ],
        }),
    }

    const newBallot = await postData(postObj);

    return redirect('/vote/' + newBallot.pubId);
}

export default function NewBallot() {

    const numTextFields = useState(0);

    return (
        <Form method='post' id='ballot-form'>
            <p>
                <label>
                    <span>Title</span>
                    <input
                        type='text'
                        className='new-ballot-inp'
                        name='title'
                        placeholder='Where should we eat lunch?'
                    />
                </label>
            </p>
            <p>
                <label>
                    <span>Answer 1</span>
                    <input
                        type='text'
                        className='new-ballot-inp'
                        name='ans1'
                        placeholder='Flemings'
                    />
                </label>
            </p>
            <p>
                <label>
                    <span>Answer 2</span>
                    <input
                        type='text'
                        className='new-ballot-inp'
                        name='ans2'
                        placeholder='Oceanprime'
                    />
                </label>
            </p>
            <p>
                <label>
                    <span>Time limit in minutes</span>
                    <select name="timer" className='new-ballot-inp'>
                        <option value="5">5 minutes</option>
                        <option value="10">10 minutes</option>
                        <option value="20">20 minutes</option>
                    </select>                                    
                </label>
            </p>
            <p>
                <button type='submit'>Create Ballot</button>
            </p>
        </Form>
    );
}
