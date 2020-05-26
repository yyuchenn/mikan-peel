import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ChapterListItem from "./ChapterListItem";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";
import {api_chapter} from "../../constant";
import {setSnackbar} from "../../controller/site";
import {useDispatch} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));


export default function ChapterList(props) {
    const classes = useStyles();
    const {mid, adminAuth} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const listName = (value) => {
        console.log(value);
        switch (value) {
            case 0: return "ongoing";
            case 1: return "finished";
            default: return "ongoing";
        }
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color={"transparent"}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="未完成"/>
                    <Tab label="已完成"/>
                </Tabs>
            </AppBar>
            <SubChapterList mid={mid} listName={listName(value)} adminAuth={adminAuth}/>

        </div>
    );
}

export function SubChapterList(props) {
    const {mid, listName, adminAuth} = props;
    const [loading, setLoading] = useState(true);
    const [chapters, setChapters] = useState([]);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setLoading(true);
        setChapters([]);
        axios.get(api_chapter(mid, listName), {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    typeof res[listName] === "object" && setChapters(res[listName]);
                }
            ).catch(err => {
            dispatch(setSnackbar("拉取列表失败, 请刷新重试", "error"));
        }).finally(() => setLoading(false));
    },[listName]);

    return <>{loading ? <LinearProgress/> : chapters.map((chapter) =>
            (<ChapterListItem chapter={chapter} adminAuth={adminAuth}/>)
        )}</>;
}