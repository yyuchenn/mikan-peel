import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ReactSortable } from "react-sortablejs";
import TaskChip from "../TaskChip";
import NewTaskButton from "../NewTaskButton";


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
                    <DialogContentText>任务</DialogContentText>
                    <NewTaskButton/>
                    <ReactSortable list={tasksList} setList={setTasksList} animation={150}>
                        {tasksList.map(task => (
                            <TaskChip label={task}/>
                        ))}
                    </ReactSortable>
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
