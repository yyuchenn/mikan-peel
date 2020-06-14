import {SET_SNACK_MSG, SET_SHOW_CHERRY, SET_BUSY, SET_BROADCAST} from "../reducers/site";
import axios from "axios";
import {API_BASE} from "../constant";
import {tokenHeader} from "./user";

export function initSite() {
    return dispatch => {
        if (window.localStorage.getItem("noCherry") === "1") {
            dispatch(setShowCherry(false));
        }
        axios.get(API_BASE + "/env", {
                params: {
                    key: "broadcast"
                },
                headers: tokenHeader(),
                validateStatus: status => status === 200
            }
        ).then(res => res.data)
            .then(res => {
                    dispatch(setBroadcast(res["result"]));
                }
            ).catch((err) => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("无法拉取站点，未知的错误", "error"));
            }
        }).finally(() => dispatch(setBusy(false)));
    }
}

export function setSnackbar(message, variant = "info", dismissable = true) {
    return dispatch =>
    dispatch(Object.assign({type: SET_SNACK_MSG}, {snackMsg:
            {
                message: message,
                variant: variant,
                dismissable: dismissable
            }}));
}

export function setBusy(isBusy) {
    return dispatch => {
        dispatch(Object.assign({type: SET_BUSY}, {isBusy: isBusy}));
    };
}

export function setShowCherry(showCherry) {
    window.localStorage.setItem("noCherry", showCherry ? "0" : "1");
    return dispatch =>
        dispatch(Object.assign({type: SET_SHOW_CHERRY}, {showCherry: showCherry}));
}

export function setBroadcast(msg) {
    return dispatch => dispatch(Object.assign({type: SET_BROADCAST}, {broadcast: msg}));
}