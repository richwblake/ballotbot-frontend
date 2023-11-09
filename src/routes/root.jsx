import { useLocation, Link, Outlet } from 'react-router-dom';

export default function Root() {

    const location = useLocation();

    // const renderHello = () => {
    //     return (
    //             <h2><u>Welcome to BallotBot.</u></h2> <p>Please click the button above to create a new ballot!</p>
    //             <p>Once you've created your ballot, copy the link in the address bar and send to friends or colleagues to get responses</p>
    //     )
    // };

    return (
        <>
            <header>
                <h1 id='title'>Ballot Bot</h1>
                <ul id='nav'>
                    <li>
                        <Link to='/new'>Create Ballot</Link>
                    </li>
                </ul>
            </header>
            <div>
                <Outlet />
            </div>
        </>
    );
}
