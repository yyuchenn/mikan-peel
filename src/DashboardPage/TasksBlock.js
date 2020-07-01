import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setBusy, setSnackbar} from "../controller/site";
import axios from "axios";
import {API_USER} from "../constant";
import {tokenHeader} from "../controller/user";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {tableIcons} from "../Component/MaterialTable/tableIcons";
import {localtime_exact} from "../controller/utils";
import MaterialTable from "material-table";
import {useHistory} from "react-router";
import StatusIcon from "../Component/StatusIcon/StatusIcon";

export function Tasks(props) {
    const [tasks, setTasks] = React.useState();
    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();
    const history = useHistory();

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
    </>
}