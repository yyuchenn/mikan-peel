import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField";

import axios from "axios";
import {useDispatch} from "react-redux";
import {setSnackbar} from "../../controller/site";
import {tokenHeader} from "../../controller/user";
import {useHistory} from "react-router";


export default function DeleteButton(props) {
    const {id, name, api, callback, reload, ...others} = props;
    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (event) => {setInput(event.target.value)};

    const onSubmit = () => {
        axios.delete(api, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => {
            if (reload) window.location.reload();
            history.replace(callback);
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        })
    };

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen} {...others}>删除{name}</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">确认删除</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                删除后将不可恢复
                            </DialogContentText>
                            {id && <><DialogContentText>请在下方重复输入ID以确认</DialogContentText>
                            <TextField autoFocus margin="dense" name="name" label={id} type="string" onChange={handleInput} fullWidth required/></>}
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                取消
                            </Button>
                            <Button onClick={onSubmit} variant="contained" color="secondary" disabled={input !== id}>
                                删除
                            </Button>
                        </DialogActions>
            </Dialog>
        </div>
    );
}
