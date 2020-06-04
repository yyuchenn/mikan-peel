import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router";
import {API_THIRD_PARTY} from "../constant";
import {tokenHeader} from "../controller/user";
import {setTitle} from "../controller/utils";

const useStyles = makeStyles((theme) => ({
    titleArea: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
}));

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function OAuthPage(props) {
    const classes = useStyles();
    const uid = useSelector(state => state.user.uid);
    const [fail, setFail] = useState(false);
    const query = useQuery();
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        setTitle("授权");
        axios.get(API_THIRD_PARTY + "/auth_code", {
            params: {
                client_id: query.get("client_id")
            },
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data)
            .then(res => {
                let auth_code = res["access_token"];
                window.location.href = query.get("redirect_uri") + "?code=" + auth_code + "&state=" + query.get("state");
            }).catch(() => setFail(true))
    }, []);

    return (
        <Container>
            <Box display={"flex"} className={classes.titleArea}>
                <Box flexGrow={1}>
                    <Typography variant="h5">{fail ? "请重试" : "登录到" + query.get("client_id")}</Typography>
                    <Typography variant="h2">{fail ? "授权失败" : "正在授权..."}</Typography>
                </Box>
            </Box>
        </Container>
    );
}