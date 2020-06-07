import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {setBusy, setSnackbar} from "../../../controller/site";
import axios from "axios";
import {API_MANGA} from "../../../constant";
import {setTitle} from "../../../controller/utils";
import {useDispatch} from "react-redux";
import {taskIcon} from "../../../Component/TaskChip/icons";
import EditTaskButton from "./EditTaskButton";
import TagChip from "../../../Component/TagChip/TagChip";
import Skeleton from "@material-ui/lab/Skeleton";
import AddTagChip from "../../../Component/TagChip/AddTagChip";
import TaskInfo from "./TaskInfo";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    label: {
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(0.5)
    }
}));

export default function TaskBlock(props) {
    const classes = useStyles();
    const {manga, chapter, tid, adminAuth} = props;
    const [task, setTask] = useState();
    const dispatch = useDispatch();


    React.useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_MANGA + "/" + manga["id"] + "/chapter/" + chapter["id"] + "/task/" + tid, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setTask(res);
                    setTitle(manga.name + chapter.name + res.name);
                }
            ).catch(err => {
            dispatch(setSnackbar("获取任务信息失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tid]);

    return (
        <div className={classes.root}>
            <Typography variant="h5">
                {(typeof task === "object" && typeof task.tags === "object" && task.tags.map((tag, key) => {
                    return <TagChip key={key} size="small" tag={tag} className={classes.label}
                                    deletable={adminAuth ? "true" : "false"} mid={manga["id"]} cid={chapter["id"]} tid={tid}/>;
                })) || <Skeleton/>}
                {typeof manga.tags === "object" && adminAuth &&
                <AddTagChip className={classes.label} level={2} mid={manga["id"]} cid={chapter["id"]} tid={tid}/>}
            </Typography>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={1}>
                    <Typography variant="h3">{(task && <>{taskIcon(task["type"])}{task["name"]}</>) || <Skeleton/>}</Typography>
                </Box>
                {task && adminAuth && <EditTaskButton task={task}/>}
            </Box>
            {task && adminAuth && <TaskInfo task={task} adminAuth={adminAuth}/>}
        </div>
    );
}
