import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Box from "@material-ui/core/Box";
import EditChapterButton from "../ChapterList/EditChapterButton";
import UserChip from "../../Component/UserChip/UserChip";
import {API_MANGA} from "../../constant";
import DeleteButton from "../../Component/DeleteButton/DeleteButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    details: {
        alignItems: 'center',
    },
    staffItem: {
        marginRight: theme.spacing(1),
    },
    summary: {
        width: '100%',
    },
}));

export default function ChapterInfo(props) {
    const classes = useStyles();
    const {chapter, adminAuth} = props;

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="chapter-summary">
                    <Typography className={classes.heading} noWrap>{chapter["name"]}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <Box display="flex" flexDirection="column" className={classes.summary}>
                        <Typography>Staff</Typography>
                        <Box display="flex" alignItems="center">
                            {chapter["tasks"].map((task, key) => {
                                if (task["accept_by"]["uid"] !== "") {
                                    return <span className={classes.staffItem} key={key}>
                                        <span>{task["name"]}</span><UserChip user={task["accept_by"]} size="small"/>
                                    </span>
                                }
                            })}
                        </Box>
                        <Typography>備考</Typography>
                        <Typography className={classes.secondaryHeading}>{chapter["ps"]}</Typography>
                    </Box>
                </ExpansionPanelDetails>
                {adminAuth && <>
                    <Divider/>
                    <ExpansionPanelActions>
                        <DeleteButton api={API_MANGA + "/" + chapter["mid"] + "/chapter/" + chapter["id"]} name="章节"
                                      callback={"/manga/" + chapter["mid"]} className={classes.button} size="small" variant="outlined"/>
                        <EditChapterButton chapter={chapter}/>
                    </ExpansionPanelActions>
                </>}
            </ExpansionPanel>
        </div>
    );
}
