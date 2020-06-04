import React from "react";
import Chip from "@material-ui/core/Chip";
import {tagColor, textColor} from "./colors";


export default function TagChip(props) {
    const {tag} = props;

    return (
        <Chip style={{
            backgroundColor: tagColor(tag.color),
            color: textColor(tag.color)
        }} label={tag.name} {...props}/>
    );
}