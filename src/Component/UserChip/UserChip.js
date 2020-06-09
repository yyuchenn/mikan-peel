import React from "react";
import Chip from "@material-ui/core/Chip";
import AvatarIcon from "../AvatarIcon/AvatarIcon";
import {useHistory} from "react-router-dom";

export default function UserChip(props) {
    const {user} = props;
    const history = useHistory();

    if (user === undefined) return (<></>);

    const handleClick = () => {
        history.push("/user/" + user["uid"]);
    };

    return (
        <Chip variant="outlined" aria-label="User Chip" onClick={handleClick} clickable
              avatar={<AvatarIcon avatar={user["avatar"]} name={user["nickname"]}/>} label={user["nickname"]} {...props}/>
    );
}