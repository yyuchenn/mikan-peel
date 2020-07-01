import React from "react";
import MaterialTable from "material-table";
import {useHistory} from "react-router";
import {tableIcons} from "../Component/MaterialTable/tableIcons";

export default function UsersTable(props) {
    const history = useHistory();
    const {users} = props;

    return (
        <MaterialTable icons={tableIcons} columns={[
            {title: "昵称", field: "nickname"},
            {title: "用户ID", field: "uid"},
        ]} options={{
            pageSize: 20
        }} data={users} components={{
            Toolbar: props => (<></>)
        }} onRowClick={(event, rowData, togglePanel) => {
            history.push("/user/" + rowData["uid"]);
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