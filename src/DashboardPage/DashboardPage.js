import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import {makeStyles, useTheme} from "@material-ui/core/styles";

import {useDispatch, useSelector} from "react-redux";
import {CLEAN_USER} from "../reducers/user";
import {useHistory} from "react-router";
import {setTitle} from "../controller/utils";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Tasks} from "./TasksBlock";
import {Settings} from "./SettingsBlock";
import {Admin} from "./AdminBlock";

const useStyles = makeStyles((theme) => ({
    titleArea: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(1),
    },
}));

export default function DashboardPage(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const username = useSelector(state => state.user.nickname);
    const privilege = useSelector(state => state.user.privilege);
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => setTitle(username), []);

    const onLogOut = () => {
        window.localStorage.removeItem("access_token");
        dispatch({type: CLEAN_USER});
        history.push("/");
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Box display={"flex"} className={classes.titleArea}>
                <Box flexGrow={1} alignItems="flex-end">
                    <Typography variant="h5">欢迎您,</Typography>
                    <Typography variant="h1">{username}</Typography>
                </Box>
                <Box><Button onClick={onLogOut}>登出</Button></Box>
            </Box>

            <Box display="flex" flexGrow={1} alignItems="flex-start" flexDirection={isDesktop ? "row" : "column"}>
                <Tabs
                    orientation={isDesktop ? "vertical" : "horizontal"}
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    className={classes.tabs}
                >
                    <Tab label="任务"/>
                    <Tab label="设置"/>
                    {privilege > 2 && <Tab label="管理"/>}
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Tasks/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Settings/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Admin/>
                </TabPanel>
            </Box>
        </Container>
    );
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div style={{width: "100%"}} hidden={value !== index} {...other}>
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}
