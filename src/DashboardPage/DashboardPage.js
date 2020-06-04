import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

import {useDispatch, useSelector} from "react-redux";
import {CLEAN_USER} from "../reducers/user";
import {useHistory} from "react-router";
import {setTitle} from "../controller/utils";

const useStyles = makeStyles((theme) => ({
    titleArea: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
}));

export default function DashboardPage(props) {
    const classes = useStyles();
    const username = useSelector(state => state.user.nickname);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => setTitle(username), []);

    const onLogOut = () => {
        window.localStorage.removeItem("access_token");
        dispatch({type: CLEAN_USER});
        history.push("/");
    };

    return (
        <Container>
            <Box display={"flex"} className={classes.titleArea}>
                <Box flexGrow={1}>
                    <Typography variant="h5">欢迎您,</Typography>
                    <Typography variant="h1">{username}</Typography>
                </Box>
            </Box>

            <Box display={"flex"} flexWrap={"wrap"}
                 justifyContent={"center"} alignItems={"center"}>
                <Button onClick={onLogOut}>登出</Button>
            </Box>
        </Container>
    );
}