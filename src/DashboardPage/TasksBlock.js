import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setBusy, setSnackbar} from "../controller/site";
import axios from "axios";
import {API_USER} from "../constant";
import {tokenHeader} from "../controller/user";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TaskListItem from "../Component/TaskListItem/TaskListItem";

export function Tasks(props) {
    const [tasks, setTasks] = React.useState();
    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_USER + "/" + uid + "/tasks", {
            headers: tokenHeader(),
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
    return <>
        <Typography variant="h5" style={{marginBottom: "2rem"}}>任务</Typography>
        <Box display="flex" style={{width: "100%"}} flexDirection="column">
            {tasks && tasks.map((task, key) => {
                if (task["status"] === 0) return <TaskListItem task={task} key={key}/>;
            })}
        </Box>
    </>
}