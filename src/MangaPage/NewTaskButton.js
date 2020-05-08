import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const useStyles = makeStyles((theme) => ({
    coverInputBox: {
        display: "none"
    }
}));

export default function NewTaskButton(props) {
    const classes = useStyles();

    const {} = props;

    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                新建任务
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">新建任务</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <InputLabel>类型</InputLabel>
                        <Select
                            id="type"
                            value={type}
                            onChange={handleTypeChange}
                        >
                            <MenuItem value={0}>其他</MenuItem>
                            <MenuItem value={1}>图源</MenuItem>
                            <MenuItem value={2}>翻译</MenuItem>
                            <MenuItem value={3}>校对</MenuItem>
                        </Select>
                        <FormHelperText>任务类型</FormHelperText>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="任务标题"
                        type="string"
                        defaultValue={""}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="id"
                        label="任务ID"
                        type="string"
                        defaultValue={""}
                        fullWidth
                    />
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
