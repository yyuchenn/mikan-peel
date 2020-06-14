import React, {useEffect} from "react";
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
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import NewMangaButton from "./NewMangaButton";

import {useDispatch, useSelector} from "react-redux";
import MangaCardList from "./MangaCardList";
import {setShowCherry} from "../controller/site";
import {setTitle} from "../controller/utils";

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
    const [showFinished, setShowFinished] = React.useState(false);
    const showCherry = useSelector(state => state.site.showCherry);
    const broadcast = useSelector(state => state.site.broadcast);
    const dispatch = useDispatch();

    useEffect(() => setTitle(""), []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onChangeCherry = (event) => {
        dispatch(setShowCherry(event.target.checked));
    };

    const onChangeFinish = (event) => {
        setShowFinished(event.target.checked);
    };

    return (
        <Container>
            <Box display={"flex"} className={classes.titleArea}>
                <Box flexGrow={1}>
                    <Typography variant="h5">汉化工房</Typography>
                    <Typography variant="h2">九九组</Typography>
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
                </Box>
                <Box display={"flex"} justifyContent="flex-end">
                    {privilege >= 2 && <NewMangaButton/>}
                    <FormControlLabel
                        checked={showCherry}
                        onChange={onChangeCherry}
                        value={showCherry}
                        size={"small"}
                        control={<Switch color="primary"/>}
                        label="显示夏蜜樱桃的作品"
                        labelPlacement="start"/>
                    <FormControlLabel
                        checked={showFinished}
                        onChange={onChangeFinish}
                        value={showCherry}
                        size={"small"}
                        control={<Switch color="primary"/>}
                        label="显示不再更新的作品"
                        labelPlacement="start"/>
                </Box>
            </Collapse>
            {broadcast !== "" && 
            <Alert variant="outlined" severity="info">
                <AlertTitle>公告</AlertTitle>
                {broadcast}
            </Alert>}
            <MangaCardList showFinished={showFinished}/>
        </Container>
    );
}