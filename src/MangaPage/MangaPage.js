import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from "@material-ui/core/CircularProgress";
import {useParams} from "react-router-dom";

import cover from '../temp/cover.jpeg';
import NewChapterButton from "./NewChapterButton";
import ChapterList from "./ChapterList/ChapterList";
import Metadata from "./Metadata";
import axios from "axios";
import {API_MANGA} from "../constant";
import {setSnackbar} from "../controller/site";
import {useDispatch} from "react-redux";


const useStyles = makeStyles((theme) => ({
    titleArea: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(1),
    },
    mainArea: {},
    coverCard: {
        maxWidth: 275,
        position: "relative"
    }
}));

export default function MangaPage(props) {
    const classes = useStyles();
    const {mid} = useParams();
    const dispatch = useDispatch();

    const [manga, setManga] = useState({});

    React.useEffect(  () => {
        axios.get(API_MANGA + "/" + mid, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setManga(res);
                }
            ).catch(err => {
            dispatch(setSnackbar("获取漫画信息失败", "error"));
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth={"lg"}>
            <Box display={"flex"} alignItems={"flex-end"} className={classes.titleArea}>
                <Box flexGrow={1}>
                    <Typography variant="h5">汉化工房</Typography>
                    <Typography variant="h2">{manga.name || <CircularProgress/>}</Typography>
                </Box>
                <Box><NewChapterButton/></Box>
            </Box>
            <Grid container className={classes.mainArea}>
                <Grid spacing={2} xs={12} md={3}>
                    <Box display={"flex"} p={1} justifyContent="center" flexDirection={"column"} alignItems="center">
                        <Card className={classes.coverCard}>
                            <CardMedia
                                component={"img"}
                                image={cover}
                                title={manga.name || <CircularProgress/>}
                            />
                        </Card>
                        <Metadata/>
                    </Box>
                </Grid>
                <Grid xs={12} md={9}>
                    <ChapterList/>
                </Grid>
            </Grid>
        </Container>
    );
}