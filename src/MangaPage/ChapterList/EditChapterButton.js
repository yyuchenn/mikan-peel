import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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


export default function EditChapterButton(props) {

    const {chapter} = props;

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [tasksList, setTasksList] = React.useState(chapter["tasks"]);

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                编辑
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">编辑章节</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="章节标题"
                        type="string"
                        defaultValue={chapter["name"]}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="id"
                        label="章节ID"
                        type="string"
                        defaultValue={chapter["id"]}
                        fullWidth
                    />


                    <List subheader={
                        <ListSubheader component="div">
                            <Box display="flex" flexDirection="row" alignItems="flex-end">
                                <Box flexGrow={1}><DialogContentText>任务</DialogContentText></Box>
                                <Box><NewTaskButton/></Box>
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
                    <Button onClick={handleClose} color="primary">
                        保存
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
