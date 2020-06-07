import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
import UserChip from "../Component/UserChip/UserChip";

import {localtime} from "../controller/utils";
import Stackedit from "stackedit-js";

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

export default function Metadata(props) {
    const classes = useStyles();
    const {manga, adminAuth} = props;
    const [expanded, setExpanded] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Box display={"flex"} flexDirection={"column"} className={classes.root}>
            <Box display={"flex"}>
                <Box flexGrow={1}>
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
                        <ExpandMoreIcon/>
                    </IconButton>
                </Box>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ExpansionPanelDetails className={classes.details}>
                    <Box display="flex" flexDirection={"column"} style={{ width: '100%' }}>

                        <Box display="flex" flexDirection={"row"}>
                            <Box flexGrow={1}><Typography>制作人</Typography></Box>
                            <Box><UserChip user={manga.producer} size="small"/></Box>
                        </Box>
                        <Box display="flex" flexDirection={"row"}>
                            <Box flexGrow={1}><Typography>开坑时间</Typography></Box>
                            <Box>{localtime(manga.create_on)}</Box>
                        </Box>
                        <Box display="flex" flexDirection={"row"}>
                            <Box flexGrow={1}><Typography>最后一次活跃</Typography></Box>
                            <Box>{localtime(manga.last_update)}</Box>
                        </Box>
                        <Box>
                            <Typography paragraph>{manga.ps}</Typography>
                        </Box>
                    </Box>
                </ExpansionPanelDetails>
                <Divider/>
                <ExpansionPanelActions>
                    {adminAuth && <EditMangaButton manga={manga}/>}
                </ExpansionPanelActions>
            </Collapse>
        </Box>
    );
}
