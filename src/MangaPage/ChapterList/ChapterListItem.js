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
import EditChapterButton from "./EditChapterButton";

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
    title: {
        width: '20%',
    },
    summary: {
        width: '80%',
    },
}));

export default function ChapterListItem(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const {chapter, adminAuth} = props;

    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.title}>
                        <Typography className={classes.heading} noWrap>{chapter["name"]}</Typography>
                    </div>
                    <div className={classes.summary}>
                        <Typography className={classes.secondaryHeading} noWrap>翻译</Typography>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <ChapterStepper vertical={!isDesktop} chapter={chapter}/>
                </ExpansionPanelDetails>
                {adminAuth && <>
                    <Divider/>
                    <ExpansionPanelActions>
                        <EditChapterButton chapter={chapter}/>
                    </ExpansionPanelActions>
                </>}
            </ExpansionPanel>
        </div>
    );
}
