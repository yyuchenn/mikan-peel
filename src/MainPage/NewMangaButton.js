import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserAutocomplete from "../Component/UserAutocomplete/UserAutocomplete";

import {Form, Field} from 'react-final-form';
import {TextField, Checkboxes} from 'mui-rff';
import ImgUrlTextField from "../Component/ImgUrlTextField/ImgUrlTextField";

import axios from "axios";
import {API_MANGA} from "../constant";
import {tokenHeader} from "../controller/user";
import {useDispatch} from "react-redux";
import {setSnackbar} from "../controller/site";


export default function NewMangaButton() {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);

    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values) => {
        values["cover"] = document.getElementById("cover").value;
        values["cherry"] = values["cherry"] === true;
        values["ps"] = "";
        console.log(values);
        axios.put(API_MANGA, values, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => {
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
            <Button variant={"contained"} color={"primary"} onClick={handleClickOpen}>创建漫画</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <Form onSubmit={onSubmit} render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle id="form-dialog-title">创建漫画</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                漫画ID会出现在URL上，不可重名，最好避免使用汉字。
                            </DialogContentText>
                            <TextField autoFocus margin="dense" name="name" label="漫画名称" type="string" fullWidth required/>
                            <TextField margin="dense" name="id" label="漫画ID" type="string" fullWidth required/>
                            <Checkboxes
                                name="cherry"
                                data={{label: "夏蜜樱桃", value: "cherry"}}
                            />
                            <Field component={ UserAutocomplete } name="producer" label="制作人" id="producer"/>
                            <Field component={ImgUrlTextField} name="cover"/>

                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                取消
                            </Button>
                            <Button type="submit" color="primary">
                                创建
                            </Button>
                        </DialogActions>
                    </form>)}/>
            </Dialog>
        </div>
    );
}
