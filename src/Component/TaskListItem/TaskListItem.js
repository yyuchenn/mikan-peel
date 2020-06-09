import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import TagChip from "../TagChip/TagChip";
import {Link} from "react-router-dom";
import {localtime_exact} from "../../controller/utils";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    taskListItem: {
        marginTop: theme.spacing(1)
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
                {task["status"] === 0 && task["accept_by"]["uid"] === "" &&
                <Box>
                    {task["tags"].map((tag, key) => {
                        return <TagChip tag={tag} size="small" key={key}/>;
                    })}
                </Box>}
                {task["status"] === 0 && task["accept_by"]["uid"] !== "" &&
                <Box>
                    <Typography variant="subtitle1">{localtime_exact(task["accept_on"])}</Typography>
                </Box>}
            </Box>
        </ExpansionPanelSummary>
        </Paper>
    );
}
