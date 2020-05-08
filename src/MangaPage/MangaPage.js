import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import cover from '../temp/cover.jpeg';
import NewChapterButton from "./NewChapterButton";
import ChapterList from "./ChapterList/ChapterList";
import Metadata from "./Metadata";

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

    return (
        <Container maxWidth={"lg"}>
            <Box display={"flex"} alignItems={"flex-end"} className={classes.titleArea}>
                <Box flexGrow={1}>
                    <Typography variant="h5">汉化工房</Typography>
                    <Typography variant="h2">海色进行曲</Typography>
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
                                title={"食物语"}
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