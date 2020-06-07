import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import TagChip from "../TagChip/TagChip";
import InputLabel from "@material-ui/core/InputLabel";

import {TextField, Select} from "mui-rff";
import {Form} from "react-final-form";
import axios from "axios";
import {API_TAG} from "../../constant";
import {tokenHeader} from "../../controller/user";
import {setSnackbar} from "../../controller/site";
import {useDispatch} from "react-redux";


export default function AddTagChip(props) {
    const [open, setOpen] = React.useState(false);
    const {level, mid, cid, tid} = props;
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        values["level"] = level;
        values["mid"] = mid;
        values["cid"] = typeof cid === "string" ? cid : "";
        values["tid"] = typeof tid === "string" ? tid : "";
        console.log(values);
        axios.put(API_TAG, values, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => window.location.reload()).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        })
    };


    return (
        <>
            <Chip label={"+"} size="small" clickable onClick={handleClickOpen} {...props}/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">添加标签</DialogTitle>
                <Form onSubmit={onSubmit} render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField autoFocus margin="dense" name="name" label="名称" type="string" fullWidth required/>
                            <InputLabel>颜色</InputLabel>
                            <Select name="color" required>
                                <MenuItem value={"red"}><TagChip tag={{color: "red", name: "红色"}} size="small"
                                                                 clickable/></MenuItem>
                                <MenuItem value={"pink"}><TagChip tag={{color: "pink", name: "粉色"}} size="small"
                                                                  clickable/></MenuItem>
                                <MenuItem value={"blue"}><TagChip tag={{color: "blue", name: "蓝色"}} size="small"
                                                                  clickable/></MenuItem>
                                <MenuItem value={"purple"}><TagChip tag={{color: "purple", name: "紫色"}} size="small"
                                                                    clickable/></MenuItem>
                                <MenuItem value={"indigo"}><TagChip tag={{color: "indigo", name: "靛蓝色"}} size="small"
                                                                    clickable/></MenuItem>
                                <MenuItem value={"cyan"}><TagChip tag={{color: "cyan", name: "青色"}} size="small"
                                                                  clickable/></MenuItem>
                                <MenuItem value={"teal"}><TagChip tag={{color: "teal", name: "水鸭色"}} size="small"
                                                                  clickable/></MenuItem>
                                <MenuItem value={"lime"}><TagChip tag={{color: "lime", name: "绿黄色"}} size="small"
                                                                  clickable/></MenuItem>
                                <MenuItem value={"orange"}><TagChip tag={{color: "orange", name: "橘黄色"}} size="small"
                                                                    clickable/></MenuItem>
                                <MenuItem value={"brown"}><TagChip tag={{color: "brown", name: "棕色"}} size="small"
                                                                   clickable/></MenuItem>
                                <MenuItem value={"gray"}><TagChip tag={{color: "gray", name: "灰色"}} size="small"
                                                                  clickable/></MenuItem>
                            </Select>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                取消
                            </Button>
                            <Button onClick={handleSubmit} color="primary">
                                添加
                            </Button>
                        </DialogActions>
                    </form>)}/>
            </Dialog>
        </>

    );
}
