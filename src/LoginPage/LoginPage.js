import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useDispatch } from "react-redux";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import {auth} from "../controller/user";
import {setTitle} from "../controller/utils";

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

export default function LoginPage() {
    const classes = useStyles();
    const dispatch = useDispatch();

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    useEffect(() => setTitle("登录"), []);

    let login = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dispatch(auth(document.getElementById('uid').value, document.getElementById('pass').value, history, from));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <FingerprintIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    登录
                </Typography>
                <form className={classes.form} onSubmit={login}>
                    <TextField variant="outlined" margin="normal" required fullWidth id="uid" label="用户名" name="uid"
                               autoComplete="uid" autoFocus/>
                    <TextField variant="outlined" margin="normal" required fullWidth name="pass" label="密码"
                               type="password" id="pass" autoComplete="current-password"/>
                    <Button fullWidth variant="contained" color="primary" className={classes.submit} type="submit">
                        登录
                    </Button>
                </form>
            </div>
        </Container>
    );
}