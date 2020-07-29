import React from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';

import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./context/auth";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }

        this.setUserToken = this.setUserToken.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        const isLoggedIn = userToken ? true : false;
        this.setState({ isLoggedIn }, () => console.log("isLoggedIn : " + this.state.isLoggedIn));
    }

    setUserToken(data) {
        localStorage.setItem("userToken", data);
        this.setState({ isLoggedIn: true });
    }

    logoutUser() {
        localStorage.clear("userToken");
        this.setState({ isLoggedIn: false });
    }

    render() {
        return (
            <AuthContext.Provider 
                value={{
                    isLoggedIn: this.state.isLoggedIn,
                    setUserToken: this.setUserToken ,
                    logoutUser: this.logoutUser
                }} >
                <Router>
                    <Navbar />

                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute path="/admin" component={Admin} />
                </Router>
            </AuthContext.Provider>
        )
    }
}

export default App;
