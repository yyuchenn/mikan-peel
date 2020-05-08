import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
    coverInputBox: {
        display: "none"
    }
}));

export default function NewMangaButton() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [fileName, setFileName] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const uploadOnChange = (event) => {
        setFileName(event.target.files[0].name);
    };

    return (
        <div>
            <Button variant={"contained"} color={"primary"} onClick={handleClickOpen}>创建漫画</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">创建漫画</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        漫画ID会出现在URL上，不可重名，最好避免使用汉字。
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="漫画名称"
                        type="string"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="漫画ID"
                        type="string"
                        fullWidth
                    />
                    <input
                        accept="image/*"
                        className={classes.coverInputBox}
                        id="contained-button-file"
                        type="file"
                        onChange={uploadOnChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="secondary" component="span">
                            上传封面
                        </Button>
                    </label>
                    <DialogContentText>{fileName}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        创建
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}
