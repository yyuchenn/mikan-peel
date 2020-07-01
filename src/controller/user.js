import axios from "axios";
import qs from 'qs';
import {FILL_USER, SET_GOO, SET_LOGGING, SET_NOTIFICATIONS} from "../reducers/user";
import {setBusy, setSnackbar} from "./site";
import {API_BASE} from "../constant";

export function auth(id, pass, history, from) {
    return dispatch => {
        dispatch(setBusy(true));
        axios.post(API_BASE + "/token", qs.stringify({
                username: id,
                password: pass
            }), {
                headers: tokenHeader(),
                validateStatus: status => status === 200
            }
        ).then(res => res.data)
            .then(res => {
                    window.localStorage.setItem("access_token", res["access_token"]);
                    dispatch(loginWithToken());
                    history.replace(from);
                }
            ).catch((err) => {
                try {
                    console.log(err.response.data.detail);
                    dispatch(setSnackbar(err.response.data.detail, "error"));
                } catch (e) {
                    dispatch(setSnackbar("未知的错误", "error"));
                }
            }).finally(() => dispatch(setBusy(false)));
    };
}


export function loginWithToken() {
    return async dispatch => {
        dispatch(setLogging(true));
        dispatch(setBusy(true));
        await axios.get(API_BASE + "/profile", {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => res.data).then(res => {
            dispatch(Object.assign({type: FILL_USER}, res));
            // dispatch(setSnackbar("登录成功", "success"));
            refreshToken()
        }).catch(err => {
            console.log("未登录");
        }).finally(() => {
            dispatch(setBusy(false));
            dispatch(setLogging(false));
        });
    };
}

function refreshToken() {
    axios.get(API_BASE + "/refresh_token", {
        headers: tokenHeader(),
        validateStatus: status => status === 200
    }).then(res => res.data).then(res => {
        window.localStorage.setItem("access_token", res["access_token"]);
    });
}


export function tokenHeader() {
    let token = window.localStorage.getItem("access_token");
    return {'Authorization': 'Bearer ' + token};
}


export function setLogging(logging) {
    return dispatch => {
        dispatch({
            type: SET_LOGGING,
            logging: logging
        })
    }
}

export function setNotifications(number) {
    return dispatch => {
        dispatch(Object.assign({type: SET_NOTIFICATIONS}, {number: number}));
    };
}

export function setGoo() {
    let time = new Date();
    return dispatch => {
        dispatch(Object.assign({type: SET_GOO}, {goo_timestamp: (Date.now() - time.getTimezoneOffset() * 60000) / 1000}));
    };
}