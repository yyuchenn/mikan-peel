import {SET_SNACK_MSG, SET_SHOW_CHERRY, SET_BUSY} from "../reducers/site";

export function initSite() {
    return dispatch => {
        if (window.localStorage.getItem("noCherry") === "1") {
            dispatch(setShowCherry(false));
        }
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