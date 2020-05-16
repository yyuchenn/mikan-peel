import {SET_SNACK_MSG} from "../reducers/site";

export function setSnackbar(message, variant = "info", dismissable = true) {
    return dispatch =>
    dispatch(Object.assign({type: SET_SNACK_MSG}, {snackMsg:
            {
                message: message,
                variant: variant,
                dismissable: dismissable
            }}));
}