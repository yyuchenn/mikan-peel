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
import {setBusy, setSnackbar} from "../controller/site";
import axios from "axios";
import {API_USER} from "../constant";
import {tokenHeader} from "../controller/user";
import TaskListItem from "../Component/TaskListItem/TaskListItem";
import {Field, Form} from "react-final-form";
import {Checkboxes, TextField} from "mui-rff";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import UserAutocomplete from "../Component/UserAutocomplete/UserAutocomplete";
import ImgUrlTextField from "../Component/ImgUrlTextField/ImgUrlTextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

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

function Tasks(props) {
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

function Settings(props) {
    const uid = useSelector(state => state.user.uid);
    const [user, setUser] = React.useState();
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_USER + "/" + uid, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setUser(res);
                }
            ).catch(err => {
            dispatch(setSnackbar("获取信息失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        console.log(values);
        dispatch(setBusy(true));
        axios.post(API_USER + "/" + uid, values, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            dispatch(setSnackbar("修改成功", "success"));
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    };

    const onChangePassword = (values) => {
        console.log(values);
        if (values["password"] !== values["re-password"]) {
            dispatch(setSnackbar("两次密码不一致", "error"));
            return;
        }
        dispatch(setBusy(true));
        axios.post(API_USER + "/" + uid + "/password", values, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            setOpen(false);
            dispatch(setSnackbar("修改成功", "success"));
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    };

    return <>
        <Typography variant="h5" style={{marginBottom: "2rem"}}>账户设置</Typography>
        <Form initialValues={user && {uid: user["uid"], nickname: user["nickname"], introduction: user["introduction"]}}
              onSubmit={onSubmit} render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column"  alignItems="flex-start">
                    <TextField name="uid" label="用户ID" disabled/>
                    <TextField name="nickname" label="昵称" required/>
                    <TextField name="introduction" label="自我介绍" required multiline rowsMax={5}/>
                    <Button variant="contained" color="secondary" style={{marginTop: "0.5rem"}} onClick={handleClickOpen}>修改密码</Button>
                    <Button type="submit" variant="contained" color="primary" style={{marginTop: "1rem"}}>保存</Button>
                </Box>
            </form>)}/>

        <Dialog open={open} onClose={handleClose}>
            <Form onSubmit={onChangePassword} render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">修改密码</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            密码是6-32位字母、数字、空格或如下特殊字符的组合。-+_!=@#$%^&*?([)].;:
                        </DialogContentText>
                        <TextField autoFocus margin="dense" name="password" label="新密码" type="password" fullWidth required/>
                        <TextField margin="dense" name="re-password" label="重复新密码" type="password" fullWidth required/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            取消
                        </Button>
                        <Button type="submit" color="primary">
                            修改
                        </Button>
                    </DialogActions>
                </form>)}/>
        </Dialog>
    </>
}

function Admin(props) {
    return <>
        <Typography variant="h5" style={{marginBottom: "2rem"}}>管理</Typography>
        <Button variant="contained" color="primary">添加邀请码</Button>
    </>
}