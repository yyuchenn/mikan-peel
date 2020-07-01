import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";

import MangaCard from "./MangaCard";
import axios from "axios";
import {setBusy, setSnackbar} from "../controller/site";
import {API_MANGA} from "../constant";
import {useDispatch, useSelector} from "react-redux";

export default function MangaCardList(props) {
    const {showFinished} = props;
    const [mangas, setMangas] = useState([]);
    const showCherry = useSelector(state => state.site.showCherry);
    const dispatch = useDispatch();

    React.useEffect(  () => {
        dispatch(setBusy(true));
         axios.get(API_MANGA, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                typeof res.mangas === "object" && setMangas(res.mangas);
                }
            ).catch(err => {
                dispatch(setSnackbar("获取漫画列表失败", "error"));
            }).finally(() => dispatch(setBusy(false)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
            <Grid container spacing={1}>
                {mangas.map((manga) => {
                    if ((!manga.cherry || showCherry) && (manga.status === 0 || showFinished))
                        return (<Grid item xs={6} sm={3} md={3} lg={2} key={manga.id}><MangaCard manga={manga}/></Grid>);
                })}
            </Grid>
    );
}