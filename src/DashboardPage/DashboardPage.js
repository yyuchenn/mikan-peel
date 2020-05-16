import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    titleArea: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
}));

export default function DashboardPage(props) {
    const classes = useStyles();
    const username = useSelector(state => state.user.username);

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

            </Box>
        </Container>
    );
}