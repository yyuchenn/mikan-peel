import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Background from "../Background";
import {makeStyles} from "@material-ui/core/styles";
import MangaCard from "./MangaCard";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles((theme) => ({
    titleArea: {
        margin: theme.spacing(5),
    },
    filterArea: {
        margin: theme.spacing(5),
    },
    cardsArea: {
        margin: theme.spacing(5)
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));

export default function MainPage(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div>
            <Box display={"flex"} className={classes.titleArea}>
            <Box  flexGrow={1}>
                <Typography variant="h5">AAAA</Typography>
                <Typography variant="h1">BBB</Typography>
            </Box>
                <Box alignSelf={"flex-end"}>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="筛选选项"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Box>
            </Box>
            <Box>
                <Collapse className={classes.filterArea} in={expanded} timeout="auto" unmountOnExit>
                    高级搜索框
                </Collapse>
            </Box>
            <Box display={"flex"} flexWrap={"wrap"}
                 justifyContent={"center"} alignItemsclassName={classes.cardsArea}>
                <MangaCard/>
                <MangaCard/>
                <MangaCard/>
                <MangaCard/>
                <MangaCard/>
                <MangaCard/>
            </Box>
        </div>
    );
}