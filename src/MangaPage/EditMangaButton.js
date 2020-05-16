import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function EditMangaButton(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" color="primary" onClick={handleClickOpen}>
                编辑
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">编辑信息</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="name"
                        label="漫画标题"
                        type="string"
                        defaultValue={""}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="id"
                        label="漫画ID"
                        type="string"
                        defaultValue={""}
                        fullWidth
                    />
                    <TextField
                        label="备注信息"
                        id={"ps"}
                        multiline
                        rowsMax={5}
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
