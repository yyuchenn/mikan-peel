import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {makeStyles} from '@material-ui/core/styles';
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";
import Box from "@material-ui/core/Box";
import {desktopWidth} from "./Sidebar";

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
    const [mobileOpen, setMobileOpen] = React.useState(false);

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
