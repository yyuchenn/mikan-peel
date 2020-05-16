import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import {desktopWidth} from "./Sidebar";

import { useDispatch } from "react-redux";
import {verifySession} from "../controller/user";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'stretch',
    },
    placeholder: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
    },
    mainArea: {
        minWidth: 600,
        width: 600,
        [theme.breakpoints.up("md")]: {
            width: 960
        },
        [theme.breakpoints.up("lg")]: {
            width: `calc(1280px - ${desktopWidth}px)`
        },
        [theme.breakpoints.up("xl")]: {
            width: `calc(1920px - ${desktopWidth}px)`
        }
    }
}));

function Border(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    React.useEffect( () => {
        async function fetchData() {
            await dispatch(verifySession());
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Topbar sidebarToggle={handleDrawerToggle}/>
            <Sidebar sidebarToggle={handleDrawerToggle} openStatus={mobileOpen}/>
            <main className={classes.content}>
                <div className={classes.placeholder}/>

                        {props.children}

                <Footer ver1={"2.0"} ver2={"0.1"}/>
            </main>

        </div>
    );
}

export default Border;
