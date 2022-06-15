import React, { Component } from "react";
import {
    Routes,
    Route,
    HashRouter
} from "react-router-dom";
import Welcome from "../screens/welcome/Welcome.js";
import history from "../history/History.js";

class AppRouter extends Component {
    render() {
        return (
            <HashRouter history={history} >
                <Routes >
                    <Route path="/" element={<Welcome />} />
                </Routes>
            </HashRouter >
        )
    };
}

export default AppRouter;