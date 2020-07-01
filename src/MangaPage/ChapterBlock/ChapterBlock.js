import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory, useParams} from "react-router-dom";
import TaskBlock from "./TaskBlock/TaskBlock";
import {setBusy, setSnackbar} from "../../controller/site";
import axios from "axios";
import {API_MANGA} from "../../constant";
import {useDispatch} from "react-redux";
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ChapterInfo from "./ChapterInfo";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
}));

export default function ChapterBlock(props) {
    const classes = useStyles();
    const {manga, adminAuth} = props;
    const {cid, tid} = useParams();
    const [chapter, setChapter] = useState();
    const dispatch = useDispatch();
    const history = useHistory();
    const [order, setOrder] = useState(0);

    React.useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_MANGA + "/" + manga["id"] + "/chapter/" + cid, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    for (let i = 0; i < res["tasks"].length; i++) {
                        if (res["tasks"][i]["id"] === tid) {
                            setOrder(i);
                            break;
                        }
                    }
                    setChapter(res);
                }
            ).catch(err => {
            dispatch(setSnackbar("获取章节信息失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleBack = () => {
        history.replace("/manga/" + manga["id"] + "/" + chapter["id"] + "/" + chapter["tasks"][order - 1]["id"]);
        setOrder(order - 1);
    };

    const handleNext = () => {
        history.replace("/manga/" + manga["id"] + "/" + chapter["id"] + "/" + chapter["tasks"][order + 1]["id"]);
        setOrder(order + 1);
    };


    return (
        <div className={classes.root}>
            {chapter && <ChapterInfo chapter={chapter} mid={manga.id} adminAuth={adminAuth}/>}
            {chapter && <MobileStepper position="static" activeStep={order} backButton={
                <Button size="small" onClick={handleBack} disabled={order === 0}>
                    <KeyboardArrowLeft/>上一个任务
                </Button>
            } nextButton={
                <Button size="small" onClick={handleNext} disabled={order === chapter["tasks"].length - 1}>
                    下一个任务<KeyboardArrowRight/>
                </Button>
            } steps={chapter["tasks"].length}/>}
            {chapter && <TaskBlock chapter={chapter} {...props} tid={chapter["tasks"][order]["id"]}/>}
        </div>
    );
}
