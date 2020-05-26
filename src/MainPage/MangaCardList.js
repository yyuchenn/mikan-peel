import React, {useState} from "react";
import Box from "@material-ui/core/Box";

import MangaCard from "./MangaCard";
import axios from "axios";
import {setBusy, setSnackbar} from "../controller/site";
import {API_MANGA} from "../constant";
import {useDispatch, useSelector} from "react-redux";

export default function MangaCardList(props) {
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
                typeof res.manga === "object" && setMangas(res.manga);
                }
            ).catch(err => {
                dispatch(setSnackbar("获取漫画列表失败", "error"));
            }).finally(() => dispatch(setBusy(false)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
            <Box display={"flex"} flexWrap={"wrap"}
                 justifyContent={"center"} alignItems={"center"}>
                {mangas.map((manga) => {
                    if (!manga.cherry || showCherry)
                        return (<MangaCard manga={manga}/>);
                })}
            </Box>
    );
}