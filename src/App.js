import React from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Admin from './components/Admin';
import Login from './components/Login';

import PrivateRoute from './PrivateRoute';
import { AuthContext } from "./context/auth";

import Loader from 'react-loader-spinner';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            isSendingRequest: false
        }

        this.setUserToken = this.setUserToken.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    }

    componentDidMount() {
        const userToken = localStorage.getItem("userToken");
        const isLoggedIn = userToken ? true : false;
        this.setState(state => {
            return { 
                isLoggedIn,
                isSendingRequest: !state.isSendingRequest
            }
        });
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
                    logoutUser: this.logoutUser,
                    setUserToken: this.setUserToken,
                    isLoggedIn: this.state.isLoggedIn,
                }} >
                <Router>
                    <Navbar />

                    {this.state.isSendingRequest ? (
                        <React.Fragment>
                            <PrivateRoute exact path="/admin" component={Admin} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/" component={Home} />
                        </React.Fragment>
                    ) : (
                        <Loader type="Oval" color="#00BFFF" height={50} width={50} />
                    )}
                </Router>
            </AuthContext.Provider>
        )
    }
}

export default App;
