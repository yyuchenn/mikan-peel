import React from "react";
import Chip from "@material-ui/core/Chip";
import {tagColor, textColor} from "./colors";
import axios from "axios";
import {API_TAG_DELETE} from "../../constant";
import {tokenHeader} from "../../controller/user";
import {setSnackbar} from "../../controller/site";
import {useDispatch} from "react-redux";


export default function TagChip(props) {
    const {tag, mid, cid, tid, deletable} = props;
    const dispatch = useDispatch();

    const handleDelete = () => {
        let level = 2;
        if (typeof tid !== "string") level = 1;
        if (typeof cid !== "string") level = 0;
        axios.post(API_TAG_DELETE, {name: tag.name, color: tag.color,
            mid: mid, cid: level > 0 ? cid : "", tid: level > 1 ? tid : "", level: level}, {
            headers: tokenHeader(),
            validateStatus: status => status === 200
        }).then(res => window.location.reload()).catch(err => {
            try {
                console.log(err.response.data.detail);
                dispatch(setSnackbar(err.response.data.detail, "error"));
            } catch (e) {
                dispatch(setSnackbar("未知的错误", "error"));
            }
        })
    };

    return (
        <Chip style={{
            backgroundColor: tagColor(tag.color),
            color: textColor(tag.color)
        }} label={tag.name} onDelete={deletable === "true" ? handleDelete : null} {...props}/>
    );
}