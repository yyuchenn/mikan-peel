import React from "react";
import {useDispatch} from "react-redux";
import {setBusy, setSnackbar} from "../controller/site";
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
        <Button variant="contained" color="primary" onClick={handleAdd} style={{marginBottom: "1rem"}}>添加邀请码</Button>
        {codes && codes.map((code, key) =>
            <Paper style={{width: "100%"}} key={key}>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <CopyToClipboard text={code["icode"]} onCopy={() => {
                        dispatch(setSnackbar("已复制邀请链接", "success"))
                    }}>
                        <IconButton><ClipboardText/></IconButton>
                    </CopyToClipboard>
                    <Typography variant="body1" noWrap flexGrow={1}>{code["icode"]}</Typography>
                </Box>
            </Paper>
        )}
    </>
}