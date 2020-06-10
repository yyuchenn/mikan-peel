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
        }}/>
        );
}