import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import Border from "./Border/Border";
import MainPage from "./MainPage/MainPage";
import TasksPage from "./TasksPage/TasksPage";
import LoginPage from "./LoginPage/LoginPage";

export default function Routes() {
    return (
        <Router>
            <Border>
                <Switch>
                    <Route exact path={"/"}>
                        <MainPage/>
                    </Route>
                    <Route path={"/tasks"}>
                        <TasksPage/>
                    </Route>
                    <Route path={"/login"}>
                        <LoginPage/>
                    </Route>
                </Switch>
            </Border>
        </Router>
    );
}