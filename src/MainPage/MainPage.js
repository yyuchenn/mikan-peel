import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import clsx from "clsx";
import Collapse from "@material-ui/core/Collapse";
import NewMangaButton from "./NewMangaButton";
import FilterBox from "./FilterBox";

import {useDispatch, useSelector} from "react-redux";
import MangaCardList from "./MangaCardList";
import {setShowCherry} from "../controller/site";

const useStyles = makeStyles((theme) => ({
    titleArea: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
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
    const privilege = useSelector(state => state.user.privilege);
    const [expanded, setExpanded] = React.useState(false);
    const showCherry = useSelector(state => state.site.showCherry);
    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onChangeCherry = (event) => {
        dispatch(setShowCherry(event.target.checked));
    };

    return (
        <Container>
            <Box display={"flex"} className={classes.titleArea}>
                <Box flexGrow={1}>
                    <Typography variant="h5">汉化工房</Typography>
                    <Typography variant="h1">九九组</Typography>

                </Box>
                <Box alignSelf={"flex-end"}>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="更多选项"
                    >
                        <ExpandMoreIcon/>
                    </IconButton>
                </Box>
            </Box>

            <Collapse className={classes.filterArea} in={expanded} timeout="auto" unmountOnExit>

                <Box flexGrow={1}>
                    <FilterBox/>
                </Box>
                <Box display={"flex"} justifyContent="flex-end">
                    {privilege >= 2 && <NewMangaButton/>}
                    <FormControlLabel
                        checked={showCherry}
                        onChange={onChangeCherry}
                        value={showCherry}
                        size={"small"}
                        control={<Switch color="primary"/>}
                        label={showCherry ? "显示夏蜜樱桃" : "隐藏夏蜜樱桃"}
                        labelPlacement="start"/>
                </Box>
            </Collapse>

            <MangaCardList/>
        </Container>
    );
}