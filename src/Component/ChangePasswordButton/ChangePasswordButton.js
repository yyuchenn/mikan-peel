import React from "react";
import {Form} from "react-final-form";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {TextField} from "mui-rff";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import {setBusy, setSnackbar} from "../../controller/site";
import axios from "axios";
import {API_USER} from "../../constant";
import {tokenHeader} from "../../controller/user";
import {useDispatch} from "react-redux";

export default function ChangePasswordButton(props) {
    const {uid} = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangePassword = (values) => {
        console.log(values);
        if (values["password"] !== values["re-password"]) {
            dispatch(setSnackbar("两次密码不一致", "error"));
            return;
        }
        dispatch(setBusy(true));
        axios.post(API_USER + "/" + uid + "/password", values, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            setOpen(false);
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

    return (<>
        <Button variant="contained" color="secondary" style={{marginTop: "0.5rem"}} onClick={handleClickOpen}>修改密码</Button>
        <Dialog open={open} onClose={handleClose}>
            <Form onSubmit={onChangePassword} render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">修改密码</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            密码是6-32位字母、数字、空格或如下特殊字符的组合。-+_!=@#$%^&*?([)].;:
                        </DialogContentText>
                        <TextField autoFocus margin="dense" name="password" label="新密码" type="password" fullWidth required/>
                        <TextField margin="dense" name="re-password" label="重复新密码" type="password" fullWidth required/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            取消
                        </Button>
                        <Button type="submit" color="primary">
                            修改
                        </Button>
                    </DialogActions>
                </form>)}/>
        </Dialog>
    </>);
}