import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    placeholder: {
        height: theme.spacing(4)
    }
}));
export default function Footer(props) {
    const {ver1, ver2} = props;
    const classes = useStyles();
    return (
        <div>
            <div className={classes.placeholder}/>
            <Divider />
            <Typography variant="body2" color="textSecondary" align="center">
                Mikan v{ver1}, Mikan-Peel v{ver2}
            </Typography>
        </div>
    );
}