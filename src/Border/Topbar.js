import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Badge, Popover} from "@material-ui/core";
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import AvatarIcon from "../Component/AvatarIcon/AvatarIcon";
import {Duck} from "mdi-material-ui";
import {setSnackbar} from "../controller/site";
import {timelapse} from "../controller/utils";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        padding: 0,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    popover: {
        pointerEvents: 'none',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

export default function Topbar(props) {
    const {sidebarToggle} = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    const privilege = useSelector(state => state.user.privilege);
    const isBusy = useSelector(state => state.site.busy);
    const logging = useSelector(state => state.user.logging);
    const number_of_notification = useSelector(state => state.user.number_of_notifications);
    const nickname = useSelector(state => state.user.nickname);
    const avatar = useSelector(state => state.user.avatar);
    const goo = useSelector(state => state.user.goo_timestamp);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorName, setAnchorName] = React.useState("");

    const handlePopoverOpen = (event, name) => {
        setAnchorName(name);
        setAnchorEl(event.currentTarget);

    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleGoo = () => {
        dispatch(setSnackbar(timelapse(goo), "info"));
    };

    const open = Boolean(anchorEl);

    return (<AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <div style={{width: "100%"}}>
                <Box display="flex"
                     justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                        <IconButton
                            onClick={sidebarToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Box>
                    <Box>
                        {privilege > 0 && (<IconButton onMouseEnter={(e) => handlePopoverOpen(e, "咕~")}
                                                       onMouseLeave={handlePopoverClose} aria-label={"goo"} onClick={handleGoo}>
                            <Duck fontSize="large"/>
                        </IconButton>)}
                        {privilege > 0 && (<IconButton onMouseEnter={(e) => handlePopoverOpen(e, "通知")}
                                    onMouseLeave={handlePopoverClose} aria-label={"notification"} component={Link} to={"/message"}>
                            <Badge badgeContent={number_of_notification} overlap={"circle"} color={"secondary"}>
                                <NotificationsIcon fontSize={"large"}/>
                            </Badge>
                        </IconButton>)}
                        <IconButton onMouseEnter={(e) => handlePopoverOpen(e, nickname || "登录")}
                                    onMouseLeave={handlePopoverClose} aria-label={"account"}
                                    component={Link} to={"/me"}>
                            {nickname ? <AvatarIcon name={nickname} avatar={avatar}/> : <AccountCircleIcon fontSize={"large"}/>}
                            {logging && <CircularProgress size={24} className={classes.buttonProgress}/>}
                        </IconButton>

                    </Box>
                </Box>
            </div>
        </Toolbar>
        {isBusy > 0 ? <LinearProgress/> : <></>}
        <Popover
            className={classes.popover}
            classes={{
                paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            {anchorName}
        </Popover>
    </AppBar>);
}