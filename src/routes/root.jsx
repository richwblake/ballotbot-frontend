import { Link, Outlet } from 'react-router-dom';

export default function Root() {
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
