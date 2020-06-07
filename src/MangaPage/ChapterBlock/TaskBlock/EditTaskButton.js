import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import {taskIcon} from "../../../Component/TaskChip/icons";
import {Form} from "react-final-form";
import {useDispatch} from "react-redux";
import axios from "axios";
import {API_MANGA} from "../../../constant";
import {tokenHeader} from "../../../controller/user";
import {setSnackbar} from "../../../controller/site";
import {TextField, Select} from "mui-rff";
import {useHistory} from "react-router";


export default function EditTaskButton(props) {
    const {task} = props;
    const dispatch = useDispatch();
    const history = useHistory();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        console.log(values);
        axios.post(API_MANGA + "/" + task["mid"] + "/chapter/" + task["cid"] + "/task/" + task["id"], values, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            if (res["id"] !== task["id"])
                history.replace("/manga/" + res["mid"] + "/" + res["cid"] + "/" + res["id"]);
            window.location.reload();
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
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                编辑任务
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">编辑任务</DialogTitle>
                <Form onSubmit={onSubmit} initialValues={{type: task["type"], name: task["name"], "id": task["id"]}} render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <Select name="type" label="类型" required>
                                <MenuItem value={0}>{taskIcon(0)}其他</MenuItem>
                                <MenuItem value={1}>{taskIcon(1)}图源</MenuItem>
                                <MenuItem value={2}>{taskIcon(2)}翻译</MenuItem>
                                <MenuItem value={3}>{taskIcon(3)}校对</MenuItem>
                                <MenuItem value={4}>{taskIcon(4)}嵌字</MenuItem>
                                <MenuItem value={5}>{taskIcon(5)}审核</MenuItem>
                                <MenuItem value={6}>{taskIcon(6)}发布</MenuItem>
                            </Select>
                            <TextField autoFocus margin="dense" name="name" label="任务标题" type="string" required
                                       fullWidth/>
                            <TextField margin="dense" name="id" label="任务ID" type="string" required fullWidth/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                取消
                            </Button>
                            <Button type="submit" color="primary">
                                保存
                            </Button>
                        </DialogActions>
                    </form>)}/>
            </Dialog>
        </div>

    );
}
