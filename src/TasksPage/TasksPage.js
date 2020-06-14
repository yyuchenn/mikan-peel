import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {setTitle} from "../controller/utils";
import {setBusy, setSnackbar} from "../controller/site";
import axios from "axios";
import {API_TASK} from "../constant";
import {useDispatch} from "react-redux";
import {Box} from "@material-ui/core";
import TasksTable from "./TasksTable";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    taskListItem: {
        marginTop: theme.spacing(1)
    }
}));

export default function TasksPage() {
    const classes = useStyles();
    const [tasks, setTasks] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        setTitle("任务广场");
        dispatch(setBusy(true));
        axios.get(API_TASK, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setTasks(res["tasks"]);
                }
            ).catch(err => {
            dispatch(setSnackbar("拉取任务列表失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
    }, []);

    return (
        <Container>
            <Box display="flex" style={{width: "100%"}} flexDirection="column">
                <div className={classes.title}>
                    <Typography variant="h2">任务广场</Typography>
                </div>
                <TasksTable tasks={tasks}/>
            </Box>
        </Container>
    );
}