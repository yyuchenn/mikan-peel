import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ChapterListItem from "./ChapterListItem";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    }
}));

function getChapterList() {
    return [{
        name: "第1话", id: "1",
        tasks: [{name: "图源", type: 1, status: 1, id: "1", nominee: "z酱"},
            {name: "翻译", type: 2, status: 2, id: "2", nominee: "y酱"},
            {name: "校对", type: 3, status: 3, id: "3"},
            {name: "嵌字", type: 4, status: 0, id: "5"},
            {name: "审核", type: 5, status: 0, id: "9", nominee: "x酱"},
            {name: "发布", type: 6, status: 0, id: "10"}]
    }];
}

export default function ChapterList() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const chapters = getChapterList();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color={"transparent"}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="未完成"/>
                    <Tab label="已完成"/>
                </Tabs>
            </AppBar>
            <div hidden={value !== 0}>
                {chapters.map((chapter, index) => (
                    <ChapterListItem chapter={chapter}/>
                ))}
            </div>
            <div hidden={value !== 1}>
                {chapters.map((chapter, index) => (
                    <ChapterListItem chapter={chapter}/>
                ))}
            </div>
        </div>
    );
}
