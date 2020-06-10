import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {setBusy, setSnackbar} from "../controller/site";
import axios from "axios";
import {API_USER} from "../constant";
import {tokenHeader} from "../controller/user";
import Typography from "@material-ui/core/Typography";
import {Form} from "react-final-form";
import Box from "@material-ui/core/Box";
import {TextField} from "mui-rff";
import ChangePasswordButton from "../Component/ChangePasswordButton/ChangePasswordButton";
import Button from "@material-ui/core/Button";

export function Settings(props) {
    const uid = useSelector(state => state.user.uid);
    const [user, setUser] = React.useState();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_USER + "/" + uid, {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setUser(res);
                }
            ).catch(err => {
            dispatch(setSnackbar("获取信息失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
    }, []);

    const onSubmit = (values) => {
        values["introduction"] = values["introduction"] || "";
        console.log(values);
        dispatch(setBusy(true));
        axios.post(API_USER + "/" + uid, values, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            dispatch(setSnackbar("修改成功", "success"));
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    };


    return <>
        <Typography variant="h5" style={{marginBottom: "2rem"}}>账户设置</Typography>
        <Form initialValues={user && {uid: user["uid"], nickname: user["nickname"], introduction: user["introduction"]}}
              onSubmit={onSubmit} render={({handleSubmit}) => (
            <form onSubmit={handleSubmit}>
                <Box display="flex" flexDirection="column" alignItems="flex-start">
                    <TextField name="uid" label="用户ID" disabled required/>
                    <TextField name="nickname" label="昵称" required/>
                    <TextField name="introduction" label="自我介绍" multiline rowsMax={5}/>
                    <ChangePasswordButton uid={uid}/>
                    <Button type="submit" variant="contained" color="primary" style={{marginTop: "1rem"}}>保存</Button>
                </Box>
            </form>)}/>

    </>
}