import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";

import {Form} from 'react-final-form';
import {TextField} from 'mui-rff';
import axios from "axios";
import {API_MANGA} from "../constant";
import {tokenHeader} from "../controller/user";
import {setSnackbar} from "../controller/site";
import {useDispatch} from "react-redux";

export default function NewChapterButton(props) {
    const {mid} = props;
    const [open, setOpen] = React.useState(false);
    const [route, setRoute] = React.useState({no1: false, no2: false, no4: false, empty: false});
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRouteChange = (event) => {
        setRoute({...route, [event.target.name]: event.target.checked});
    };

    const onSubmit = (values) => {
        let type = route["no1"] ? 1 : 0;
        type += route["no2"] ? 2 : 0;
        type += route["no4"] ? 4 : 0;
        type += route["no8"] ? 8 : 0;
        type += route["empty"] ? 16 : 0;
        values["ps"] = "";
        console.log(type);
        console.log(values);
        axios.put(API_MANGA + "/" + mid + "/chapter", values, {
            params: {type: type},
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
            <Button color="primary" onClick={handleClickOpen} variant="outlined">
                新建章节
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">新建章节</DialogTitle>
                <Form onSubmit={onSubmit} render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField autoFocus margin="dense" name="name" label="章节标题" type="string" fullWidth required/>
                            <TextField margin="dense" name="id" label="章节ID" type="string" fullWidth required helperText="章节ID会出现在URL上，同一漫画内不可重名，最好避免使用汉字。"/>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">自定义任务流程</FormLabel>
                                <FormGroup row>
                                    <FormControlLabel
                                        control={<Checkbox checked={route["no1"]} onChange={handleRouteChange}
                                                           name="no1"/>}
                                        label="无图源" disabled={route["empty"]}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={route["no2"]} onChange={handleRouteChange}
                                                           name="no2"/>}
                                        label="无校对" disabled={route["empty"]}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={route["no4"]} onChange={handleRouteChange}
                                                           name="no4"/>}
                                        label="无审核" disabled={route["empty"]}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={route["no8"]} onChange={handleRouteChange}
                                                           name="no8"/>}
                                        label="无发布" disabled={route["empty"]}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox checked={route["empty"]} onChange={handleRouteChange}
                                                           name="empty"/>}
                                        label="空项目"
                                    />
                                </FormGroup>
                            </FormControl>
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
