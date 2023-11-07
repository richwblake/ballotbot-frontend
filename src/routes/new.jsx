import { Form, redirect } from 'react-router-dom';

const postData = async postObject => {
    const response = await fetch('http://localhost:3000/polls', postObject);
    const json = await response.json();
    return json;
}

export async function action({ request, params }) {
    const formData = await request.formData();
    const ballotInfo = Object.fromEntries(formData);

    const postObj= {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: ballotInfo.title,
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

    return redirect('/' + newBallot.pubId);
}

export default function NewBallot() {
    return (
        <Form method='post' id='ballot-form'>
            <p>
                <label>
                    <span>Title</span>
                    <input
                        type='text'
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
                        name='ans2'
                        placeholder='Oceanprime'
                    />
                </label>
            </p>
            <p>
                <button type='submit'>Create Ballot</button>
            </p>
        </Form>
    );
}
