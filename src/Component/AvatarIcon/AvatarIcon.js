import React from "react";
import Avatar from "@material-ui/core/Avatar";
import useTheme from "@material-ui/core/styles/useTheme";
import deepPurple from "@material-ui/core/colors/deepPurple";

export default function AvatarIcon(props) {
    const {avatar, name} = props;
    const theme = useTheme();

    return (
        <Avatar alt={name} src={avatar} {...props}
        style={{color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500]}}>{name[0] ? name[0] : "柑"}</Avatar>
    );
}