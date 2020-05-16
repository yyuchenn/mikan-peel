import { useSnackbar } from 'notistack';
import React from 'react';
import {useSelector} from "react-redux";
import Button from "@material-ui/core/Button";

export default function Snackbar(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const errorMsg = useSelector(state => state.site.snackMsg);

    const omitAction = (key) => () => closeSnackbar(key);

    React.useEffect(() => {
        if (typeof errorMsg === "object" &&
            typeof errorMsg.message === "string" &&
            errorMsg.message !== "") {
            const messageProps = {variant: errorMsg.variant};
            if (errorMsg.dismissable)
                Object.assign(messageProps, {
                action: (key) => (
                <Button onClick={omitAction(key)}>
                    忽略
                </Button>
            )});
            enqueueSnackbar(errorMsg.message, messageProps);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorMsg]);

    return (<div/>);
}