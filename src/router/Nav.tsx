import {Link} from "react-router-dom";

export default function Nav() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">System Info</Link>
                </li>
                <li>
                    <Link to="/hardware">Hardware</Link>
                </li>
                <li>
                    <Link to="/climate">Climate</Link>
                </li>
            </ul>
        </nav>
    )
}