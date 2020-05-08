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
import MangaPage from "./MangaPage/MangaPage";

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
                    <Route path={"/manga/:mid"} children={<MangaPage/>} />
                </Switch>
            </Border>
        </Router>
    );
}