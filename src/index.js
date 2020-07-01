import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@material-ui/core/styles';
import {responsiveMainThem} from './theme'
import Routes from "./Routes"
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import mikanPeel from './reducers'

import thunk from "redux-thunk";
import {SnackbarProvider} from "notistack";

let store = createStore(mikanPeel, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <ThemeProvider theme={responsiveMainThem}>
            <SnackbarProvider anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
                <Routes/>
            </SnackbarProvider>
        </ThemeProvider>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.register();
