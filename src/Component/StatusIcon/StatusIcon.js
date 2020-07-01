import React from "react";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from "@material-ui/icons/Done";
import LockIcon from '@material-ui/icons/Lock';


export default function StatusIcon(props) {
    const {status, ...others} = props;

    return (<>
        {status === 0 && <EditIcon {...others}/>}
        {status === 1 && <DoneIcon {...others}/>}
        {status === 2 && <LockIcon {...others}/>}
    </>);
}