import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import ChapterStepper from "../ChapterStepper/ChapterStepper";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
}));

export default function ChapterPage(props) {
    const classes = useStyles();
    const {mid, cid, chapter} = props;


    return (
        <div className={classes.root}>
            <ChapterStepper chapter={chapter}/>
        </div>
    );
}
