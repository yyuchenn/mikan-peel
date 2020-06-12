import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {setTitle} from "../controller/utils";
import {setBusy, setSnackbar} from "../controller/site";
import axios from "axios";
import {API_USER} from "../constant";
import {useDispatch} from "react-redux";
import {Box} from "@material-ui/core";
import UsersTable from "./UsersTable";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
}));

export default function PeoplePage() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setTitle("组员");
        dispatch(setBusy(true));
        axios.get(API_USER, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setUsers(res["users"]);
                }
            ).catch(err => {
            dispatch(setSnackbar("拉取组员列表失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
    }, []);


    return (
        <Container>
            <Box display="flex" style={{width: "100%"}} flexDirection="column">
                <div className={classes.title}>
                    <Typography variant="h2">组员</Typography>
                </div>
                <UsersTable users={users}/>
            </Box>
        </Container>
    );
}