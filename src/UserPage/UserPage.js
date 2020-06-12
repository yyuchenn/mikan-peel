import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {useParams, Link as RouterLink} from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import {API_USER} from "../constant";
import {setBusy, setSnackbar} from "../controller/site";
import {useDispatch, useSelector} from "react-redux";
import {localtime, setTitle} from "../controller/utils";
import Link from "@material-ui/core/Link";
import {tokenHeader} from "../controller/user";
import TaskListItem from "../Component/TaskListItem/TaskListItem";
import ChangePasswordButton from "../Component/ChangePasswordButton/ChangePasswordButton";


const useStyles = makeStyles((theme) => ({
    titleArea: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(1),
    },
    coverCard: {
        maxWidth: 275,
        position: "relative"
    },
    label: {
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(0.5)
    }
}));

export default function UserPage(props) {
    const classes = useStyles();
    const {uid} = useParams();
    const dispatch = useDispatch();
    const privilege = useSelector(state => state.user.privilege);

    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState();

    React.useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_USER + "/" + uid, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setUser(res);
                    setTitle(res.nickname);
                }
            ).catch(err => {
            dispatch(setSnackbar("获取用户信息失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    return (
        <Container maxWidth={"lg"}>
            <Box display={"flex"} alignItems={"flex-end"} className={classes.titleArea}>
                <Box flexGrow={1}>
                    <Typography variant="h5">
                        @{user["uid"] || <Skeleton/>}
                    </Typography>
                    <Typography variant="h2">
                        {<Link component={RouterLink} to={"/user/" + uid}
                               color="inherit">{user["nickname"]}</Link> || <Skeleton/>}
                    </Typography>
                </Box>
                <Box>{privilege > 2 && <ChangePasswordButton uid={user["uid"]}/>}</Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Box display={"flex"} p={1} justifyContent="center" flexDirection={"column"} alignItems="center">
                        {user && user["avatar"] !== "" && <Card className={classes.coverCard}>
                            <CardMedia
                                component={"img"}
                                image={user["avatar"]}
                                title={user["nickname"]}
                            />
                        </Card>}
                        <Box display="flex" flexDirection={"column"} style={{ width: '100%' }}>

                            <Box display="flex" flexDirection={"row"}>
                                <Box flexGrow={1}><Typography>加入时间</Typography></Box>
                                <Box>{user && localtime(user["join_time"])}</Box>
                            </Box>
                            <Box display="flex" flexDirection={"row"}>
                                <Box flexGrow={1}><Typography>最后一次活跃</Typography></Box>
                                <Box>{user && localtime(user["goo_timestamp"])}</Box>
                            </Box>
                            <Box display="flex" flexDirection={"row"}>
                                <Box flexGrow={1}><Typography>权限</Typography></Box>
                                <Box>{user && user["privilege"]}</Box>
                            </Box>
                            <Box>
                                <Typography paragraph>{user && user["introduction"]}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Typography variant="h5" style={{marginBottom: "2rem"}}>任务</Typography>
                    <Box display="flex" style={{width: "100%"}} flexDirection="column">
                        {tasks && tasks.map((task, key) => <TaskListItem task={task} key={key}/>)}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
