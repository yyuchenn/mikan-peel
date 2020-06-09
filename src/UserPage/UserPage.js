import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {useParams, Link as RouterLink} from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import cover from "../cover.jpeg";

import NewChapterButton from "../MangaPage/NewChapterButton";
import axios from "axios";
import {API_USER} from "../constant";
import {setBusy, setSnackbar} from "../controller/site";
import {useDispatch, useSelector} from "react-redux";
import {setTitle} from "../controller/utils";
import Link from "@material-ui/core/Link";


const useStyles = makeStyles((theme) => ({
    titleArea: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(1),
    },
    coverCard: {
        maxWidth: 275,
        position: "relative"
    },
    label: {
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(0.5)
    }
}));

export default function UserPage(props) {
    const classes = useStyles();
    const {uid} = useParams();
    const dispatch = useDispatch();
    const privilege = useSelector(state => state.user.privilege);

    const [user, setUser] = useState({});

    React.useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_USER + "/" + uid, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setUser(res);
                    setTitle(res.nickname);
                }
            ).catch(err => {
            dispatch(setSnackbar("获取用户信息失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container maxWidth={"lg"}>
            <Box display={"flex"} alignItems={"flex-end"} className={classes.titleArea}>
                <Box flexGrow={1}>
                    <Typography variant="h5">
                        @{user["uid"] || <Skeleton/>}
                    </Typography>
                    <Typography variant="h2">
                        {<Link component={RouterLink} to={"/user/" + uid}
                               color="inherit">{user["nickname"]}</Link> || <Skeleton/>}
                    </Typography>
                </Box>
                <Box>{privilege > 2 && <NewChapterButton/>}</Box>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Box display={"flex"} p={1} justifyContent="center" flexDirection={"column"} alignItems="center">
                        {user && user["avatar"] !== "" && <Card className={classes.coverCard}>
                            <CardMedia
                                component={"img"}
                                image={user["avatar"]}
                                title={user["nickname"]}
                            />
                        </Card>}
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>

                </Grid>
            </Grid>
        </Container>
    );
}
