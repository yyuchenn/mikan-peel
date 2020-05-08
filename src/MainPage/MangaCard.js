import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import cover from '../temp/cover.jpeg';
import {Chip} from "@material-ui/core";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 175,
        [theme.breakpoints.up("md")]: {
            maxWidth: 275,
        },
        position: "relative",
        margin: theme.spacing(2)
    },
    labels: {
        position: "absolute",
        right: theme.spacing(0),
        top: theme.spacing(0)
    },
    label: {
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(0.5)
    },
    content: {
        width: "100%",
        position: "absolute",
        bottom: 0,
        backgroundColor: "black",
        boxShadow: "20px -20px 20px black, -20px -20px 20px black",
        opacity: 0.8
    },
    details: {
        opacity: 1,
        color: "white"
    }
}));

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component={"img"}
                    image={cover}
                    title={"食物语食物语食物语食物语食物语"}
                />
                <Box display={"flex"} flexDirection={"row-reverse"} flexWrap="wrap" className={classes.labels}>
                    <Chip className={classes.label} label={"进行中"}/>
                    <Chip className={classes.label} label={"缺翻译"}/>
                    <Chip className={classes.label} label={"停滞"}/>
                </Box>
                <CardContent className={classes.content}>
                    <div className={classes.details}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {"食物语"}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
