import React from "react";
import MaterialTable from "material-table";
import {useHistory} from "react-router";
import {tableIcons} from "../Component/MaterialTable/tableIcons";
import {localtime_exact} from "../controller/utils";
import TagChip from "../Component/TagChip/TagChip";

export default function TasksTable(props) {
    const history = useHistory();
    const {tasks} = props;

    return (
        <MaterialTable icons={tableIcons} columns={[
            {title: "漫画", field: "mname", defaultGroupOrder: 1},
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
                }, defaultGroupOrder: 0},
            {title: "标签", field: "tags", render: task =>
                <>{task["tags"].map((tag, key) => {
                    return <TagChip tag={tag} size="small" key={key}/>;
                })}</>
                , sorting: false},
            {title: "上一次活跃", field: "last_update", render: task => localtime_exact(task["last_update"]), grouping: false},
        ]} options={{
            pageSize: 20,
            grouping: true,
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
        }}/>
    );
}