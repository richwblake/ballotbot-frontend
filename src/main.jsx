import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';
import NewBallot, { action as newAction } from './routes/new';
import Ballot, { 
    loader as ballotLoader 
} from './routes/show';
import VoteBallot, { 
    loader as voteBallotLoader, 
    action as voteBallotAction 
} from './routes/edit';
import './index.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'new',
                action: newAction,
                element: <NewBallot />,
            },
            {
                path: '/:ballotId',
                loader: ballotLoader,
                element: <Ballot />,
            },
            {
                path: '/vote/:ballotId',
                action: voteBallotAction,
                loader: voteBallotLoader,
                element: <VoteBallot />,
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
