import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";


export default function NewChapterButton(props) {
    const [open, setOpen] = React.useState(false);
    const [route, setRoute] = React.useState({no1: false, no3: false, no5: false, empty: false});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRouteChange = (event) => {
        setRoute({ ...route, [event.target.name]: event.target.checked });
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen} variant="contained">
                新建章节
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">新建章节</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        章节ID会出现在URL上，同一漫画内不可重名，最好避免使用汉字。
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="章节标题"
                        type="string"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="id"
                        label="章节ID"
                        type="string"
                        fullWidth
                    />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">自定义任务流程</FormLabel>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Checkbox checked={route["no1"]} onChange={handleRouteChange} name="no1" />}
                                label="无图源" disabled={route["empty"]}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={route["no3"]} onChange={handleRouteChange} name="no3" />}
                                label="无校对" disabled={route["empty"]}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={route["no5"]} onChange={handleRouteChange} name="no5" />}
                                label="无审核" disabled={route["empty"]}
                            />
                            <FormControlLabel
                                control={<Checkbox checked={route["empty"]} onChange={handleRouteChange} name="empty" />}
                                label="空项目"
                            />
                        </FormGroup>
                    </FormControl>
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
