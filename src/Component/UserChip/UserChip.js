import React from "react";
import Chip from "@material-ui/core/Chip";
import AvatarIcon from "../AvatarIcon/AvatarIcon";

export default function UserChip(props) {
    const {user} = props;

    if (user === undefined) return (<></>);

    return (
        <Chip variant="outlined" aria-label="User Chip"
              avatar={<AvatarIcon avatar={user["avatar"]} name={user["nickname"]}/>} label={user["nickname"]} {...props}/>
    );
}