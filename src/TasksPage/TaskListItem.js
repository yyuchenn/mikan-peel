import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import TagChip from "../Component/TagChip/TagChip";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}));

export default function TaskListItem(props) {
    const classes = useStyles();
    const {task} = props;


    return (
        <Paper className={classes.root}>
        <ExpansionPanelSummary component={Link} to={"/manga/" + task["mid"] + "/" + task["cid"] + "/" + task["id"]} {...props}>
            <Box display="flex" flexDirection="row" className={classes.root}>
                <Box flexGrow={1}>
                    <Typography>
                        {task["mname"]}{task["cname"]}{task["name"]}
                    </Typography>
                </Box>
                <Box>
                    {task["tags"].map((tag, key) => {
                        return <TagChip tag={tag} size="small"/>;
                    })}
                </Box>
            </Box>
        </ExpansionPanelSummary>
        </Paper>
    );
}
