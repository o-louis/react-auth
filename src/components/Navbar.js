import React from 'react';
import Logout from './Logout';
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";

function Navbar() {
    const { isLoggedIn } = React.useContext(AuthContext);

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                {!isLoggedIn &&
                    <li><Link to="/login">Login</Link></li>
                }

                {isLoggedIn &&
                    <>
                        <li><Link to="/admin">Admin</Link></li>
                        <Logout />
                    </>
                }
            </ul>
        </nav>
    )
}

export default Navbar;
