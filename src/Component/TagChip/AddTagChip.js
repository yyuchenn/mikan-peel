import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import TagChip from "../TagChip/TagChip";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";


export default function AddTagChip(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Chip label={"+"} size="small" clickable onClick={handleClickOpen} {...props}/>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">新建标签</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="名称"
                        type="string"
                        fullWidth
                    />
                    <InputLabel>颜色</InputLabel>
                    <Select
                        id="color"
                    >
                        <MenuItem value={"red"}><TagChip tag={{color: "red", name: "红色"}} size="small"/></MenuItem>
                        <MenuItem value={"pink"}><TagChip tag={{color: "pink", name: "粉色"}} size="small"/></MenuItem>
                        <MenuItem value={"blue"}><TagChip tag={{color: "blue", name: "蓝色"}} size="small"/></MenuItem>
                        <MenuItem value={"purple"}><TagChip tag={{color: "purple", name: "紫色"}} size="small"/></MenuItem>
                        <MenuItem value={"indigo"}><TagChip tag={{color: "indigo", name: "靛蓝色"}} size="small"/></MenuItem>
                        <MenuItem value={"cyan"}><TagChip tag={{color: "cyan", name: "青色"}} size="small"/></MenuItem>
                        <MenuItem value={"teal"}><TagChip tag={{color: "teal", name: "水鸭色"}} size="small"/></MenuItem>
                        <MenuItem value={"lime"}><TagChip tag={{color: "lime", name: "绿黄色"}} size="small"/></MenuItem>
                        <MenuItem value={"orange"}><TagChip tag={{color: "orange", name: "橘黄色"}} size="small"/></MenuItem>
                        <MenuItem value={"brown"}><TagChip tag={{color: "brown", name: "棕色"}} size="small"/></MenuItem>
                        <MenuItem value={"gray"}><TagChip tag={{color: "gray", name: "灰色"}} size="small"/></MenuItem>
                    </Select>
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
        </>

    );
}
