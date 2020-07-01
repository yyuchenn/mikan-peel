import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ChapterStepper from "../ChapterStepper/ChapterStepper";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Box from "@material-ui/core/Box";
import EditChapterButton from "./EditChapterButton";
import TaskChip from "../../Component/TaskChip/TaskChip";
import {Link} from "react-router-dom";
import {API_MANGA} from "../../constant";
import DeleteButton from "../../Component/DeleteButton/DeleteButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    rootExpanded: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
    taskChip: {
        marginRight: theme.spacing(1),
    },
    summary: {
        width: '100%',
    },
}));

export default function ChapterListItem(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const {chapter, adminAuth, mid, expanded, setExpanded} = props;

    const handleExpand = () => {
        if (expanded === chapter["id"]) setExpanded("");
        else setExpanded(chapter["id"]);
    };

    return (
        <div className={expanded === chapter["id"] ? classes.rootExpanded : classes.root}>
            <ExpansionPanel TransitionProps={{ unmountOnExit: true }} expanded={expanded === chapter["id"]} onChange={handleExpand}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} aria-controls="chapter-summary">
                    <Box display="flex" flexDirection="row" className={classes.summary}>
                        <Box flexGrow={1}>
                            <Typography className={classes.heading} noWrap>{chapter["name"]}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row">
                            {chapter["tasks"].map((task, key) => {
                                return task["status"] === 0 &&
                                    <TaskChip label={task} key={key} className={classes.taskChip} component={Link} />
                            })}
                        </Box>
                    </Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <Box  display="flex" flexDirection="column" className={classes.summary}>
                    <ChapterStepper vertical={!isDesktop} chapter={chapter} mid={mid}/>
                    <Typography className={classes.secondaryHeading}>{chapter["ps"]}</Typography>
                    </Box>
                </ExpansionPanelDetails>
                {adminAuth && <>
                    <Divider/>
                    <ExpansionPanelActions>
                        <DeleteButton api={API_MANGA + "/" + mid + "/chapter/" + chapter["id"]}
                                      callback={"/manga/" + mid} className={classes.button} size="small" variant="outlined" reload/>
                        <EditChapterButton chapter={chapter}/>
                    </ExpansionPanelActions>
                </>}
            </ExpansionPanel>
        </div>
    );
}
