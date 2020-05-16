import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Collapse from "@material-ui/core/Collapse";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import EditMangaButton from "./EditMangaButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(1)
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
}));

export default function Metadata() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box display={"flex"} flexDirection={"column"} className={classes.root}>
        <Box display={"flex"}>
            <Box  flexGrow={1}>
                <Typography variant="h5">详细信息</Typography>
            </Box>
            <Box alignSelf={"flex-end"}>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="详情"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </Box>
        </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ExpansionPanelDetails className={classes.details}>
                    <Typography>开坑日期：2019年4月</Typography>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <EditMangaButton/>
                </ExpansionPanelActions>
            </Collapse>
        </Box>
    );
}
