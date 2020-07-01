import React from "react";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import lime from "@material-ui/core/colors/lime";
import orange from "@material-ui/core/colors/orange";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";

function backgroundColor(n) {
    switch (n) {
        case 0:
            return red[500];
        case 1:
            return pink[300];
        case 2:
            return purple[500];
        case 3:
            return indigo[900];
        case 4:
            return blue[500];
        case 5:
            return cyan[500];
        case 6:
            return teal[500];
        case 7:
            return lime[600];
        case 8:
            return orange[500];
        case 9:
            return brown[500];
        case 10:
            return grey[500];
        default:
            return grey[200];
    }
}

function textColor(n) {
    switch (n) {
        case 0:
            return "white";
        case 1:
            return "white";
        case 2:
            return "white";
        case 3:
            return "white";
        case 4:
            return "white";
        case 5:
            return "black";
        case 6:
            return "white";
        case 7:
            return "black";
        case 8:
            return "black";
        case 9:
            return "white";
        case 10:
            return "black";
        default:
            return "black";
    }
}

export default function AvatarIcon(props) {
    const {avatar, name} = props;

    const hashCode = (str) => {
        let hash = 0, i, chr;
        for (i = 0; i < str.length; i++) {
            chr   = str.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };

    return (
        <Avatar alt={name} src={avatar} {...props}
        style={{color: textColor(hashCode(name) % 11),
        backgroundColor: backgroundColor(hashCode(name) % 11)}}>{name[0] ? name[0] : "柑"}</Avatar>
    );
}