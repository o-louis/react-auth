import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

function Logout() {
    const [logout, setLogout] = useState(false);
    const { logoutUser } = React.useContext(AuthContext);

    const loggedOut = () => {
        logoutUser();
        setLogout(false);
    }

    if (logout) {
        return <Redirect to="/" />
    }
    
    return (
        <li onClick={loggedOut}>Log out</li>
    )
}

export default Logout;
