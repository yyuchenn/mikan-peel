import React from "react";
import Chip from "@material-ui/core/Chip";

export default function UserChip(props) {
    const {user, onDelete, size} = props;

    if (user === undefined) return (<></>);

    return (
        <Chip variant="outlined" size={size} label={user.username} onDelete={onDelete}/>
    );
}