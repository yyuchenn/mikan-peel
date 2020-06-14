import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {useParams, Link as RouterLink, useHistory} from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import axios from "axios";
import {API_USER} from "../constant";
import {setBusy, setSnackbar} from "../controller/site";
import {useDispatch, useSelector} from "react-redux";
import {localtime, localtime_exact, setTitle} from "../controller/utils";
import Link from "@material-ui/core/Link";
import {tokenHeader} from "../controller/user";
import ChangePasswordButton from "../Component/ChangePasswordButton/ChangePasswordButton";
import {tableIcons} from "../Component/MaterialTable/tableIcons";
import StatusIcon from "../Component/StatusIcon/StatusIcon";
import MaterialTable from "material-table";


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
    const history = useHistory();
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
                        {tasks &&
                        <MaterialTable icons={tableIcons} columns={[
                            {title: "漫画", field: "mname"},
                            {title: "章节", field: "cname"},
                            {title: "任务", field: "name"},
                            {title: "类型", field: "type", lookup: {
                                    0: "其他",
                                    1: "图源",
                                    2: "翻译",
                                    3: "校对",
                                    4: "嵌字",
                                    5: "审核",
                                    6: "发布",
                                }},
                            {title: "上一次活跃", field: "last_update", render: task => localtime_exact(task["last_update"])},
                            {title: "状态", field: "status", render: task => <StatusIcon status={task["status"]}/>, defaultSort: "asc"}
                        ]} options={{
                            pageSize: 20,
                        }} data={tasks} components={{
                            Toolbar: props => (<></>)
                        }} onRowClick={(event, rowData, togglePanel) => {
                            history.push("/manga/" + rowData["mid"] + "/" + rowData["cid"] + "/" + rowData["id"]);
                        }} localization={{
                            grouping: {
                                placeholder: "拖拽表头至此以聚合显示...",
                                groupedBy: "聚合:"
                            },
                            pagination: {
                                labelDisplayedRows: '第{from}到{to}行 共 {count}行',
                                labelRowsSelect: '行',
                                labelRowsPerPage: '每页行数:',
                                firstAriaLabel: '首页',
                                firstTooltip: '首页',
                                previousAriaLabel: '上一页',
                                previousTooltip: '上一页',
                                nextAriaLabel: '下一页',
                                nextTooltip: '下一页',
                                lastAriaLabel: '末页',
                                lastTooltip: '末页'
                            },
                        }}/>}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
