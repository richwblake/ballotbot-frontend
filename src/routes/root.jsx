import { useLocation, Link, Outlet } from 'react-router-dom';
import HelloMessage from '../components/hello';

export default function Root() {

    const location = useLocation();

    return (
        <>
            <header>
                <h1 id='title'>Ballot Bot</h1>
                {location.pathname === "/" ? <HelloMessage /> : ""}
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
