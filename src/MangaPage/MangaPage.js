import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import {Route, Switch, useParams, useRouteMatch, Link as RouterLink} from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";
import cover from "../cover.jpeg";

import NewChapterButton from "./NewChapterButton";
import ChapterList from "./ChapterList/ChapterList";
import Metadata from "./Metadata";
import axios from "axios";
import {API_MANGA} from "../constant";
import {setBusy, setSnackbar} from "../controller/site";
import {useDispatch, useSelector} from "react-redux";
import TagChip from "../Component/TagChip/TagChip";
import {setTitle} from "../controller/utils";
import AddTagChip from "../Component/TagChip/AddTagChip";
import Link from "@material-ui/core/Link";
import ChapterBlock from "./ChapterBlock/ChapterBlock";


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

export default function MangaPage(props) {
    const classes = useStyles();
    const {mid} = useParams();
    const {path} = useRouteMatch();
    const dispatch = useDispatch();
    const privilege = useSelector(state => state.user.privilege);
    const uid = useSelector(state => state.user.uid);
    const [adminAuth, setAdminAuth] = useState(false);

    const [manga, setManga] = useState({});

    React.useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_MANGA + "/" + mid, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setManga(res);
                    setTitle(res.name);
                }
            ).catch(err => {
            dispatch(setSnackbar("获取漫画信息失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        setAdminAuth(privilege >= 2 || (typeof manga.producer === "object" && manga.producer.uid === uid));
    }, [privilege, uid, manga]);

    return (
        <Container maxWidth={"lg"}>
            <Box display={"flex"} alignItems={"flex-end"} className={classes.titleArea}>
                <Box flexGrow={1}>
                    <Typography variant="h5">
                        {(typeof manga.tags === "object" && manga.tags.map((tag, key) => {
                            return <TagChip key={key} size="small" tag={tag} className={classes.label}
                                            deletable={adminAuth ? "true" : "false"} mid={mid}/>;
                        })) || <Skeleton/>}
                        {typeof manga.tags === "object" && adminAuth &&
                        <AddTagChip className={classes.label} level={0} mid={manga["id"]}/>}
                    </Typography>
                    <Typography variant="h2">
                        {<Link component={RouterLink} to={"/manga/" + manga["id"]}
                               color="inherit">{manga.name}</Link> || <Skeleton/>}
                    </Typography>
                </Box>
                <Switch>
                    <Route exact path={path}>
                        <Box>{adminAuth && <NewChapterButton mid={manga["id"]}/>}</Box>
                    </Route>
                </Switch>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Box display={"flex"} p={1} justifyContent="center" flexDirection={"column"} alignItems="center">
                        <Card className={classes.coverCard}>
                            <CardMedia
                                component={"img"}
                                image={manga.cover || cover}
                                title={manga.name}
                            />
                        </Card>
                        <Metadata manga={manga} adminAuth={adminAuth}/>
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Switch>
                        <Route exact path={path}>
                            <ChapterList mid={mid} adminAuth={adminAuth}/>
                        </Route>
                        <Route path={`${path}/:cid/:tid`}>
                            {manga["id"] && <ChapterBlock adminAuth={adminAuth} manga={manga}/>}
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </Container>
    );
}
