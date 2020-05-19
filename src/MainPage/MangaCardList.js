import React, {useState} from "react";
import Box from "@material-ui/core/Box";

import MangaCard from "./MangaCard";
import axios from "axios";
import {setSnackbar} from "../controller/site";
import {API_MANGA} from "../constant";
import {useDispatch} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function MangaCardList(props) {
    const [mangas, setMangas] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    React.useEffect(  () => {
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
            }).finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
            <Box display={"flex"} flexWrap={"wrap"}
                 justifyContent={"center"} alignItems={"center"}>
                {loading && <LinearProgress variant="query" style={{width: "100%"}}/> }
                {mangas.map((manga) => (<MangaCard manga={manga}/>))}
            </Box>
    );
}