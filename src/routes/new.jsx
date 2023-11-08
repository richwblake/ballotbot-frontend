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

    let responses = [];
    for (let key in ballotInfo) {
        if (key.slice(0, 3) === 'ans') {
            responses.push({ content: ballotInfo[key] });
        }
    }

    const postObj= {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: ballotInfo.title,
            exp_s: parseInt(ballotInfo.timer) * 60,
            responses,
        }),
    }

    const newBallot = await postData(postObj);

    return redirect('/vote/' + newBallot.pubId);
}

export default function NewBallot() {

    const [numTextFields, setNumTextFields] = useState(2);

    const renderTextFields = () => {
        let fields = [];
        for (let i = 0; i < numTextFields; ++i) {
            const tf = 
            (<p key={i}>
                <label>
                    <span>Answer {i + 1}</span>
                    <input
                        type='text'
                        className='new-ballot-inp'
                        name={'ans' + (i + 1)}
                    />
                </label>
            </p>);

            fields.push(tf);
        }
        
        return fields;
    };

    const handleAddField = e => {
        e.preventDefault();
        setNumTextFields(prev => prev + 1);
    }

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
            {renderTextFields()}
            <button onClick={handleAddField} id="add-field-btn">Add another response</button>
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
                <button id='create-ballot-btn' type='submit'>Create Ballot</button>
            </p>
        </Form>
    );
}
