import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import {TextField} from "mui-rff";
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Leaf from "mdi-material-ui/Leaf";
import {useDispatch} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";
import {setTitle} from "../controller/utils";
import {Form} from "react-final-form";
import {setBusy, setSnackbar} from "../controller/site";
import axios from "axios";
import {API_BASE} from "../constant";
import {tokenHeader} from "../controller/user";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SignUpPage() {
    const classes = useStyles();
    let query = useQuery();
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => setTitle("注册"), []);

    let onSubmit = (values) => {
        values["icode"] = query.get("icode");
        console.log(values);
        if (values["password"] !== values["re-password"]) {
            dispatch(setSnackbar("两次密码不一致", "error"));
            return;
        }
        dispatch(setBusy(true));
        axios.post(API_BASE + "/signup", values, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            dispatch(setSnackbar("注册成功，请登录。", "success"));
            history.push("/");
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <Leaf/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    欢迎加入汉化工房九九组
                </Typography>
                <Form onSubmit={onSubmit} render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <TextField variant="outlined" margin="normal" required fullWidth label="用户ID" name="uid"
                                   autoComplete="uid" autoFocus helperText="ID将被用于登录"/>
                        <TextField variant="outlined" margin="normal" required fullWidth label="昵称" name="nickname"/>
                        <TextField variant="outlined" margin="normal" required fullWidth name="password" label="密码"
                                   type="password" autoComplete="current-password" helperText="密码是6-32位字母、数字、空格或如下特殊字符的组合。-+_!=@#$%^&*?([)].;:"/>
                        <TextField variant="outlined" margin="normal" required fullWidth name="re-password" label="重复密码"
                                   type="password"/>
                        <Button fullWidth variant="contained" color="primary" type="submit">
                            注册
                        </Button>
                    </form>)}/>
            </div>
        </Container>
    );
}