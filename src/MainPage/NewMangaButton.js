import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from "@material-ui/core/Box";
import UserAutocomplete from "../Component/UserAutocomplete/UserAutocomplete";


const useStyles = makeStyles((theme) => ({
    coverInputBox: {
        display: "none"
    }
}));

export default function NewMangaButton() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {

    }, []);

    const handleClickOpen = () => {
        setOpen(true);
        const script = document.createElement("script");
        script.src = "https://imgchr.com/sdk/pup.js";
        script.setAttribute("data-url", "https://imgchr.com/upload");
        script.setAttribute("data-auto-insert", "direct-links");
        script.setAttribute("data-mode", "manual");
        script.async = true;
        document.head.appendChild(script);
    };

    const handleClose = () => {
        setOpen(false);
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
                    <UserAutocomplete label="制作人" id="producer"/>
                    <Box display="flex" alignItems="flex-end">
                        <Box flexGrow={1}>
                            <TextField
                                margin="dense"
                                id="cover"
                                label="封面URL"
                                type="string"
                                fullWidth
                            />
                        </Box>
                        <Box>
                            <Button data-chevereto-pup-trigger data-target="#cover"
                                    ariant="contained" color="secondary" component="span">图床上传</Button></Box>
                    </Box>
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
