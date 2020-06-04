import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import TasksTable from "./TasksTable";
import {setTitle} from "../controller/utils";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
}));

export default function TasksPage() {
    const classes = useStyles();

    useEffect(() => {
        setTitle("任务广场");
    }, []);

    return (
        <Container>
            <div className={classes.title}>
                <Typography variant="h2">任务广场</Typography>
            </div>
            <TasksTable/>
        </Container>
    );
}