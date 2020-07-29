import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { AuthContext } from "../context/auth";

function Login(props) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [login, setLogin] = useState(false);

    const { setUserToken } = React.useContext(AuthContext);

    const referer = (props.location.state && props.location.state.referer) || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name && !password) {
            setError("Please field all inputs");
            return;
        }
        setError("");
        setUserToken("x123456x");
        setLogin(true);
    }

    if (login) {
        return <Redirect to={referer} />
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                />

                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />

                <button>Log in</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    )
}

export default Login;
