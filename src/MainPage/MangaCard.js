import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import cover from '../cover.jpeg';
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import TagChip from "../Component/TagChip/TagChip";

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
        // boxShadow: "20px -20px 20px black, -20px -20px 20px black",
        opacity: 0.8
    },
    details: {
        opacity: 1,
        color: "white"
    }
}));

export default function MangaCard(props) {
    const classes = useStyles();
    const {manga} = props;
    const [img, changeImg] = useState(cover);

    React.useEffect(() => {
        const img = new Image();
        img.src = manga.cover;
        img.onload = function () {
            changeImg(manga.cover);
        }
    }, []);

    return (
        <Card className={classes.root}
              component={Link} to={"/manga/" + manga.id}>
            <CardActionArea>
                <CardMedia
                    component={"img"}
                    image={img}
                    title={manga.name}
                />
                <Box display={"flex"} flexDirection={"row-reverse"} flexWrap="wrap" className={classes.labels}>
                    {typeof manga.tags === "object" && manga.tags.map((tag, key) =>
                        (<TagChip className={classes.label} tag={tag} size="small" key={key}/>))}
                </Box>
                <CardContent className={classes.content}>
                    <div className={classes.details}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {manga.name || <CircularProgress/>}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
