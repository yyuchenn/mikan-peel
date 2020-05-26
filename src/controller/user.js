import axios from "axios";
import {FILL_USER, SET_LOGGING} from "../reducers/user";
import {setBusy, setSnackbar} from "./site";
import {API_BASE} from "../constant";

export function auth(id, pass) {
    return dispatch => {
        dispatch(setLogging(true));
        axios.post(API_BASE + "/auth", {
            id: id,
            pass: pass
        }).then(res => res.data)
            .then(res => {
                console.log(res);
                }
            ).finally(() => dispatch(setLogging(false)));
    };
}


export function verifySession() {
    return async dispatch => {
        dispatch(setLogging(true));
        await axios.get(API_BASE + "/session", {
            withCredentials: true,
            validateStatus: status => status === 200
        })
            .then(res => res.data)
            .then(res => {
                    dispatch(Object.assign({type: FILL_USER}, res));
                dispatch(setSnackbar("登录成功", "success"));
                }
            ).catch(err => {
                console.log("未登录");
            }).finally(() => {
                dispatch(setBusy(false));
                dispatch(setLogging(false));
            });
    };
}

export function setLogging(logging) {
    return dispatch => {
        dispatch({
            type: SET_LOGGING,
            logging: logging
        })
    }
}