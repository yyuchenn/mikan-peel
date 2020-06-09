import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import DataRender from "./DataRender";
import {localtime_exact} from "../../../controller/utils";
import UserChip from "../../../Component/UserChip/UserChip";

import axios from "axios";
import {API_MANGA} from "../../../constant";
import {tokenHeader} from "../../../controller/user";
import {setBusy, setSnackbar} from "../../../controller/site";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Field, Form} from "react-final-form";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import UserAutocomplete from "../../../Component/UserAutocomplete/UserAutocomplete";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    listItem: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    button: {
        marginLeft: theme.spacing(1),
    }
}));

export default function TaskBlock(props) {
    const classes = useStyles();
    const {task, adminAuth} = props;
    const [taskState, setTaskState] = useState();
    const dispatch = useDispatch();

    React.useEffect(() => {
        setTaskState(task);
    }, [task]);

    const handleDismiss = () => {
        dispatch(setBusy(true));
        axios.delete(API_MANGA + "/" + taskState["mid"] + "/chapter/" + taskState["cid"] + "/task/" + taskState["id"] + "/charge", {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            setTaskState(Object.assign({}, taskState, {accept_by: {uid: "", nickname: "", avatar: ""}}));
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    };

    return (
        <div className={classes.root}>
            <Box display="flex" flexDirection="column">
                <Box display="flex" className={classes.listItem}>
                    <Box flexGrow={1}><Typography variant="h6">承接人</Typography></Box>
                    <Box>
                        {taskState && taskState["accept_by"]["uid"] !== "" &&
                        <UserChip user={taskState["accept_by"]}
                                  onDelete={adminAuth && (taskState["status"] === 0 || taskState["status"] === 2) && handleDismiss}/>}
                        {taskState && taskState["accept_by"]["uid"] === "" &&
                        <ToggleButtons taskState={taskState} setTaskState={setTaskState} {...props} />}
                    </Box>
                </Box>
                <Divider/>
                <Box display="flex" className={classes.listItem}>
                    <Box flexGrow={1}><Typography variant="h6">状态</Typography></Box>
                    <Box><Typography variant="h6">{taskState && taskState["status"] === 0 && "进行中"}
                        {taskState && taskState["status"] === 1 && "已完成"}
                        {taskState && taskState["status"] === 2 && "未开始"}
                    </Typography></Box>
                    <Box>{taskState &&
                    <ToggleStatusButtons taskState={taskState} setTaskState={setTaskState} {...props}/>}</Box>

                </Box>
                {taskState && taskState["accept_by"]["uid"] !== "" && <>
                    <Divider/>
                    <Box display="flex" className={classes.listItem}>
                        <Box flexGrow={1}><Typography>承接时间</Typography></Box>
                        <Box>{localtime_exact(taskState["accept_on"])}</Box>
                    </Box>
                </>}
                {taskState && taskState["status"] === 1 && <>
                    <Divider/>
                    <Box display="flex" className={classes.listItem}>
                        <Box flexGrow={1}><Typography>完成时间</Typography></Box>
                        <Box>{localtime_exact(taskState["complete_on"])}</Box>
                    </Box>
                </>}
                <Divider/>
                <Box display="flex" className={classes.listItem}>
                    <Box flexGrow={1}><Typography>创建时间</Typography></Box>
                    <Box>{taskState && localtime_exact(taskState["create_on"])}</Box>
                </Box>
            </Box>
            <DataRender data={taskState && taskState["data"]}/>
        </div>
    );
}

function ToggleButtons(props) {
    const classes = useStyles();
    const {taskState, adminAuth, setTaskState} = props;
    const privilege = useSelector(state => state.user.privilege);
    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        handleAssign(values["assign_to"])();
        handleClose();
    };

    const handleAssign = (assign_to) => () => {
        dispatch(setBusy(true));
        axios.get(API_MANGA + "/" + taskState["mid"] + "/chapter/" + taskState["cid"] + "/task/" + taskState["id"] + "/charge", {
            params: {assign_to: assign_to},
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            setTaskState(res);
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    };

    if (privilege === 0) return <Typography>无</Typography>;

    return <>
        {adminAuth && <Button variant="contained" color="primary" onClick={handleClickOpen} className={classes.button}>分配</Button>}
        {taskState["status"] === 0 && <Button variant="contained" color="primary" onClick={handleAssign(uid)} className={classes.button}>承接</Button>}

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title">分配</DialogTitle>
            <Form onSubmit={onSubmit} render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <Field component={ UserAutocomplete } name="assign_to" label="分配"/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            取消
                        </Button>
                        <Button type="submit" color="primary">
                            保存
                        </Button>

                    </DialogActions>
                </form>)}/>
        </Dialog>
    </>;
}

function ToggleStatusButtons(props) {
    const classes = useStyles();
    const {taskState, adminAuth, setTaskState} = props;
    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();

    const handleStatusClick = (to) => () => {
        dispatch(setBusy(true));
        axios.get(API_MANGA + "/" + taskState["mid"] + "/chapter/" + taskState["cid"] + "/task/" + taskState["id"] + "/status", {
            params: {to: to},
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            setTaskState(res);
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    };

    return <>{taskState["status"] === 0 && <>
        {adminAuth && <Button variant="contained" color="secondary" size="small" onClick={handleStatusClick(2)} className={classes.button}>停止</Button>}
        {(taskState["accept_by"]["uid"] === uid || adminAuth) && taskState["accept_by"]["uid"] !== "" &&
        <Button variant="contained" color="primary" size="small" onClick={handleStatusClick(1)} className={classes.button}>完成</Button>}
    </>}
        {adminAuth && <>{taskState && taskState["status"] === 1 &&
        <Button variant="contained" color="primary" size="small" onClick={handleStatusClick(0)} className={classes.button}>再开</Button>}
            {taskState && taskState["status"] === 2 &&
            <Button variant="contained" color="primary" size="small" onClick={handleStatusClick(0)} className={classes.button}>开始</Button>}</>}
    </>;
}