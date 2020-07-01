import Typography from "@material-ui/core/Typography";
import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";
import {setBusy, setSnackbar} from "../controller/site";
import axios from "axios";
import {API_BASE, API_USER} from "../constant";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    placeholder: {
        height: theme.spacing(4)
    }
}));
export default function Footer(props) {
    const {ver} = props;
    const classes = useStyles();
    const [mikanVer, setMikanVer] = React.useState("0");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_BASE + "/ver", {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setMikanVer(res["version"]);
                }
            ).catch(err => {
            dispatch(setSnackbar("获取后台版本失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
    }, []);

    return (
        <div>
            <div className={classes.placeholder}/>
            <Divider />
            <Typography variant="body2" color="textSecondary" align="center">
                Mikan v{mikanVer}, Mikan-Peel v{ver}
            </Typography>
        </div>
    );
}