import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import {responsiveMainThem} from './theme'
import Border from './Border/Border';
import MainPage from './MainPage/MainPage'
import LoginPage from "./LoginPage/LoginPage";
import Routes from "./Routes"
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <ThemeProvider theme={responsiveMainThem}>
        <Routes/>
    </ThemeProvider>,
    document.getElementById('root')
);

serviceWorker.unregister();
