import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from "@material-ui/core/Box";

import {ReactSortable} from "react-sortablejs";
import NewTaskButton from "../NewTaskButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import DragHandleIcon from '@material-ui/icons/DragHandle';
import {taskIcon} from "../../Component/TaskChip/icons";
import {Form} from "react-final-form";
import {TextField} from "mui-rff";
import axios from "axios";
import {API_MANGA} from "../../constant";
import {tokenHeader} from "../../controller/user";
import {setSnackbar} from "../../controller/site";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";


export default function EditChapterButton(props) {
    const {chapter} = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [tasksList, setTasksList] = React.useState([]);

    React.useEffect(() => {
        let tasks = chapter["tasks"].slice();
        for (let i = 0; i < tasks.length; i++) {
            tasks[i]["order"] = i;
        }
        setTasksList(tasks);
    }, []);

    const onSubmit = (values) => {
        values["tasks"] = tasksList.map(task => task.order);
        console.log(values);
        axios.post(API_MANGA + "/" + chapter["mid"] + "/chapter/" + chapter["id"], values, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            if (res["id"] !== chapter["id"])
                history.replace("/manga/" + res["mid"]);
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
            <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen}>
                编辑章节
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">编辑章节</DialogTitle>
                <Form onSubmit={onSubmit} initialValues={{name: chapter["name"], id: chapter["id"], ps: chapter["ps"]}} render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField margin="dense" name="name" label="章节标题" type="string" fullWidth/>
                    <TextField margin="dense" name="id" label="章节ID" type="string" fullWidth helperText="章节ID会出现在URL上，同一漫画内不可重名，最好避免使用汉字。建议：章节数字。"/>
                    <TextField name="ps" label={"備考"} multiline rowsMax={5}/>
                    <List subheader={
                        <ListSubheader component="div">
                            <Box display="flex" flexDirection="row" alignItems="flex-end">
                                <Box flexGrow={1}><DialogContentText>任务</DialogContentText></Box>
                                <Box><NewTaskButton chapter={chapter} order={chapter["tasks"].length}/></Box>
                            </Box>
                        </ListSubheader>
                    }>
                        <ReactSortable list={tasksList} setList={setTasksList} animation={150}>
                            {tasksList.map((task, order) => (
                                <ListItem key={order}>
                                    <ListItemIcon>
                                        {taskIcon(task["type"])}
                                    </ListItemIcon>
                                    <ListItemText primary={task["name"]}/>
                                    <DragHandleIcon/>
                                </ListItem>
                            ))}
                        </ReactSortable>
                    </List>
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
