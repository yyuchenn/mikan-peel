import red from '@material-ui/core/colors/red';
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import indigo from "@material-ui/core/colors/indigo";
import blue from '@material-ui/core/colors/blue';
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import lime from "@material-ui/core/colors/lime";
import orange from "@material-ui/core/colors/orange";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";

export function tagColor(n) {
    switch (n) {
        case "red":
            return red[500];
        case "pink":
            return pink[300];
        case "purple":
            return purple[500];
        case "indigo":
            return indigo[900];
        case "blue":
            return blue[500];
        case "cyan":
            return cyan[500];
        case "teal":
            return teal[500];
        case "lime":
            return lime[600];
        case "orange":
            return orange[500];
        case "brown":
            return brown[500];
        case "grey":
            return grey[500];
        default:
            return grey[200];
    }
}

export function textColor(n) {
    switch (n) {
        case "red":
            return "white";
        case "pink":
            return "white";
        case "purple":
            return "white";
        case "indigo":
            return "white";
        case "blue":
            return "white";
        case "cyan":
            return "black";
        case "teal":
            return "white";
        case "lime":
            return "black";
        case "orange":
            return "black";
        case "brown":
            return "white";
        case "grey":
            return "black";
        default:
            return "black";
    }
}