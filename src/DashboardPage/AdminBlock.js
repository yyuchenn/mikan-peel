import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setBroadcast, setBusy, setSnackbar} from "../controller/site";
import axios from "axios";
import {API_BASE} from "../constant";
import {tokenHeader} from "../controller/user";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import {CopyToClipboard} from "react-copy-to-clipboard";
import IconButton from "@material-ui/core/IconButton";
import ClipboardText from "mdi-material-ui/ClipboardText";
import Dialog from "@material-ui/core/Dialog";
import {Form} from "react-final-form";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {TextField} from "mui-rff";
import DialogActions from "@material-ui/core/DialogActions";

export function Admin(props) {
    const [codes, setCodes] = React.useState();
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setBusy(true));
        axios.get(API_BASE + "/profile/i_code", {
            headers: tokenHeader(),
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    setCodes(res["icodes"]);
                }
            ).catch(err => {
            dispatch(setSnackbar("拉取邀请码列表失败", "error"));
        }).finally(() => dispatch(setBusy(false)));
    }, []);

    const handleAdd = () => {
        axios.put(API_BASE + "/profile/i_code", null, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            let new_codes = codes.slice(0);
            new_codes.push(res);
            setCodes(Object.assign(new_codes));
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        })
    };

    return <>
        <Typography variant="h5" style={{marginBottom: "2rem"}}>管理</Typography>
        <Box display="flex" flexDirection="column">
            <Box><EditBroadcast style={{marginBottom: "1rem"}}/></Box>
            <Box>
                <Button variant="contained" color="primary" onClick={handleAdd}>添加邀请码</Button>
                {codes && codes.map((code, key) =>
                    <Paper style={{width: "100%"}} key={key}>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <CopyToClipboard text={"https://mikan.mom/signup?icode=" + code["icode"]} onCopy={() => {
                                dispatch(setSnackbar("已复制邀请链接", "success"))
                            }}>
                                <IconButton><ClipboardText/></IconButton>
                            </CopyToClipboard>
                            <Typography variant="body1" noWrap flexGrow={1}>{code["icode"]}</Typography>
                        </Box>
                    </Paper>
                )}
            </Box>
        </Box>
    </>
}

function EditBroadcast(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const broadcast = useSelector(state => state.site.broadcast);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onChangePassword = (values) => {
        if (!values["broadcast"]) values["broadcast"] = "";
        console.log(values);
        dispatch(setBusy(true));
        axios.post(API_BASE + "/env", null, {
            params: {
                key: "broadcast",
                value: values["broadcast"]
            },
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            setOpen(false);
            dispatch(setBroadcast(values["broadcast"]));
            dispatch(setSnackbar("修改成功", "success"));
        }).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    };

    return (<>
        <Button variant="contained" color="primary" style={{marginTop: "0.5rem"}}
                onClick={handleClickOpen} {...props}>修改公告</Button>
        <Dialog open={open} onClose={handleClose} maxWidth="md">
            <Form onSubmit={onChangePassword} initialValues={{broadcast: broadcast}} render={({handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">修改公告</DialogTitle>
                    <DialogContent>
                        <TextField autoFocus margin="dense" name="broadcast" label="公告" fullWidth multiline
                                   rowsMax={5}/>
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
    </>);
}