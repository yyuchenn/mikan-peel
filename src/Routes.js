import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import Border from "./Border/Border";
import MainPage from "./MainPage/MainPage";
import TasksPage from "./TasksPage/TasksPage";
import LoginPage from "./LoginPage/LoginPage";
import MangaPage from "./MangaPage/MangaPage";
import PrivateRoute from "./PrivateRoute";
import DashboardPage from "./DashboardPage/DashboardPage";
import Snackbar from "./Snackbar";
import OAuthPage from "./OAuthPage/OAuthPage";
import CloudPage from "./CloudPage/CloudPage";
import PeoplePage from "./PeoplePage/PeoplePage";
import MessagePage from "./MessagePage/MessagePage";
import UserPage from "./UserPage/UserPage";
import NotFound from "./NotFound";
import SignUpPage from "./LoginPage/SignUpPage";

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
                    <Route path={"/signup"}>
                        <SignUpPage/>
                    </Route>
                    <PrivateRoute path={"/me"}>
                        <DashboardPage/>
                    </PrivateRoute>
                    <Route path={"/cloud"}>
                        <CloudPage/>
                    </Route>
                    <PrivateRoute path={"/oauth2"}>
                        <OAuthPage/>
                    </PrivateRoute>
                    <PrivateRoute path={"/users"}>
                        <PeoplePage/>
                    </PrivateRoute>
                    <PrivateRoute path={"/message"}>
                        <MessagePage/>
                    </PrivateRoute>
                    <Route path={"/manga/:mid"} children={<MangaPage/>} />
                    <PrivateRoute path={"/user/:uid"} children={<UserPage/>} />
                    <Route path="*">
                        <NotFound/>
                    </Route>
                </Switch>
            </Border>
            <Snackbar/>
        </Router>
    );
}