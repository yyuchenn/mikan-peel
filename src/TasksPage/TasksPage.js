import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import TasksTable from "./TasksTable";

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(5),
    },
}));

export default function TasksPage(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.title}>
                <Typography variant="h2">任务广场</Typography>
            </div>
            <TasksTable/>
        </div>
    );
}