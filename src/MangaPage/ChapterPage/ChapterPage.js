import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ChapterStepper from "../ChapterStepper/ChapterStepper";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
}));

export default function ChapterPage(props) {
    const classes = useStyles();
    const {chapter} = props;


    return (
        <div className={classes.root}>
            <ChapterStepper chapter={chapter}/>
        </div>
    );
}
