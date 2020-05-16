import axios from "axios";
import {FILL_USER} from "../reducers/user";
import {SET_BUSY} from "../reducers/site"
import {setSnackbar} from "./site";
import {API_BASE} from "../constant";

export function auth(id, pass) {
    return dispatch => {
        axios.post(API_BASE + "/auth", {
            id: id,
            pass: pass
        }).then(res => res.data)
            .then(res => {
                console.log(res);
                }
            );
    };
}


export function verifySession() {
    return async dispatch => {
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
                dispatch(Object.assign({type: SET_BUSY}, {isBusy: false}));
            });
    };
}